@echo off
echo ===================================================================
echo CyAgro Database Setup Script
echo ===================================================================
echo.

set /p username="Enter MySQL username (default: ada): "
if "%username%"=="" set username=ada

set /p database="Enter database name (default: cyagro): "
if "%database%"=="" set database=cyagro

echo.
echo Connecting to MySQL...
echo.

REM First, run the safe setup check
echo Checking database status...
mysql -u %username% -p -e "source safe_setup.sql"

echo.
echo ===================================================================
echo INSTRUCTIONS:
echo.
echo 1. If tables do not exist, run the schema extension:
echo    mysql -u %username% -p %database% ^< schema_extension.sql
echo.
echo 2. Then load sample data:
echo    mysql -u %username% -p %database% ^< sample_data.sql
echo.
echo 3. If tables exist, you can still run sample_data.sql safely
echo    (it uses INSERT IGNORE to avoid duplicates)
echo ===================================================================
echo.

choice /c YN /m "Do you want to run the schema extension now"
if errorlevel 2 goto :sample_data
if errorlevel 1 goto :schema

:schema
echo Running schema extension...
mysql -u %username% -p %database% < schema_extension.sql
if errorlevel 1 (
    echo Error running schema extension!
    pause
    exit /b 1
)
echo Schema extension completed successfully!
echo.

:sample_data
choice /c YN /m "Do you want to load sample data now"
if errorlevel 2 goto :end
if errorlevel 1 goto :load_data

:load_data
echo Loading sample data...
mysql -u %username% -p %database% < sample_data.sql
if errorlevel 1 (
    echo Error loading sample data!
    pause
    exit /b 1
)
echo Sample data loaded successfully!

:end
echo.
echo ===================================================================
echo Database setup completed!
echo.
echo You can now start the FastAPI server:
echo   cd ..\fastapi
echo   .\start_server.bat
echo.
echo API will be available at: http://localhost:8000
echo API Documentation at: http://localhost:8000/docs
echo ===================================================================
pause