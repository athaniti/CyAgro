@echo off
echo ===================================================================
echo CyAgro Database Quick Setup
echo ===================================================================
echo.
echo This script will set up your database step by step.
echo Make sure MySQL is running and you have access to the 'cyagro' database.
echo.

set /p username="Enter MySQL username (default: ada): "
if "%username%"=="" set username=ada

echo.
echo STEP 1: Checking current database status...
echo.
mysql -u %username% -p cyagro < check_database.sql

echo.
echo ===================================================================
echo Did you see a "users" table in the list above?
echo.
echo If NO (Table doesn't exist):
echo   - Answer Y to continue with setup
echo.
echo If YES (Table already exists):
echo   - Answer N and just run sample_data.sql separately
echo ===================================================================
echo.

choice /c YN /m "Continue with full setup (create new tables)"
if errorlevel 2 goto :sample_only
if errorlevel 1 goto :full_setup

:full_setup
echo.
echo STEP 2: Creating new database schema...
mysql -u %username% -p cyagro < schema_extension.sql
if errorlevel 1 (
    echo ❌ Error creating schema! Please check the error above.
    pause
    exit /b 1
)
echo ✅ Schema created successfully!

echo.
echo STEP 3: Loading sample data...
mysql -u %username% -p cyagro < sample_data.sql
if errorlevel 1 (
    echo ❌ Error loading sample data! Please check the error above.
    pause
    exit /b 1
)
echo ✅ Sample data loaded successfully!
goto :success

:sample_only
echo.
echo Loading sample data only...
mysql -u %username% -p cyagro < sample_data.sql
if errorlevel 1 (
    echo ❌ Error loading sample data! Please check the error above.
    pause
    exit /b 1
)
echo ✅ Sample data loaded successfully!

:success
echo.
echo ===================================================================
echo 🎉 DATABASE SETUP COMPLETED SUCCESSFULLY!
echo.
echo Next steps:
echo 1. Start the FastAPI server:
echo    cd ..\fastapi
echo    .\start_server.bat
echo.
echo 2. Test the API at: http://localhost:8000/docs
echo.
echo 3. Test login with:
echo    Username: petros.iakovou
echo    Password: secret
echo.
echo    Or admin access:
echo    Username: admin1  
echo    Password: secret
echo ===================================================================
pause