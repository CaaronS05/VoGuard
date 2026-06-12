#!/bin/bash

set -e
cd "$(dirname "$0")"

PYTHON="$(command -v python3 || command -v python || true)"
if [ -z "$PYTHON" ]; then
  echo "Python 3.10+ tidak ditemukan. Install Python dari https://www.python.org/downloads/"
  exit 1
fi

if [ ! -x ".venv/bin/python" ]; then
  "$PYTHON" -m venv .venv
fi

if ! .venv/bin/python -c "import flask, librosa, numpy, scipy, soundfile" >/dev/null 2>&1; then
  .venv/bin/python -m pip install --upgrade pip
  .venv/bin/python -m pip install -r requirements.txt
fi

export VOGUARD_PORT=5055
VOGUARD_URL="http://127.0.0.1:${VOGUARD_PORT}"

(
  for _ in $(seq 1 60); do
    if .venv/bin/python -c "import urllib.request; urllib.request.urlopen('${VOGUARD_URL}/api/health', timeout=1)" >/dev/null 2>&1; then
      break
    fi
    sleep 0.5
  done
  xdg-open "${VOGUARD_URL}" >/dev/null 2>&1 || true
) &
exec .venv/bin/python app.py
