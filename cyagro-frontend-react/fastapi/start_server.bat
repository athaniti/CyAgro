@echo off
echo Starting CyAgro FastAPI Server...
echo.

REM Check if virtual environment exists
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install/upgrade dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Check if .env exists
if not exist ".env" (
    echo Copying .env.example to .env...
    copy .env.example .env
    echo.
    echo Please edit .env file with your database credentials!
    echo Then run this script again.
    pause
    exit /b
)

REM Start the server
echo.
echo Starting FastAPI server on http://localhost:8000
echo API Documentation available at http://localhost:8000/docs
echo.
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000