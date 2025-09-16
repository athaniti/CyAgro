@echo off
echo ===================================================================
echo CyAgro Database Setup - COMPLETE SETUP WITH CLEANUP
echo ===================================================================
echo.
echo This script will:
echo 1. Clean up any conflicting tables
echo 2. Create the correct schema
echo 3. Load sample data
echo.

set /p username="Enter MySQL username (default: ada): "
if "%username%"=="" set username=ada

echo.
echo ===================================================================
echo WARNING: This will DROP existing tables if they have wrong structure!
echo.
echo Tables that will be DROPPED (if they exist):
echo - users, regions, provinces, communities
echo - plots, land_plots, agricultural_plots
echo - cultivation_declarations, damage_declarations, documents
echo.
echo Tables that will be PRESERVED:
echo - departments, land_parcels, cultivation_groups
echo - cultivations, varieties, harmful_causes
echo ===================================================================
echo.

choice /c YN /m "Continue with cleanup and setup"
if errorlevel 2 goto :cancel
if errorlevel 1 goto :cleanup

:cleanup
echo.
echo STEP 1: Cleaning up conflicting tables...
mysql -u %username% -p cyagro < cleanup_tables.sql
if errorlevel 1 (
    echo ❌ Error during cleanup! Please check the error above.
    pause
    exit /b 1
)
echo ✅ Cleanup completed!

echo.
echo STEP 2: Creating corrected schema...
mysql -u %username% -p cyagro < schema_corrected.sql
if errorlevel 1 (
    echo ❌ Error creating schema! Please check the error above.
    pause
    exit /b 1
)
echo ✅ Schema created successfully!

echo.
echo STEP 3: Loading sample data...
mysql -u %username% -p cyagro < sample_data_corrected.sql
if errorlevel 1 (
    echo ❌ Error loading sample data! Please check the error above.
    pause
    exit /b 1
)
echo ✅ Sample data loaded successfully!

echo.
echo ===================================================================
echo 🎉 COMPLETE DATABASE SETUP FINISHED!
echo.
echo Your database is now ready for the FastAPI server.
echo.
echo Test Users (password: secret):
echo - petros.iakovou (farmer)
echo - maria.georgiou (farmer)
echo - inspector1 (inspector)
echo - admin1 (admin)
echo.
echo Next Steps:
echo 1. cd ..\fastapi
echo 2. .\start_server.bat
echo 3. Test at: http://localhost:8000/docs
echo ===================================================================
goto :end

:cancel
echo Operation cancelled by user.

:end
pause