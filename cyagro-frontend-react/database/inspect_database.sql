-- ===================================================================
-- DATABASE INSPECTION SCRIPT
-- Δείχνει τι υπάρχει στη βάση χωρίς να αλλάξει τίποτα
-- ===================================================================

USE cyagro;

SELECT '===== CURRENT DATABASE STATUS =====' as Info;

-- Δείχνει όλους τους πίνακες
SELECT 'All tables in database:' as Info;
SHOW TABLES;

-- Ελέγχει αν υπάρχουν οι νέοι πίνακες
SELECT 'Checking for new tables...' as Info;

SELECT 
    CASE 
        WHEN (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'cyagro' AND table_name = 'users') > 0 
        THEN '✅ users table exists'
        ELSE '❌ users table missing'
    END as users_status;

SELECT 
    CASE 
        WHEN (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'cyagro' AND table_name = 'plots') > 0 
        THEN '✅ plots table exists'
        ELSE '❌ plots table missing'
    END as plots_status;

SELECT 
    CASE 
        WHEN (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'cyagro' AND table_name = 'regions') > 0 
        THEN '✅ regions table exists'
        ELSE '❌ regions table missing'
    END as regions_status;

-- Αν υπάρχει ο users πίνακας, δείχνει τη δομή του
SELECT 'Checking users table structure...' as Info;

SELECT 
    CASE 
        WHEN (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = 'cyagro' AND table_name = 'users' AND column_name = 'username') > 0 
        THEN '✅ users.username column exists'
        ELSE '❌ users.username column missing'
    END as username_column_status;

-- Δείχνει πόσες εγγραφές έχει κάθε πίνακας (αν υπάρχει)
SELECT 'Record counts:' as Info;

SELECT 
    (SELECT COUNT(*) FROM cultivation_groups) as cultivation_groups_count,
    (SELECT COUNT(*) FROM cultivations) as cultivations_count,
    (SELECT COUNT(*) FROM varieties) as varieties_count,
    (SELECT COUNT(*) FROM harmful_causes) as harmful_causes_count;

-- Recommendation
SELECT '===== RECOMMENDATION =====' as Info;
SELECT 
    CASE 
        WHEN (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'cyagro' AND table_name = 'users') = 0 
        THEN '👉 Run: complete_setup.bat (fresh install)'
        WHEN (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = 'cyagro' AND table_name = 'users' AND column_name = 'username') = 0
        THEN '👉 Run: complete_setup.bat (table structure mismatch)'
        ELSE '👉 Database looks good! You can start the FastAPI server.'
    END as recommendation;