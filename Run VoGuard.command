#!/bin/bash

set -e

cd "$(dirname "$0")"

PYTHON=""
if command -v python3 >/dev/null 2>&1; then
  PYTHON="python3"
elif command -v python >/dev/null 2>&1; then
  PYTHON="python"
else
  echo "Python tidak ditemukan. Install Python 3.10 atau lebih baru dari https://www.python.org/downloads/"
  read -r -p "Tekan Enter untuk menutup..."
  exit 1
fi

if [ ! -x ".venv/bin/python" ]; then
  echo "Menyiapkan VoGuard untuk pertama kali..."
  "$PYTHON" -m venv .venv
fi

if ! .venv/bin/python -c "import flask, librosa, numpy, scipy, soundfile" >/dev/null 2>&1; then
  echo "Memasang dependensi. Proses ini hanya diperlukan pada run pertama..."
  .venv/bin/python -m pip install --upgrade pip
  .venv/bin/python -m pip install -r requirements.txt
fi

export VOGUARD_PORT=5055
VOGUARD_URL="http://127.0.0.1:${VOGUARD_PORT}"

echo "VoGuard berjalan di ${VOGUARD_URL}"
echo "Tutup jendela ini atau tekan Ctrl+C untuk menghentikan aplikasi."

(
  for _ in $(seq 1 60); do
    if .venv/bin/python -c "import urllib.request; urllib.request.urlopen('${VOGUARD_URL}/api/health', timeout=1)" >/dev/null 2>&1; then
      break
    fi
    sleep 0.5
  done
  if command -v open >/dev/null 2>&1; then
    open "${VOGUARD_URL}"
  elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "${VOGUARD_URL}" >/dev/null 2>&1
  fi
) &

exec .venv/bin/python app.py
