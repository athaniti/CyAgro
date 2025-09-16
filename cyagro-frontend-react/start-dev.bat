@echo off
echo Starting CyAgro Development Environment
echo =======================================

echo.
echo Step 1: Starting FastAPI Server...
echo.
cd /d "%~dp0\fastapi"
start "FastAPI Server" cmd /c "python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"

echo Step 2: Waiting for FastAPI to start...
timeout /t 3 /nobreak >nul

echo.
echo Step 3: Starting React Development Server...
echo.
cd /d "%~dp0"
start "React Dev Server" cmd /c "npm run dev"

echo.
echo =======================================
echo Both servers are starting in separate windows:
echo - FastAPI Server: http://localhost:8000
echo - React App: http://localhost:3000
echo - API Docs: http://localhost:8000/docs
echo =======================================
echo.
echo Press any key to exit this script...
pause >nul