# VoGuard Local MVP

VoGuard is a local enterprise voice integrity prototype for banks, contact centers, investors, and business partners. It records microphone audio or analyzes uploaded files, runs basic signal-processing checks, and returns a manipulation risk indication with charts, anomalies, and a downloadable JSON report.

This is an MVP prototype, not a production-grade deepfake detector or forensic system. It does not claim 100% accuracy.

## Features

- Premium single-page dashboard with sidebar navigation.
- Microphone recording in the browser.
- Browser-side WAV export using Web Audio API.
- Audio upload analysis.
- Flask API with local JSON session storage.
- Rule-based audio signal analysis with `numpy`, `librosa`, and `soundfile`.
- Risk score from 0-100 with Low / Medium / High categories.
- Waveform, pitch curve, and spectral energy charts using Chart.js.
- Simulated live call panel using the latest analysis result.
- Forensic log stored in `data/sessions.json`.
- Downloadable JSON report for each session.
- Dataset folders prepared for future ML training.

## Prototype Limitations

- The score is a prototype risk indication from basic signal analysis.
- It cannot prove that audio is manipulated.
- It does not measure true RTP/network packet jitter or micro-latency because it analyzes recorded/uploaded audio.
- The temporal metric is labeled as a temporal instability proxy.
- MP3/M4A support depends on the local audio stack. WAV is recommended.

## Setup

### Sekali klik

- macOS: klik dua kali `Run VoGuard.command`.
- Windows: klik dua kali `Run VoGuard.bat`.
- Linux: jalankan `./run-voguard.sh`.

Launcher membuat `.venv`, memasang dependensi pada run pertama, menjalankan aplikasi lokal, dan membuka browser secara otomatis. Python 3.10+ tetap diperlukan, tetapi Docker dan perintah backend manual tidak diperlukan.

### Manual

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

On Windows:

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Open:

```text
http://127.0.0.1:5055
```

## Folder Structure

```text
app.py
requirements.txt
README.md
analysis/
  __init__.py
  audio_analyzer.py
  report_store.py
data/
  sessions.json
uploads/
datasets/
  real/
  manipulated/
  README.md
static/
  css/
    style.css
  js/
    app.js
  assets/
templates/
  index.html
```

The existing landing page files in the project root are preserved. The Flask MVP serves the dashboard from `templates/index.html`.

## How To Record Audio

1. Open the dashboard.
2. Go to `Live Detection`.
3. Click `Start Recording`.
4. Speak clearly for 5-10 seconds.
5. Click `Stop Recording`.
6. Wait for the analysis result.

## How To Upload Audio

1. Go to `Upload Audio`.
2. Choose or drag an audio file.
3. WAV is preferred.
4. The backend analyzes the same pipeline used for microphone recordings.

## Risk Score Explanation

VoGuard combines four prototype anomaly scores:

- Pitch anomaly score.
- Spectral anomaly score.
- Temporal instability proxy.
- Audio quality anomaly score.

Weighted formula:

```text
risk_score = (
  0.35 * pitch_anomaly_score +
  0.35 * spectral_anomaly_score +
  0.20 * temporal_instability_proxy +
  0.10 * quality_anomaly_score
) * 100
```

Risk categories:

- `0-39`: Low Risk
- `40-69`: Medium Risk
- `70-100`: High Risk

## API

- `GET /` serves the dashboard.
- `GET /api/health` returns local API status.
- `POST /api/analyze` accepts multipart audio and returns analysis JSON.
- `GET /api/sessions` returns saved sessions.
- `GET /api/sessions/<session_id>` returns one session.
- `GET /api/report/<session_id>` downloads a JSON report.

## Recommended Next Steps

- Add validated labeled datasets.
- Add ML model experiments after dataset preparation.
- Add authenticated team workspaces.
- Add streaming pipeline integration for real call systems.
- Add stronger audio format handling and deployment packaging.
