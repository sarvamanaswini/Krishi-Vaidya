"""Feature-based leaf classifier (demo logic, no trained model).
Measures colour/lesion features from the photo and scores candidate diseases,
narrowed by the crop the farmer selects. Replace classify() with a real CNN later."""
import io
from PIL import Image

POOLS = {
    "tomato": ["tomato_early_blight", "tomato_late_blight", "tomato_bacterial_spot", "tomato_septoria_leaf_spot", "pest_aphid", "healthy"],
    "potato": ["potato_late_blight", "potato_early_blight", "pest_aphid", "healthy"],
    "wheat": ["wheat_leaf_rust", "wheat_powdery_mildew", "wheat_yellow_rust", "healthy"],
    "rice": ["rice_blast", "rice_bacterial_leaf_blight", "rice_brown_spot", "pest_aphid", "healthy"],
    "maize": ["maize_fall_armyworm", "maize_northern_leaf_blight", "healthy"],
    "chilli": ["chilli_leaf_curl", "chilli_anthracnose", "pest_aphid", "healthy"],
    "mango": ["mango_powdery_mildew", "mango_anthracnose", "pest_aphid", "healthy"],
    "groundnut": ["groundnut_leaf_spot", "healthy"],
    "onion": ["onion_purple_blotch", "healthy"],
}
ALL = ["tomato_early_blight", "tomato_late_blight", "tomato_bacterial_spot", "tomato_septoria_leaf_spot",
       "potato_late_blight", "potato_early_blight", "wheat_leaf_rust", "wheat_powdery_mildew", "wheat_yellow_rust",
       "rice_blast", "rice_bacterial_leaf_blight", "rice_brown_spot", "maize_fall_armyworm", "maize_northern_leaf_blight",
       "chilli_leaf_curl", "chilli_anthracnose", "mango_powdery_mildew", "mango_anthracnose", "groundnut_leaf_spot",
       "onion_purple_blotch", "pest_aphid", "healthy"]


def _features(img):
    S = 64
    px = list(img.resize((S, S)).convert("HSV").getdata())
    leaf = green = yellow = pale = les = 0
    mask = []
    for h, s, v in px:
        is_leaf = s > 50 and v > 40
        is_les = (h <= 30 and s > 60 and 40 < v <= 235) or (25 <= v < 70)
        leaf += is_leaf or is_les
        green += 48 < h <= 110 and s > 50 and v > 40
        yellow += 30 < h <= 48 and s > 70 and v > 140
        pale += 15 <= s <= 70 and v > 170 and 30 < h <= 110
        les += is_les
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
    return {"g": green / n, "y": yellow / n, "p": pale / n, "les": les / n,
            "n": len(sizes), "m": (max(sizes) if sizes else 0) / n}


def _scores(f):
    return {
        "healthy": 1.2 * f["g"] - 6 * f["les"] - 0.08 * min(f["n"], 15) - 1.5 * f["y"] + 0.1,
        "tomato_early_blight": 3 * f["les"] + min(f["n"], 10) / 10 * 0.9 - 2 * f["m"],
        "tomato_late_blight": 2 * f["les"] + 4 * f["m"],
        "potato_late_blight": 2 * f["les"] + 4 * f["m"],
        "wheat_leaf_rust": 1.5 * (f["y"] + f["les"]) + min(f["n"], 30) / 30 * 1.5 - 3 * f["m"],
        "wheat_powdery_mildew": 4 * f["p"] - 2 * f["les"],
        "rice_blast": 3 * f["les"] + 2 * f["m"] + 0.05 * min(f["n"], 15),
        "pest_aphid": 3 * f["y"] - f["les"] + 0.1,
        "tomato_bacterial_spot": 3.5 * f["les"] + 2.0 * f["y"] - 2.5 * f["m"],
        "tomato_septoria_leaf_spot": 3.2 * f["les"] + 1.2 * min(f["n"], 15) / 15 - 1.0 * f["m"],
        "potato_early_blight": 3.6 * f["les"] + 1.4 * min(f["n"], 15) / 15 - 2.0 * f["m"],
        "wheat_yellow_rust": 2.4 * (f["y"] + f["les"]) + 1.2 * min(f["n"], 20) / 20 - 2.0 * f["m"],
        "rice_bacterial_leaf_blight": 2.8 * f["les"] + 2.2 * f["y"] + 0.4 * min(f["n"], 15) / 15,
        "rice_brown_spot": 3.4 * f["les"] + 1.0 * f["y"] + 0.8 * min(f["n"], 15) / 15 - 1.2 * f["m"],
        "maize_fall_armyworm": 2.2 * f["les"] + 2.0 * f["y"] + 0.3 * min(f["n"], 20) / 20,
        "maize_northern_leaf_blight": 3.5 * f["les"] + 1.5 * min(f["n"], 15) / 15 - 1.5 * f["m"],
        "chilli_leaf_curl": 2.5 * f["y"] + 1.4 * f["p"] - 0.8 * f["m"],
        "chilli_anthracnose": 3.8 * f["les"] + 1.0 * min(f["n"], 12) / 12 - 1.0 * f["m"],
        "mango_powdery_mildew": 4.0 * f["p"] + 1.0 * f["y"] - 1.0 * f["les"],
        "mango_anthracnose": 3.6 * f["les"] + 1.0 * min(f["n"], 12) / 12 - 1.2 * f["m"],
        "groundnut_leaf_spot": 3.6 * f["les"] + 1.0 * min(f["n"], 15) / 15 - 1.0 * f["m"],
        "onion_purple_blotch": 3.4 * f["les"] + 1.4 * f["y"] - 1.0 * f["m"],
    }


def classify(image_bytes, crop="any"):
    f = _features(Image.open(io.BytesIO(image_bytes)).convert("RGB"))
    sc = _scores(f)
    ranked = sorted(POOLS.get(crop, ALL), key=lambda k: -sc[k])
    top = ranked[0]
    margin = sc[top] - (sc[ranked[1]] if len(ranked) > 1 else 0)
    conf = round(max(0.55, min(0.96, 0.62 + margin * 0.5)), 2)
    les = f["les"]
    sev = "none" if top == "healthy" else "early-stage" if les < 0.08 else "moderate" if les < 0.2 else "severe"
    return {"disease_id": top, "confidence": conf, "severity": sev}
