"""
Krishi Vaidya — AI Crop Doctor + Weather Intelligence — prototype backend
==========================================================

Pipeline implemented as five stages, mirroring the architecture:
  photo -> /api/diagnose      (disease/pest detection)
  loc   -> /api/weather       (5-day local forecast)
  both  -> /api/risk          (disease-risk prediction)
  both  -> /api/recommend     (recommended action)
  msg   -> /api/chat          (grounded chatbot)

DEMO MODE: every "AI" stage below uses transparent, deterministic
heuristics instead of a trained model or a live weather API key, so the
app.run(debug=True, host="0.0.0.0", port=5000)
is written so a real model/API can be dropped in without touching the
routes or the frontend contract. See README.md for exactly what to
swap in for production.
"""

import hashlib
import io
import os
import random
from datetime import datetime, timedelta

from flask import Flask, jsonify, render_template, request
from PIL import Image

from classifier import classify

app = Flask(__name__)

# ---------------------------------------------------------------------------
# Stage 1: Disease / pest detection
# ---------------------------------------------------------------------------
# PRODUCTION SWAP: replace `classify_image()` with inference from a CNN
# (e.g. EfficientNet-B0 or MobileNetV3 fine-tuned on PlantVillage + local
# crop images), returning the same {disease, crop, confidence, severity}
# shape so nothing downstream has to change.

DISEASE_LIBRARY = {
    "tomato_early_blight": {
        "label": "Tomato — Early Blight",
        "crop": "Tomato",
        "pathogen": "Alternaria solani (fungus)",
        "favorable": {"humidity_min": 80, "temp_range": (24, 29), "rain_boost": True},
    },
    "tomato_late_blight": {
        "label": "Tomato — Late Blight",
        "crop": "Tomato",
        "pathogen": "Phytophthora infestans (oomycete)",
        "favorable": {"humidity_min": 90, "temp_range": (10, 24), "rain_boost": True},
    },
    "wheat_leaf_rust": {
        "label": "Wheat — Leaf Rust",
        "crop": "Wheat",
        "pathogen": "Puccinia triticina (fungus)",
        "favorable": {"humidity_min": 70, "temp_range": (15, 22), "rain_boost": False},
    },
    "rice_blast": {
        "label": "Rice — Blast",
        "crop": "Rice",
        "pathogen": "Magnaporthe oryzae (fungus)",
        "favorable": {"humidity_min": 85, "temp_range": (25, 28), "rain_boost": True},
    },
    "healthy": {
        "label": "Healthy — no disease detected",
        "crop": "Unknown",
        "pathogen": None,
        "favorable": None,
    },
}

RECOMMENDATIONS = {
    "tomato_early_blight": {
        "steps": [
            "Remove and destroy affected lower leaves to slow spread",
            "Apply a chlorothalonil or mancozeb-based fungicide every 7-10 days",
            "Avoid overhead irrigation; water at the base instead",
        ],
        "organic_alternative": "Neem oil spray (2%) every 5-7 days as a preventive layer",
        "dosage": "Mancozeb 75% WP — 2.5g/litre of water",
    },
    "tomato_late_blight": {
        "steps": [
            "Isolate affected plants immediately — this spreads fast",
            "Apply a copper oxychloride or cymoxanil-based fungicide within 24-48 hours",
            "Improve field drainage and spacing to reduce humidity around plants",
        ],
        "organic_alternative": "Copper-based organic fungicide (Bordeaux mixture)",
        "dosage": "Copper oxychloride 50% WP — 3g/litre of water",
    },
    "wheat_leaf_rust": {
        "steps": [
            "Apply a propiconazole or tebuconazole-based fungicide at first sign",
            "Monitor neighbouring fields — rust spreads via windborne spores",
            "Avoid excess nitrogen fertilizer, which increases susceptibility",
        ],
        "organic_alternative": "Sulfur dust application in early stages",
        "dosage": "Propiconazole 25% EC — 1ml/litre of water",
    },
    "rice_blast": {
        "steps": [
            "Drain standing water temporarily to reduce humidity at the base",
            "Apply a tricyclazole-based fungicide as soon as lesions appear",
            "Use balanced nitrogen — split doses rather than one heavy application",
        ],
        "organic_alternative": "Pseudomonas fluorescens bio-fungicide spray",
        "dosage": "Tricyclazole 75% WP — 0.6g/litre of water",
    },
    "healthy": {
        "steps": [
            "No treatment needed",
            "Continue routine monitoring, especially after rain",
        ],
        "organic_alternative": None,
        "dosage": None,
    },
}


DISEASE_LIBRARY.update({
    "potato_late_blight": {"label": "Potato — Late Blight", "crop": "Potato", "pathogen": "Phytophthora infestans", "favorable": {"humidity_min": 90, "temp_range": (10, 24), "rain_boost": True}},
    "wheat_powdery_mildew": {"label": "Wheat — Powdery Mildew", "crop": "Wheat", "pathogen": "Blumeria graminis", "favorable": {"humidity_min": 70, "temp_range": (15, 25), "rain_boost": False}},
    "pest_aphid": {"label": "Pest — Aphids / Whitefly", "crop": "Any", "pathogen": None, "favorable": {"humidity_min": 50, "temp_range": (25, 32), "rain_boost": False}},
})
for _k in ("potato_late_blight",): RECOMMENDATIONS[_k] = RECOMMENDATIONS["tomato_late_blight"]
RECOMMENDATIONS["wheat_powdery_mildew"] = RECOMMENDATIONS["wheat_leaf_rust"]
RECOMMENDATIONS["pest_aphid"] = RECOMMENDATIONS["wheat_leaf_rust"]

# Expanded crop-health library for SIH26131 prototype. These entries are
# decision-support labels; image recognition remains a transparent heuristic
# until a crop/disease-trained vision model is plugged into classifier.py.
DISEASE_LIBRARY.update({
    "tomato_bacterial_spot": {"label": "Tomato — Bacterial Spot", "crop": "Tomato", "pathogen": "Xanthomonas spp. (bacterium)", "favorable": {"humidity_min": 80, "temp_range": (24, 30), "rain_boost": True}},
    "tomato_septoria_leaf_spot": {"label": "Tomato — Septoria Leaf Spot", "crop": "Tomato", "pathogen": "Septoria lycopersici (fungus)", "favorable": {"humidity_min": 80, "temp_range": (20, 27), "rain_boost": True}},
    "potato_early_blight": {"label": "Potato — Early Blight", "crop": "Potato", "pathogen": "Alternaria solani (fungus)", "favorable": {"humidity_min": 75, "temp_range": (24, 29), "rain_boost": True}},
    "wheat_yellow_rust": {"label": "Wheat — Yellow/Stripe Rust", "crop": "Wheat", "pathogen": "Puccinia striiformis (fungus)", "favorable": {"humidity_min": 80, "temp_range": (10, 18), "rain_boost": False}},
    "rice_bacterial_leaf_blight": {"label": "Rice — Bacterial Leaf Blight", "crop": "Rice", "pathogen": "Xanthomonas oryzae pv. oryzae (bacterium)", "favorable": {"humidity_min": 80, "temp_range": (25, 32), "rain_boost": True}},
    "rice_brown_spot": {"label": "Rice — Brown Spot", "crop": "Rice", "pathogen": "Bipolaris oryzae (fungus)", "favorable": {"humidity_min": 80, "temp_range": (25, 30), "rain_boost": True}},
    "maize_fall_armyworm": {"label": "Maize — Fall Armyworm", "crop": "Maize", "pathogen": "Spodoptera frugiperda (insect)", "favorable": {"humidity_min": 55, "temp_range": (25, 32), "rain_boost": False}},
    "maize_northern_leaf_blight": {"label": "Maize — Northern Leaf Blight", "crop": "Maize", "pathogen": "Exserohilum turcicum (fungus)", "favorable": {"humidity_min": 80, "temp_range": (18, 27), "rain_boost": True}},
    "chilli_leaf_curl": {"label": "Chilli — Leaf Curl", "crop": "Chilli", "pathogen": "Begomovirus complex, commonly whitefly-transmitted", "favorable": {"humidity_min": 50, "temp_range": (24, 32), "rain_boost": False}},
    "chilli_anthracnose": {"label": "Chilli — Anthracnose", "crop": "Chilli", "pathogen": "Colletotrichum spp. (fungus)", "favorable": {"humidity_min": 80, "temp_range": (24, 30), "rain_boost": True}},
    "mango_powdery_mildew": {"label": "Mango — Powdery Mildew", "crop": "Mango", "pathogen": "Oidium mangiferae (fungus)", "favorable": {"humidity_min": 70, "temp_range": (20, 28), "rain_boost": False}},
    "mango_anthracnose": {"label": "Mango — Anthracnose", "crop": "Mango", "pathogen": "Colletotrichum gloeosporioides complex (fungus)", "favorable": {"humidity_min": 80, "temp_range": (24, 30), "rain_boost": True}},
    "groundnut_leaf_spot": {"label": "Groundnut — Tikka / Leaf Spot", "crop": "Groundnut", "pathogen": "Cercospora spp. (fungi)", "favorable": {"humidity_min": 80, "temp_range": (23, 30), "rain_boost": True}},
    "onion_purple_blotch": {"label": "Onion — Purple Blotch", "crop": "Onion", "pathogen": "Alternaria porri (fungus)", "favorable": {"humidity_min": 80, "temp_range": (20, 30), "rain_boost": True}},
})

RECOMMENDATIONS.update({
    "tomato_bacterial_spot": {"steps": ["Remove badly affected leaves and avoid handling wet foliage", "Use clean seed/transplants and avoid overhead irrigation", "For chemical control, use only a locally registered bactericide according to its label and extension guidance"], "organic_alternative": "Improve sanitation and use approved biological products where locally recommended", "dosage": None},
    "tomato_septoria_leaf_spot": {"steps": ["Remove infected lower leaves and crop debris", "Improve airflow and avoid overhead irrigation", "Use a locally registered fungicide only according to its label"], "organic_alternative": "Sanitation and approved bio-fungicide options", "dosage": None},
    "potato_early_blight": {"steps": ["Remove heavily affected foliage and manage volunteer plants", "Maintain balanced nutrition and avoid prolonged leaf wetness", "Use a locally registered fungicide according to the label and extension advice"], "organic_alternative": "Field sanitation and approved bio-fungicide options", "dosage": None},
    "wheat_yellow_rust": {"steps": ["Scout nearby wheat fields for yellow stripe symptoms", "Use a locally registered rust fungicide when threshold/extension guidance indicates treatment", "Avoid unnecessary nitrogen excess and record affected patches for follow-up"], "organic_alternative": "Use resistant varieties and clean seed as preventive measures", "dosage": None},
    "rice_bacterial_leaf_blight": {"steps": ["Avoid excess nitrogen and maintain balanced fertilization", "Improve field drainage and avoid unnecessary leaf wetness", "Seek extension confirmation before applying any bactericide"], "organic_alternative": "Use resistant varieties and approved biological/field sanitation measures", "dosage": None},
    "rice_brown_spot": {"steps": ["Maintain balanced nutrition, especially adequate potassium", "Remove volunteer plants and manage crop residue", "Use a locally registered fungicide only when recommended by extension guidance"], "organic_alternative": "Approved bio-fungicide and sanitation practices", "dosage": None},
    "maize_fall_armyworm": {"steps": ["Inspect whorls for larvae and fresh feeding damage", "Use pheromone/light monitoring and remove heavily infested plants where practical", "If treatment is required, use only a locally registered product according to its label and resistance-management guidance"], "organic_alternative": "Pheromone monitoring and approved biological controls such as Bt where locally recommended", "dosage": None},
    "maize_northern_leaf_blight": {"steps": ["Remove or manage infected crop residue", "Improve field scouting after humid or rainy periods", "Use resistant hybrids and a locally registered fungicide when advised"], "organic_alternative": "Resistant varieties and residue management", "dosage": None},
    "chilli_leaf_curl": {"steps": ["Check for whiteflies on the underside of leaves", "Remove severely affected plants and control weeds that can host vectors", "Use yellow sticky traps and seek extension guidance before chemical control"], "organic_alternative": "Yellow sticky traps and approved botanical/biological controls", "dosage": None},
    "chilli_anthracnose": {"steps": ["Remove affected fruits and plant debris", "Avoid overhead irrigation and improve field ventilation", "Use a locally registered fungicide according to label and extension advice"], "organic_alternative": "Sanitation and approved bio-fungicide options", "dosage": None},
    "mango_powdery_mildew": {"steps": ["Improve canopy airflow through appropriate pruning", "Scout flowers and young shoots during cool, humid weather", "Use a locally registered fungicide only according to label and extension advice"], "organic_alternative": "Canopy sanitation and approved biological options", "dosage": None},
    "mango_anthracnose": {"steps": ["Remove infected plant material and fallen fruit", "Improve canopy airflow and reduce prolonged wetness", "Use a locally registered fungicide according to label and extension advice"], "organic_alternative": "Sanitation and approved bio-fungicide options", "dosage": None},
    "groundnut_leaf_spot": {"steps": ["Scout lower leaves regularly for expanding spots", "Maintain balanced nutrition and manage crop residue", "Use a locally registered fungicide according to label and extension advice when treatment is justified"], "organic_alternative": "Crop rotation, resistant varieties and approved biological products", "dosage": None},
    "onion_purple_blotch": {"steps": ["Remove badly infected leaves and crop debris", "Avoid overhead irrigation and improve field ventilation", "Use a locally registered fungicide according to label and extension advice"], "organic_alternative": "Sanitation and approved bio-fungicide options", "dosage": None},
})


def classify_image(image_bytes: bytes) -> dict:
    """Deterministic color-heuristic 'classifier' standing in for a CNN.

    Looks at the dominant tone of the uploaded leaf photo (brown/necrotic
    vs yellow/chlorotic vs green/healthy) to pick a plausible diagnosis.
    Deterministic per-image (hash-seeded) so the same photo always gives
    the same result during a demo/rehearsal.
    """
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB").resize((64, 64))
    pixels = list(img.getdata())
    n = len(pixels)
    avg_r = sum(p[0] for p in pixels) / n
    avg_g = sum(p[1] for p in pixels) / n
    avg_b = sum(p[2] for p in pixels) / n

    brown_ratio = sum(1 for p in pixels if p[0] > p[1] > p[2] and p[0] - p[2] > 25) / n
    yellow_ratio = sum(1 for p in pixels if p[0] > 150 and p[1] > 150 and p[2] < 120) / n
    green_ratio = sum(1 for p in pixels if p[1] > p[0] and p[1] > p[2]) / n

    seed = int(hashlib.sha256(image_bytes[:2048]).hexdigest(), 16) % 1000
    rng = random.Random(seed)

    if brown_ratio > 0.18:
        disease_id = "tomato_late_blight" if brown_ratio > 0.30 else "tomato_early_blight"
        confidence = round(min(0.97, 0.72 + brown_ratio), 2)
    elif yellow_ratio > 0.15:
        disease_id = "wheat_leaf_rust"
        confidence = round(min(0.95, 0.68 + yellow_ratio), 2)
    elif green_ratio > 0.55 and brown_ratio < 0.05:
        disease_id = "healthy"
        confidence = round(min(0.96, 0.80 + rng.uniform(0, 0.1)), 2)
    else:
        disease_id = "rice_blast"
        confidence = round(0.65 + rng.uniform(0, 0.15), 2)

    severity = "none" if disease_id == "healthy" else (
        "severe" if confidence > 0.85 else "moderate" if confidence > 0.7 else "early-stage"
    )

    entry = DISEASE_LIBRARY[disease_id]
    return {
        "disease_id": disease_id,
        "disease_label": entry["label"],
        "crop": entry["crop"],
        "pathogen": entry["pathogen"],
        "confidence": confidence,
        "severity": severity,
        "avg_color": {"r": round(avg_r), "g": round(avg_g), "b": round(avg_b)},
    }


# ---------------------------------------------------------------------------
# Stage 2: Local weather analysis
# ---------------------------------------------------------------------------
# PRODUCTION SWAP: if OPENWEATHER_API_KEY is set, this calls the real
# OpenWeatherMap 5-day forecast endpoint. Otherwise it falls back to a
# deterministic, location-seeded synthetic forecast so the demo never
# depends on network access or an API key.

def get_weather_forecast(location: str) -> list:
    api_key = os.environ.get("OPENWEATHER_API_KEY")
    if api_key:
        try:
            import requests

            resp = requests.get(
                "https://api.openweathermap.org/data/2.5/forecast",
                params={"q": location, "appid": api_key, "units": "metric"},
                timeout=5,
            )
            resp.raise_for_status()
            data = resp.json()
            days = {}
            for item in data.get("list", []):
                day = item["dt_txt"].split(" ")[0]
                days.setdefault(day, []).append(item)
            forecast = []
            for day, items in list(days.items())[:5]:
                temps = [i["main"]["temp"] for i in items]
                hums = [i["main"]["humidity"] for i in items]
                rain = any("rain" in i for i in items)
                forecast.append({
                    "date": day,
                    "temp_c": round(sum(temps) / len(temps), 1),
                    "humidity": round(sum(hums) / len(hums)),
                    "rain_expected": rain,
                })
            if forecast:
                return forecast
        except Exception:
            pass  # fall through to synthetic forecast

    seed = int(hashlib.sha256(location.strip().lower().encode()).hexdigest(), 16) % 10000
    rng = random.Random(seed)
    forecast = []
    base_temp = rng.uniform(22, 30)
    base_humidity = rng.uniform(55, 92)
    for i in range(5):
        forecast.append({
            "date": (datetime.now() + timedelta(days=i)).strftime("%Y-%m-%d"),
            "temp_c": round(base_temp + rng.uniform(-2, 2), 1),
            "humidity": round(min(99, max(30, base_humidity + rng.uniform(-8, 8)))),
            "rain_expected": rng.random() > 0.55,
        })
    return forecast


# ---------------------------------------------------------------------------
# Stage 3: Disease-risk prediction
# ---------------------------------------------------------------------------
# Rule-based fusion of the diagnosed disease's known favorable conditions
# with the forecast. PRODUCTION SWAP: replace with a model trained on
# historical outbreak + weather data per disease/region.

def predict_risk(disease_id: str, forecast: list) -> dict:
    entry = DISEASE_LIBRARY[disease_id]
    favorable = entry["favorable"]
    if favorable is None:
        return {"risk_score": 0, "risk_label": "low", "reason": "No active disease detected.", "hits": 0, "total": 5}

    hits = 0
    for day in forecast:
        temp_ok = favorable["temp_range"][0] <= day["temp_c"] <= favorable["temp_range"][1]
        humidity_ok = day["humidity"] >= favorable["humidity_min"]
        rain_ok = day["rain_expected"] if favorable["rain_boost"] else True
        if temp_ok and humidity_ok and rain_ok:
            hits += 1

    risk_score = round((hits / len(forecast)) * 100)
    risk_label = "high" if risk_score >= 60 else "medium" if risk_score >= 30 else "low"
    reason = (
        f"{hits} of the next {len(forecast)} days have temperature/humidity conditions "
        f"favorable for {entry['label'].split(' — ')[1]} spread."
    )
    return {"risk_score": risk_score, "risk_label": risk_label, "reason": reason, "hits": hits, "total": len(forecast)}


# ---------------------------------------------------------------------------
# Stage 4: Recommended action
# ---------------------------------------------------------------------------

def get_recommendation(disease_id: str, risk_label: str, confidence: float = 1.0) -> dict:
    rec = RECOMMENDATIONS[disease_id].copy()
    if disease_id != "healthy" and risk_label == "high":
        rec["urgency"] = "Act within 24-48 hours — conditions favor rapid spread."
    elif disease_id != "healthy":
        rec["urgency"] = "Act within the week — monitor daily for spread."
    else:
        rec["urgency"] = "No action required."

    # Referral guidance: low-confidence or severe cases should not rely on the
    # app alone — route to a human expert, per the PS's "referral to extension
    # or laboratories" requirement.
    if disease_id != "healthy" and (confidence < 0.75 or risk_label == "high"):
        rec["referral"] = (
            "Confidence is below the safe threshold — please also show this photo to your "
            "nearest Krishi Vigyan Kendra (KVK) or extension officer before applying any input."
            if confidence < 0.75 else
            "High-risk conditions detected — notify your local extension officer so nearby "
            "fields can be checked too."
        )
    else:
        rec["referral"] = None
    return rec


# ---------------------------------------------------------------------------
# Stage 5: Grounded chatbot
# ---------------------------------------------------------------------------
# PRODUCTION SWAP: replace `answer_question()` with a RAG pipeline (the
# diagnosis+forecast+recommendation become the retrieved context passed to
# an LLM, grounded so it can't invent unrelated advice). Kept rule-based
# here so the demo needs no API key and never produces an off-topic answer.

CHAT_STRINGS = {
    "en": {
        "greeting": "Hello! Ask me what to do about your crop, the dosage, or the weather risk.",
        "dosage": "Recommended dosage: {dosage}",
        "steps": "Here's what to do: {steps}",
        "organic": "Organic option: {organic}",
        "risk": "Risk over the next 5 days: {risk_label} ({risk_score}%). {reason}",
        "healthy": "Good news — no disease was detected. Keep monitoring after rain.",
        "fallback": "I can tell you about treatment steps, dosage, organic options, or weather risk — ask me about any of those.",
    },
    "hi": {
        "greeting": "नमस्ते! अपनी फसल के बारे में, दवा की मात्रा या मौसम के जोखिम के बारे में पूछें।",
        "dosage": "अनुशंसित मात्रा: {dosage}",
        "steps": "यह करें: {steps}",
        "organic": "जैविक विकल्प: {organic}",
        "risk": "अगले 5 दिनों में जोखिम: {risk_label} ({risk_score}%). {reason}",
        "healthy": "अच्छी खबर — कोई रोग नहीं पाया गया। बारिश के बाद निगरानी जारी रखें।",
        "fallback": "मैं उपचार, मात्रा, जैविक विकल्प या मौसम जोखिम के बारे में बता सकता हूँ।",
    },
    "te": {
        "greeting": "నమస్తే! మీ పంట గురించి, మందు మోతాదు గురించి లేదా వాతావరణ ప్రమాదం గురించి అడగండి.",
        "dosage": "సిఫార్సు చేసిన మోతాదు: {dosage}",
        "steps": "ఇలా చేయండి: {steps}",
        "organic": "సేంద్రీయ ప్రత్యామ్నాయం: {organic}",
        "risk": "వచ్చే 5 రోజుల్లో ప్రమాదం: {risk_label} ({risk_score}%). {reason}",
        "healthy": "శుభవార్త — వ్యాధి ఏమీ కనుగొనబడలేదు. వర్షం తర్వాత పరిశీలన కొనసాగించండి.",
        "fallback": "నేను చికిత్స దశలు, మోతాదు, సేంద్రీయ ఎంపికలు లేదా వాతావరణ ప్రమాదం గురించి చెప్పగలను.",
    },
}


def answer_question(message: str, lang: str, context: dict) -> str:
    strings = CHAT_STRINGS.get(lang, CHAT_STRINGS["en"])
    msg = message.lower()
    disease_id = context.get("disease_id", "healthy")
    rec = RECOMMENDATIONS.get(disease_id, RECOMMENDATIONS["healthy"])
    risk = context.get("risk", {"risk_label": "low", "risk_score": 0, "reason": ""})

    if disease_id == "healthy":
        return strings["healthy"]
    if any(w in msg for w in ["dose", "dosage", "मात्रा", "మోతాదు"]):
        return strings["dosage"].format(dosage=rec["dosage"] or "N/A")
    if any(w in msg for w in ["organic", "जैविक", "సేంద్రీయ"]):
        return strings["organic"].format(organic=rec["organic_alternative"] or "N/A")
    if any(w in msg for w in ["weather", "risk", "मौसम", "जोखिम", "వాతావరణ", "ప్రమాదం"]):
        return strings["risk"].format(**risk)
    if any(w in msg for w in ["what should i do", "do", "करें", "చేయండి", "treatment", "steps"]):
        return strings["steps"].format(steps="; ".join(rec["steps"]))
    if any(w in msg for w in ["hi", "hello", "namaste", "నమస్తే", "नमस्ते"]):
        return strings["greeting"]
    return strings["fallback"]


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

# ---------------------------------------------------------------------------
# In-memory field log — stands in for a real DB. Backs the hotspot map,
# the officials' dashboard, and the "expert validation" / "learn from field
# confirmations" loop the PS asks for.
# ---------------------------------------------------------------------------
DIAGNOSIS_LOG = []
_next_id = [1]


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


@app.route("/api/diagnose", methods=["POST"])
def api_diagnose():
    if "photo" not in request.files:
        return jsonify({"error": "No photo uploaded"}), 400
    image_bytes = request.files["photo"].read()
    result = classify(image_bytes, request.form.get("crop", "any"))
    e = DISEASE_LIBRARY[result["disease_id"]]
    result.update(disease_label=e["label"], crop=e["crop"], pathogen=e["pathogen"])
    return jsonify(result)


@app.route("/api/weather", methods=["POST"])
def api_weather():
    data = request.json
    location = data.get("location", "Unknown")
    forecast = get_weather_forecast(location)

    # Optional pest-trap/sensor override for day 0 — stands in for a real
    # IoT feed (soil/leaf sensor, pest-trap counter) per the PS's
    # "pest-trap or sensor inputs" requirement. Manual entry in this demo.
    sensor = data.get("sensor")
    if sensor and forecast:
        if sensor.get("temp_c") is not None:
            forecast[0]["temp_c"] = sensor["temp_c"]
        if sensor.get("humidity") is not None:
            forecast[0]["humidity"] = sensor["humidity"]
        forecast[0]["source"] = "on-field sensor reading"

    return jsonify({"location": location, "forecast": forecast})


@app.route("/api/risk", methods=["POST"])
def api_risk():
    data = request.json
    risk = predict_risk(data["disease_id"], data["forecast"])
    return jsonify(risk)


@app.route("/api/recommend", methods=["POST"])
def api_recommend():
    data = request.json
    rec = get_recommendation(data["disease_id"], data["risk_label"], data.get("confidence", 1.0))
    return jsonify(rec)


@app.route("/api/log", methods=["POST"])
def api_log():
    """Save a diagnosis to the field log — feeds the hotspot map and the
    officials' dashboard, and creates a pending expert-validation record."""
    data = request.json
    entry = {
        "id": _next_id[0],
        "disease_id": data["disease_id"],
        "disease_label": data["disease_label"],
        "crop": data["crop"],
        "confidence": data["confidence"],
        "severity": data["severity"],
        "location": data.get("location", "Unknown"),
        "lat": data.get("lat"),
        "lon": data.get("lon"),
        "timestamp": datetime.now().isoformat(timespec="seconds"),
        "expert_status": "pending",
    }
    DIAGNOSIS_LOG.append(entry)
    _next_id[0] += 1
    return jsonify(entry)


@app.route("/api/log/<int:entry_id>/confirm", methods=["POST"])
def api_log_confirm(entry_id):
    """Simulates an extension officer confirming or correcting a diagnosis —
    the 'expert validation' + 'learn from field confirmations' loop."""
    status = request.json.get("status", "confirmed")
    for entry in DIAGNOSIS_LOG:
        if entry["id"] == entry_id:
            entry["expert_status"] = status
            return jsonify(entry)
    return jsonify({"error": "Not found"}), 404


@app.route("/api/dashboard-data")
def api_dashboard_data():
    """Aggregated view for agriculture officials: counts by disease, by
    location, and the raw log for the hotspot map."""
    by_disease = {}
    by_location = {}
    for e in DIAGNOSIS_LOG:
        by_disease[e["disease_label"]] = by_disease.get(e["disease_label"], 0) + 1
        by_location[e["location"]] = by_location.get(e["location"], 0) + 1
    return jsonify({
        "total": len(DIAGNOSIS_LOG),
        "pending_review": sum(1 for e in DIAGNOSIS_LOG if e["expert_status"] == "pending"),
        "by_disease": by_disease,
        "by_location": by_location,
        "entries": list(reversed(DIAGNOSIS_LOG)),
    })


@app.route("/api/chat", methods=["POST"])
def api_chat():
    data = request.json
    reply = answer_question(data["message"], data.get("lang", "en"), data.get("context", {}))
    return jsonify({"reply": reply})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=os.environ.get("FLASK_DEBUG", "0") == "1")
