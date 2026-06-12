from __future__ import annotations

import os
import uuid
from pathlib import Path
from typing import Any, Dict

from flask import Flask, jsonify, render_template, request, send_file
from werkzeug.utils import secure_filename

from analysis.audio_analyzer import AudioAnalysisError, analyze_audio
from analysis.report_store import SessionStore


ROOT = Path(__file__).parent
UPLOAD_DIR = ROOT / "uploads"
DATA_DIR = ROOT / "data"
DATASET_DIR = ROOT / "datasets"
ALLOWED_EXTENSIONS = {".wav", ".mp3", ".m4a", ".flac", ".ogg", ".webm"}

app = Flask(__name__)
store = SessionStore(DATA_DIR / "sessions.json")


def ensure_project_folders() -> None:
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    (DATASET_DIR / "real").mkdir(parents=True, exist_ok=True)
    (DATASET_DIR / "manipulated").mkdir(parents=True, exist_ok=True)
    if not (DATA_DIR / "sessions.json").exists():
        (DATA_DIR / "sessions.json").write_text("[]\n", encoding="utf-8")


def error_response(message: str, status: int = 400):
    return jsonify({"ok": False, "error": message}), status


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/health")
def health():
    return jsonify({"ok": True, "status": "OK", "product": "VoGuard"})


@app.route("/api/analyze", methods=["POST"])
def analyze():
    ensure_project_folders()

    uploaded = request.files.get("audio")
    source_type = request.form.get("source_type", "upload")

    if uploaded is None or not uploaded.filename:
        return error_response("No audio file was provided.")

    original_name = secure_filename(uploaded.filename) or "audio.wav"
    extension = Path(original_name).suffix.lower()
    if extension and extension not in ALLOWED_EXTENSIONS:
        return error_response("Unsupported audio format. WAV is preferred; MP3/M4A/FLAC/OGG/WebM may work if supported locally.")

    saved_name = f"{uuid.uuid4().hex[:12]}_{original_name}"
    saved_path = UPLOAD_DIR / saved_name
    uploaded.save(saved_path)

    try:
        result: Dict[str, Any] = analyze_audio(saved_path, source_type=source_type, original_filename=original_name)
    except AudioAnalysisError as exc:
        return error_response(str(exc))
    except Exception as exc:
        return error_response(f"Analysis failed: {exc}", 500)

    result["stored_audio"] = str(saved_path.relative_to(ROOT))
    store.add(result)
    return jsonify({"ok": True, "result": result})


@app.route("/api/sessions")
def sessions():
    return jsonify({"ok": True, "sessions": store.all()})


@app.route("/api/sessions/<session_id>")
def session_detail(session_id: str):
    session = store.get(session_id)
    if not session:
        return error_response("Session not found.", 404)
    return jsonify({"ok": True, "session": session})


@app.route("/api/report/<session_id>")
def report(session_id: str):
    session = store.get(session_id)
    if not session:
        return error_response("Session not found.", 404)

    report_path = DATA_DIR / f"{session_id}.json"
    import json

    report_path.write_text(json.dumps(session, indent=2), encoding="utf-8")
    return send_file(report_path, as_attachment=True, download_name=f"{session_id}-report.json")


if __name__ == "__main__":
    ensure_project_folders()
    port = int(os.environ.get("VOGUARD_PORT", "5055"))
    app.run(host="127.0.0.1", port=port, debug=False, use_reloader=False)
