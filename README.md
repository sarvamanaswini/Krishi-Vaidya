# Krishi Vaidya — AI Crop Doctor + Weather Intelligence — Prototype

A working demo of the full pipeline from the pitch:

```
Photo upload → disease/pest detection → local weather analysis →
disease-risk prediction → recommended action → expert validation flag →
multilingual chatbot (EN/HI/TE) → officials' hotspot dashboard
```

## Run it

```bash
pip install -r requirements.txt
python app.py
```

Then open **http://localhost:5000** for the farmer app, and
**http://localhost:5000/dashboard** for the officials' view (fill in a
few diagnoses on the farmer side first — the dashboard reads from the
same in-memory log).

No API keys are required to run the demo. Everything works offline.

## What's real vs. what's mocked (be upfront about this with judges)

| Stage | This prototype | For a production build |
|---|---|---|
| Disease detection | Color-heuristic classifier (`classify_image` in `app.py`) — deterministic per photo, no ML model | Fine-tune EfficientNet/MobileNetV3 on PlantVillage + local crop photos |
| Weather | Synthetic, location-seeded 5-day forecast; **will use the real OpenWeatherMap API automatically if you set `OPENWEATHER_API_KEY`** | Same call, real key, maybe add IMD data for India-specific accuracy |
| Risk prediction | Rule-based: known temperature/humidity thresholds per disease vs. forecast | Train on historical outbreak + weather data per disease/region |
| Recommendations | Static dictionary of IPDM steps per disease | Same structure, expand the dictionary with an agronomist |
| Chatbot | Keyword-matched canned responses in 3 languages, grounded to the current diagnosis | RAG: pass diagnosis+forecast+recommendation as retrieved context to an LLM, so it's still grounded but handles open-ended questions |
| Voice | Browser's built-in Web Speech API (client-side, free, works in Chrome/Edge) | Same, or swap in Bhashini / Google Cloud STT-TTS for better Indian-language coverage |
| Pest-trap/sensor input | Manual number entry that overrides day-0 forecast | Real IoT feed (soil/leaf moisture sensor, pest-trap counter) via MQTT or a simple webhook into `/api/weather`'s `sensor` field |
| Hotspot map | Leaflet + OpenStreetMap, plotting logged diagnoses (demo coordinates keyed by place name) | Real lat/lon from the farmer's phone GPS at capture time |
| Expert validation / dashboard | In-memory log, "Flag for expert review" button, aggregated counts | Real DB (Postgres), auth for extension officers, notification pipeline |

## Why it's structured this way

Every "PRODUCTION SWAP" comment in `app.py` marks a function you can
replace without touching the Flask routes or the frontend — the contract
(disease → weather → risk → recommendation → chat) stays the same. That
means during the hackathon your ML teammates can drop in a real model
into `classify_image()` and everything downstream keeps working.

## File map

```
app.py                  Flask backend — all 5 pipeline stages + dashboard API
templates/index.html    Farmer-facing app
templates/dashboard.html Officials' surveillance view
static/style.css        Design system (see comments for color/type tokens)
static/app.js           Frontend pipeline orchestration + chat + voice
static/dashboard.js     Dashboard data fetch + Leaflet hotspot map
```


## Update notes
- Full Telugu/Hindi/English switching (UI, results, advice, chat, dashboard) via static/i18n.js
- classifier.py: feature-based demo classifier, choose the crop for better results (still not a trained model)
- Website layout: nav, hero, how it works, diagnose tool


## Expanded disease coverage (SIH26131)
This prototype now includes additional crop-health labels for tomato, potato, wheat, rice, maize, chilli, mango, groundnut and onion. The added library covers 21 non-healthy disease/pest labels plus healthy status.

Important: `classifier.py` is still a transparent demo heuristic. Adding labels expands the decision-support library and crop-specific candidate pools, but it does not replace a trained image model. For a production/SIH field deployment, train and validate a multi-class vision model on representative Indian field images and keep low-confidence cases routed to an extension officer or laboratory.


## Deploy to GitHub + Render

1. Upload the contents of this folder to a GitHub repository (the files in this folder should be at the repository root).
2. On Render, create a new Web Service from the GitHub repository.
3. Build command: `pip install -r requirements.txt`
4. Start command: `gunicorn app:app`
5. Optional: add `OPENWEATHER_API_KEY` in Render Environment Variables to enable live OpenWeather forecast data.

The application uses the Render-provided `PORT` automatically when started with Python, while Gunicorn is used for production deployment.
