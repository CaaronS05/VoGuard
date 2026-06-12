from __future__ import annotations

import math
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List

import librosa
import numpy as np
import soundfile as sf


TARGET_SR = 16000
FRAME_LENGTH = 2048
HOP_LENGTH = 512


class AudioAnalysisError(ValueError):
    """Raised when audio cannot be analyzed in a friendly frontend-safe way."""


def _safe_float(value: Any, default: float = 0.0) -> float:
    if value is None:
        return default
    value = float(value)
    if math.isnan(value) or math.isinf(value):
        return default
    return value


def _clip01(value: float) -> float:
    return float(np.clip(value, 0.0, 1.0))


def _normalize_audio(y: np.ndarray) -> np.ndarray:
    if y.ndim > 1:
        y = np.mean(y, axis=1)
    y = y.astype(np.float32)
    peak = np.max(np.abs(y)) if y.size else 0
    if peak > 0:
        y = y / peak
    return y


def _load_audio(path: Path) -> tuple[np.ndarray, int]:
    try:
        y, sr = sf.read(path, always_2d=False)
        y = _normalize_audio(np.asarray(y))
        if sr != TARGET_SR:
            y = librosa.resample(y, orig_sr=sr, target_sr=TARGET_SR)
            sr = TARGET_SR
        y, _ = librosa.effects.trim(y, top_db=36)
        return y, sr
    except Exception:
        try:
            y, sr = librosa.load(path, sr=TARGET_SR, mono=True)
            y = _normalize_audio(y)
            y, _ = librosa.effects.trim(y, top_db=36)
            return y, sr
        except Exception as exc:
            raise AudioAnalysisError("Audio file could not be decoded. Use a clear WAV file when possible.") from exc


def _downsample_series(values: np.ndarray, points: int = 720) -> List[float]:
    values = np.asarray(values, dtype=np.float32).flatten()
    if values.size == 0:
        return []
    if values.size <= points:
        return [_safe_float(v) for v in values]
    indexes = np.linspace(0, values.size - 1, points).astype(int)
    return [_safe_float(values[index]) for index in indexes]


def _high_frequency_ratio(y: np.ndarray, sr: int) -> float:
    spectrum = np.abs(np.fft.rfft(y))
    if spectrum.size == 0 or np.sum(spectrum) <= 0:
        return 0.0
    freqs = np.fft.rfftfreq(y.size, 1 / sr)
    high_energy = np.sum(spectrum[freqs > 4000])
    total_energy = np.sum(spectrum)
    return _safe_float(high_energy / total_energy)


def _risk_level(score: int) -> str:
    if score >= 70:
        return "High Risk"
    if score >= 40:
        return "Medium Risk"
    return "Low Risk"


def _recommendation(level: str) -> str:
    if level == "High Risk":
        return "Restrict high-value transaction and escalate to manual verification."
    if level == "Medium Risk":
        return "Ask for additional verification before processing sensitive requests."
    return "Continue call monitoring. No immediate restriction recommended."


def analyze_audio(path: str | Path, source_type: str = "upload", original_filename: str = "") -> Dict[str, Any]:
    audio_path = Path(path)
    y, sr = _load_audio(audio_path)
    duration = _safe_float(len(y) / sr)

    if duration < 2.0:
        raise AudioAnalysisError("Audio is too short for a useful prototype score. Please provide at least 5 seconds.")

    rms = librosa.feature.rms(y=y, frame_length=FRAME_LENGTH, hop_length=HOP_LENGTH)[0]
    mean_rms = _safe_float(np.mean(rms))
    if mean_rms < 0.008:
        raise AudioAnalysisError("Audio is too silent to analyze. Please record closer to the microphone or upload clearer audio.")

    waveform = _downsample_series(y, 720)
    rms_diff = np.abs(np.diff(rms)) if rms.size > 1 else np.array([0.0])
    rms_stability = 1.0 - _clip01(_safe_float(np.std(rms) / (mean_rms + 1e-6)))
    temporal_instability = _clip01(_safe_float(np.mean(rms_diff) / (mean_rms + 1e-6)) * 2.8)

    pitches = librosa.yin(y, fmin=50, fmax=600, sr=sr, frame_length=FRAME_LENGTH, hop_length=HOP_LENGTH)
    pitches = np.asarray(pitches)
    voiced = pitches[np.isfinite(pitches)]
    voiced = voiced[(voiced >= 50) & (voiced <= 600)]
    voiced_ratio = _safe_float(voiced.size / max(1, pitches.size))

    pitch_mean = _safe_float(np.mean(voiced)) if voiced.size else 0.0
    pitch_std = _safe_float(np.std(voiced)) if voiced.size else 0.0
    pitch_range = _safe_float(np.percentile(voiced, 95) - np.percentile(voiced, 5)) if voiced.size > 4 else 0.0
    pitch_delta = np.abs(np.diff(voiced)) if voiced.size > 1 else np.array([])
    pitch_jump_count = int(np.sum(pitch_delta > 80))
    pitch_jump_ratio = _safe_float(pitch_jump_count / max(1, pitch_delta.size))

    centroid = librosa.feature.spectral_centroid(y=y, sr=sr, hop_length=HOP_LENGTH)[0]
    bandwidth = librosa.feature.spectral_bandwidth(y=y, sr=sr, hop_length=HOP_LENGTH)[0]
    rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr, hop_length=HOP_LENGTH)[0]
    zcr = librosa.feature.zero_crossing_rate(y, frame_length=FRAME_LENGTH, hop_length=HOP_LENGTH)[0]
    high_ratio = _high_frequency_ratio(y, sr)
    clipped_ratio = _safe_float(np.mean(np.abs(y) > 0.985))

    centroid_mean = _safe_float(np.mean(centroid))
    centroid_std = _safe_float(np.std(centroid))
    bandwidth_mean = _safe_float(np.mean(bandwidth))
    bandwidth_std = _safe_float(np.std(bandwidth))
    zcr_mean = _safe_float(np.mean(zcr))

    pitch_anomaly = _clip01(
        pitch_jump_ratio * 2.2
        + max(0.0, (pitch_std - 70) / 140)
        + max(0.0, (pitch_range - 220) / 360)
        + max(0.0, (0.42 - voiced_ratio) / 0.42)
    )
    spectral_anomaly = _clip01(
        max(0.0, (centroid_mean - 2500) / 3500)
        + max(0.0, high_ratio - 0.16) * 2.6
        + max(0.0, centroid_std / (centroid_mean + 1e-6) - 0.58)
        + max(0.0, bandwidth_std / (bandwidth_mean + 1e-6) - 0.52)
    )
    quality_anomaly = _clip01(
        max(0.0, (0.018 - mean_rms) / 0.018)
        + max(0.0, clipped_ratio - 0.01) * 9
        + max(0.0, (5.0 - duration) / 5.0) * 0.35
    )

    risk_score = int(round((0.35 * pitch_anomaly + 0.35 * spectral_anomaly + 0.20 * temporal_instability + 0.10 * quality_anomaly) * 100))
    risk_score = int(np.clip(risk_score, 0, 100))
    risk_level = _risk_level(risk_score)

    anomalies = []
    if pitch_anomaly > 0.42:
        anomalies.append("Pitch discontinuity detected")
    if spectral_anomaly > 0.42:
        anomalies.append("Unstable spectral energy pattern")
    if high_ratio > 0.18:
        anomalies.append("Abnormal high-frequency energy ratio")
    if temporal_instability > 0.42:
        anomalies.append("Temporal instability proxy elevated")
    if quality_anomaly > 0.34:
        anomalies.append("Audio quality issue detected")

    metrics = {
        "pitch_mean": round(pitch_mean, 2),
        "pitch_std": round(pitch_std, 2),
        "pitch_range": round(pitch_range, 2),
        "pitch_jump_count": pitch_jump_count,
        "pitch_jump_ratio": round(pitch_jump_ratio, 4),
        "voiced_ratio": round(voiced_ratio, 4),
        "spectral_centroid_mean": round(centroid_mean, 2),
        "spectral_centroid_std": round(centroid_std, 2),
        "spectral_bandwidth_mean": round(bandwidth_mean, 2),
        "spectral_bandwidth_std": round(bandwidth_std, 2),
        "spectral_rolloff_mean": round(_safe_float(np.mean(rolloff)), 2),
        "high_frequency_energy_ratio": round(high_ratio, 4),
        "rms_energy_stability": round(rms_stability, 4),
        "zero_crossing_rate": round(zcr_mean, 4),
        "clipped_sample_ratio": round(clipped_ratio, 4),
        "pitch_anomaly_score": round(pitch_anomaly, 4),
        "spectral_anomaly_score": round(spectral_anomaly, 4),
        "temporal_instability_proxy": round(temporal_instability, 4),
        "quality_anomaly_score": round(quality_anomaly, 4),
    }

    chart_data = {
        "waveform": waveform,
        "pitch_curve": _downsample_series(np.nan_to_num(pitches, nan=0.0), 360),
        "spectral_energy": _downsample_series(centroid / max(1.0, np.max(centroid)), 96),
        "rms": _downsample_series(rms, 180),
    }

    return {
        "session_id": f"VG-{uuid.uuid4().hex[:10].upper()}",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "source_type": source_type,
        "filename": original_filename or audio_path.name,
        "duration": round(duration, 2),
        "risk_score": risk_score,
        "risk_level": risk_level,
        "metrics": metrics,
        "anomalies": anomalies,
        "recommendation": _recommendation(risk_level),
        "chart_data": chart_data,
        "disclaimer": "Prototype score from basic signal analysis. This is not a production forensic detector.",
    }
