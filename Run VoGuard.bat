@echo off
setlocal
cd /d "%~dp0"
title VoGuard Local

where py >nul 2>nul
if %errorlevel%==0 (
  set "PYTHON=py -3"
) else (
  where python >nul 2>nul
  if %errorlevel%==0 (
    set "PYTHON=python"
  ) else (
    echo Python tidak ditemukan.
    echo Install Python 3.10 atau lebih baru dari https://www.python.org/downloads/
    echo Saat instalasi, centang opsi "Add Python to PATH".
    pause
    exit /b 1
  )
)

if not exist ".venv\Scripts\python.exe" (
  echo Menyiapkan VoGuard untuk pertama kali...
  %PYTHON% -m venv .venv
  if errorlevel 1 goto :error
)

.venv\Scripts\python.exe -c "import flask, librosa, numpy, scipy, soundfile" >nul 2>nul
if errorlevel 1 (
  echo Memasang dependensi. Proses ini hanya diperlukan pada run pertama...
  .venv\Scripts\python.exe -m pip install --upgrade pip
  if errorlevel 1 goto :error
  .venv\Scripts\python.exe -m pip install -r requirements.txt
  if errorlevel 1 goto :error
)

set "VOGUARD_PORT=5055"
set "VOGUARD_URL=http://127.0.0.1:5055"
echo VoGuard berjalan di %VOGUARD_URL%
echo Tutup jendela ini atau tekan Ctrl+C untuk menghentikan aplikasi.
start "" /b cmd /c "for /L %%i in (1,1,60) do @(.venv\Scripts\python.exe -c ""import urllib.request; urllib.request.urlopen('http://127.0.0.1:5055/api/health', timeout=1)"" >nul 2>nul && (start "" http://127.0.0.1:5055 & exit) || timeout /t 1 /nobreak >nul)"
.venv\Scripts\python.exe app.py
exit /b %errorlevel%

:error
echo.
echo VoGuard gagal disiapkan. Periksa koneksi internet dan instalasi Python.
pause
exit /b 1
