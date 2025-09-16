@echo off
echo ===================================================================
echo CyAgro Database Setup - CORRECTED VERSION
echo ===================================================================
echo.
echo This script uses the corrected SQL files that match FastAPI models
echo.

set /p username="Enter MySQL username (default: ada): "
if "%username%"=="" set username=ada

echo.
echo STEP 1: Running corrected schema...
mysql -u %username% -p cyagro < schema_corrected.sql
if errorlevel 1 (
    echo ❌ Error creating schema! Please check the error above.
    pause
    exit /b 1
)
echo ✅ Schema created successfully!

echo.
echo STEP 2: Loading corrected sample data...
mysql -u %username% -p cyagro < sample_data_corrected.sql
if errorlevel 1 (
    echo ❌ Error loading sample data! Please check the error above.
    pause
    exit /b 1
)
echo ✅ Sample data loaded successfully!

echo.
echo ===================================================================
echo 🎉 DATABASE SETUP COMPLETED SUCCESSFULLY!
echo.
echo Database Summary:
echo - All tables are compatible with FastAPI models
echo - Sample users created with password "secret"
echo - Geographic data for Cyprus added
echo - Sample plots and declarations added
echo.
echo Test Users:
echo - Username: petros.iakovou   (farmer)
echo - Username: maria.georgiou   (farmer)
echo - Username: inspector1       (inspector)
echo - Username: admin1           (admin)
echo - Password for all: secret
echo.
echo Next Steps:
echo 1. Start the FastAPI server:
echo    cd ..\fastapi
echo    .\start_server.bat
echo.
echo 2. Test the API at: http://localhost:8000/docs
echo.
echo 3. Try login endpoint with any of the test users
echo ===================================================================
pause