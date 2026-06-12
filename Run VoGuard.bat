@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title VoGuard Local

call :find_python
if not defined PYTHON call :install_python
if not defined PYTHON goto :python_error

if exist ".venv\Scripts\python.exe" (
  .venv\Scripts\python.exe -c "import sys; raise SystemExit(0 if (3, 10) <= sys.version_info[:2] <= (3, 12) else 1)" >nul 2>nul
  if errorlevel 1 (
    echo Environment lama tidak kompatibel. Membuat ulang dengan Python 3.10-3.12...
    rmdir /s /q .venv
  )
)

if not exist ".venv\Scripts\python.exe" (
  echo [1/3] Membuat environment Python VoGuard...
  %PYTHON% -m venv .venv
  if errorlevel 1 goto :error
)

echo [2/3] Menyiapkan installer paket Python...
.venv\Scripts\python.exe -m pip install --upgrade pip setuptools wheel
if errorlevel 1 goto :error

echo [3/3] Memasang dan memeriksa seluruh dependensi VoGuard...
.venv\Scripts\python.exe -m pip install --prefer-binary -r requirements.txt
if errorlevel 1 goto :error
.venv\Scripts\python.exe -m pip check
if errorlevel 1 goto :error
.venv\Scripts\python.exe -c "import flask, librosa, numpy, scipy, soundfile"
if errorlevel 1 goto :error

set "VOGUARD_PORT=5055"
set "VOGUARD_URL=http://127.0.0.1:5055"
echo VoGuard berjalan di %VOGUARD_URL%
echo Tutup jendela ini atau tekan Ctrl+C untuk menghentikan aplikasi.
start "" /b cmd /c "for /L %%i in (1,1,60) do @(.venv\Scripts\python.exe -c ""import urllib.request; urllib.request.urlopen('http://127.0.0.1:5055/api/health', timeout=1)"" >nul 2>nul && (start "" http://127.0.0.1:5055 & exit) || timeout /t 1 /nobreak >nul)"
.venv\Scripts\python.exe app.py
exit /b %errorlevel%

:find_python
set "PYTHON="
where py >nul 2>nul
if not errorlevel 1 (
  for %%V in (3.12 3.11 3.10) do (
    py -%%V -c "import sys; raise SystemExit(0 if f'{sys.version_info.major}.{sys.version_info.minor}' == '%%V' else 1)" >nul 2>nul
    if not errorlevel 1 if not defined PYTHON set "PYTHON=py -%%V"
  )
)
if defined PYTHON exit /b 0

where python >nul 2>nul
if errorlevel 1 exit /b 0
for /f "delims=" %%V in ('python -c "import sys; print(1 if (3, 10) ^<= sys.version_info[:2] ^<= (3, 12) else 0)" 2^>nul') do set "PYTHON_OK=%%V"
if "%PYTHON_OK%"=="1" set "PYTHON=python"
exit /b 0

:install_python
where winget >nul 2>nul
if errorlevel 1 exit /b 0
echo Python 3.10-3.12 yang kompatibel belum ditemukan.
echo VoGuard akan memasang Python 3.12 beserta pip terlebih dahulu...
winget install --id Python.Python.3.12 --exact --source winget --accept-package-agreements --accept-source-agreements
if errorlevel 1 exit /b 0
set "PYTHON=%LocalAppData%\Programs\Python\Python312\python.exe"
if not exist "%LocalAppData%\Programs\Python\Python312\python.exe" set "PYTHON="
if not defined PYTHON call :find_python
exit /b 0

:python_error
echo.
echo Python 3.10, 3.11, atau 3.12 tidak ditemukan dan instalasi otomatis gagal.
echo Install Python 3.12 dari https://www.python.org/downloads/release/python-31210/
echo Saat instalasi, aktifkan opsi "Add python.exe to PATH" dan "pip".
pause
exit /b 1

:error
echo.
echo VoGuard gagal disiapkan.
echo Pastikan internet tersedia dan gunakan Python 3.10-3.12, bukan Python 3.13+.
echo Jika folder .venv berasal dari instalasi lama, hapus folder tersebut lalu jalankan ulang.
pause
exit /b 1
