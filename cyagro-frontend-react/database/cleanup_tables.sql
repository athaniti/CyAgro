-- ===================================================================
-- SAFE DROP SCRIPT
-- Διαγράφει μόνο τους νέους πίνακες (όχι τους υπάρχοντες του FastAPI)
-- ===================================================================

USE cyagro;

-- Απενεργοποίηση foreign key checks για ασφαλή διαγραφή
SET FOREIGN_KEY_CHECKS = 0;

-- Έλεγχος ποιοι πίνακες υπάρχουν πριν τη διαγραφή
SELECT 'Tables before cleanup:' as Status;
SHOW TABLES;

-- ================= DROP ΝΕΟΥΣ ΠΙΝΑΚΕΣ =================
-- (Διατηρούμε τους υπάρχοντες: departments, land_parcels, cultivation_groups, cultivations, varieties, harmful_causes)

DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS damage_declarations;
DROP TABLE IF EXISTS cultivation_declarations;
DROP TABLE IF EXISTS agricultural_plot_land_plots;
DROP TABLE IF EXISTS agricultural_plots;
DROP TABLE IF EXISTS land_plots;  -- Αυτός διαγράφεται γιατί γίνεται plots
DROP TABLE IF EXISTS plots;
DROP TABLE IF EXISTS communities;
DROP TABLE IF EXISTS provinces;
DROP TABLE IF EXISTS regions;
DROP TABLE IF EXISTS users;

-- Επανενεργοποίηση foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Έλεγχος ποιοι πίνακες απομένουν μετά τη διαγραφή
SELECT 'Tables after cleanup:' as Status;
SHOW TABLES;

SELECT '✅ Cleanup completed! You can now run schema_corrected.sql' as Message;