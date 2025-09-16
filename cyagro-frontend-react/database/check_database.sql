-- ===================================================================
-- STEP BY STEP DATABASE SETUP GUIDE
-- ===================================================================

-- ΒΗΜΑ 1: Ελέγξτε τι πίνακες υπάρχουν ήδη
SHOW TABLES;

-- ΒΗΜΑ 2: Ελέγξτε τη δομή του users πίνακα (αν υπάρχει)
-- Αν αυτό δώσει error, σημαίνει ότι δεν υπάρχει ο πίνακας users
DESCRIBE users;

-- Αν ο παραπάνω πίνακας ΔΕΝ υπάρχει, τότε:
-- ΒΗΜΑ 3: Εκτελέστε το schema extension
-- mysql -u ada -p cyagro < schema_extension.sql

-- ΒΗΜΑ 4: Μετά το schema, εκτελέστε το sample data
-- mysql -u ada -p cyagro < sample_data.sql

-- Για να ελέγξετε αν όλα πήγαν καλά:
SELECT 'Database status after setup:' as Status;
SELECT TABLE_NAME, TABLE_ROWS FROM information_schema.tables WHERE table_schema = 'cyagro' ORDER BY TABLE_NAME;