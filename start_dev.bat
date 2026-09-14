@echo off
chcp 65001 >nul
echo.
echo  ╔══════════════════════════════════════════╗
echo  ║         GUIDE Q — Development Server        ║
echo  ╚══════════════════════════════════════════╝
echo.
echo  [1/2] Starting FastAPI backend on http://localhost:8000 ...
start "GUIDE Q — Backend (FastAPI)" cmd /k "cd /d "%~dp0backend" && echo Installing dependencies... && pip install -r requirements.txt -q && echo. && echo Backend starting at http://localhost:8000 && echo API docs at  http://localhost:8000/docs && echo. && uvicorn main:app --reload --port 8000"

timeout /t 2 /nobreak >nul

echo  [2/2] Starting frontend server on http://localhost:8765 ...
start "GUIDE Q — Frontend (http.server)" cmd /k "cd /d "%~dp0" && echo. && echo Frontend available at http://localhost:8765 && echo. && python -m http.server 8765"

timeout /t 3 /nobreak >nul

echo.
echo  ✅ Both servers starting...
echo.
echo  Frontend : http://localhost:8765
echo  Backend  : http://localhost:8000
echo  API Docs : http://localhost:8000/docs
echo.
echo  Opening browser...
start "" "http://localhost:8765"
echo.
pause
