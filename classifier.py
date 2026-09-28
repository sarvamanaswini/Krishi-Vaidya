"""Feature-based leaf classifier (demo logic, no trained model).
Measures colour/lesion features from the photo and scores candidate diseases,
narrowed by the crop the farmer selects. Replace classify() with a real CNN later."""
import io
from PIL import Image

from diseases import CROP_DISEASES as POOLS, ALL_IDS as ALL


def _features(img):
    S = 64
    px = list(img.resize((S, S)).convert("HSV").getdata())
    leaf = green = yellow = pale = les = plant = 0
    mask = []
    for h, s, v in px:
        is_leaf = s > 50 and v > 40
        is_les = (h <= 30 and s > 60 and 40 < v <= 235) or (25 <= v < 70)
        leaf += is_leaf or is_les
        green += 48 < h <= 110 and s > 50 and v > 40
        yellow += 30 < h <= 48 and s > 70 and v > 140
        pale += 15 <= s <= 70 and v > 170 and 30 < h <= 110
        les += is_les
        plant += (30 < h <= 110 and s >= 15 and v >= 40) or is_les
        mask.append(is_les)
    n = max(1, leaf)
    seen, sizes = [False] * (S * S), []
    for i in range(S * S):
        if mask[i] and not seen[i]:
            stack, size = [i], 0
            seen[i] = True
            while stack:
                p = stack.pop(); size += 1
                x, y = p % S, p // S
                for q in ((p - 1) if x else -1, (p + 1) if x < S - 1 else -1, p - S if y else -1, p + S if y < S - 1 else -1):
                    if q >= 0 and mask[q] and not seen[q]:
                        seen[q] = True; stack.append(q)
            if size >= 3:
                sizes.append(size)
    return {"plant": plant / (S * S), "g": green / n, "y": yellow / n, "p": pale / n, "les": les / n,
            "n": len(sizes), "m": (max(sizes) if sizes else 0) / n}


def _scores(f):
    g, y, p, les, n, m = f["g"], f["y"], f["p"], f["les"], f["n"], f["m"]
    many = lambda cap: min(n, cap) / cap  # "many small spots" signal, 0..1
    return {
        "healthy": 1.2 * g - 6 * les - 0.08 * min(n, 15) - 1.5 * y + 0.1,
        # --- existing diseases (unchanged) ---
        "tomato_early_blight": 3 * les + many(10) * 0.9 - 2 * m - 0.02 * max(0, n - 12),  # fewer, larger spots
        "tomato_late_blight": 2 * les + 4 * m,
        "potato_late_blight": 2 * les + 4 * m,
        "wheat_leaf_rust": 1.5 * (y + les) + many(30) * 1.5 - 3 * m,
        "wheat_powdery_mildew": 4 * p - 2 * les,
        "rice_blast": 3 * les + 2 * m + 0.05 * min(n, 15),
        "pest_aphid": 3.3 * y - les + 0.1,
        # --- new: tomato / potato ---
        "tomato_septoria": 3 * les + many(30) * 1.4 - 2.5 * m,
        "tomato_leaf_curl": 3.2 * y + 1.5 * p - 3.5 * les + 0.3 * g + 0.05,
        "potato_early_blight": 3 * les + many(10) * 0.9 - 2 * m,
        # --- new: rice / wheat ---
        "rice_bacterial_blight": 2 * y + 2 * les + 2.5 * m,
        "rice_brown_spot": 2.5 * les + many(40) * 1.5 - 3 * m,
        "rice_sheath_blight": 2 * les + 4.5 * m + 1.5 * p,
        "wheat_yellow_rust": 2.4 * y + les + 1.3 * many(30) - 2 * m,
        # --- new: chilli / cotton ---
        "chilli_leaf_curl": 2.8 * y + 1.5 * p - 3.5 * les + 0.3 * g + 0.05,
        "chilli_anthracnose": 3.2 * les + 1.5 * m + many(10) * 0.6,
        "cotton_leaf_curl": 2.8 * y + 1.5 * p - 3.5 * les + 0.3 * g + 0.1,
        "cotton_bacterial_blight": 2.6 * les + many(25) * 1.2 - 1.5 * m,
        "cotton_alternaria": 2.4 * les + 2 * m + many(10) * 0.5,
        # --- new: groundnut / maize / banana ---
        "groundnut_tikka": 3 * les + many(40) * 1.6 - 3 * m,
        "groundnut_rust": 1.8 * (y + les) + many(40) * 1.6 - 3 * m,
        "maize_northern_leaf_blight": 2 * les + 4.5 * m,
        "maize_common_rust": 1.6 * (y + les) + many(40) * 1.4 - 3 * m,
        "maize_fall_armyworm": 1.5 * les + 1.6 * many(15) - 0.05 * max(0, n - 20),
        "banana_sigatoka": 1.5 * y + 2.5 * les + 2 * m,
        # --- new: sugarcane ---
        "sugarcane_red_rot": 2.2 * les + 3 * m + many(10) * 0.3,
        "sugarcane_rust": 1.6 * (y + les) + many(40) * 1.5 - 3 * m,
        "sugarcane_yellow_leaf": 3 * y + 1.5 * p - 3.5 * les + 0.3 * g + 0.05,
        "sugarcane_woolly_aphid": 3 * p + y - les + 0.1,
        # --- new: tomato bacterial spot, mango, onion ---
        # small dark spots WITH yellow halos: more spots + more yellow than septoria/early blight
        "tomato_bacterial_spot": 2.5 * les + 1.8 * y + many(20) * 1.1 - 2 * m - 0.03 * max(0, n - 24),  # many small spots, but not septoria-tiny
        "mango_powdery_mildew": 4 * p + y - les,
        "mango_anthracnose": 3.6 * les + many(12) - 1.2 * m,
        "onion_purple_blotch": 3.4 * les + 1.4 * y - m,
        "pest_mite": 2 * y + 3.5 * p - les + 0.05,
    }


MIN_PLANT = 0.10  # below this the photo does not look like a leaf / crop at all


def classify(image_bytes, crop="any"):
    f = _features(Image.open(io.BytesIO(image_bytes)).convert("RGB"))
    if f["plant"] < MIN_PLANT:
        return {"error": "no_leaf"}
    sc = _scores(f)
    ranked = sorted(POOLS.get(crop, ALL), key=lambda k: -sc[k])
    top = ranked[0]
    margin = sc[top] - (sc[ranked[1]] if len(ranked) > 1 else 0)
    conf = round(max(0.55, min(0.96, 0.62 + margin * 0.5)), 2)
    # Colour alone cannot tell which crop a leaf is. If the farmer didn't say, the
    # result is only a rough guess: cap confidence so the app tells them to see an expert.
    crop_guess = crop not in POOLS
    if crop_guess:
        conf = min(conf, 0.60)
    les = f["les"]
    sev = "none" if top == "healthy" else "early-stage" if les < 0.08 else "moderate" if les < 0.2 else "severe"
    # Close runners-up: similar-looking problems the farmer / officer should rule out.
    alts = [k for k in ranked[1:4] if k != "healthy" and sc[top] - sc[k] < 0.3][:2] if top != "healthy" else []
    return {"disease_id": top, "confidence": conf, "severity": sev, "crop_guess": crop_guess,
            "alternatives": alts}
