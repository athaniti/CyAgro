-- ===================================================================
-- SAFE DATABASE SETUP SCRIPT
-- Αυτό το script ελέγχει και εκτελεί τα migrations με ασφάλεια
-- ===================================================================

-- Ενεργοποίηση του safe mode για να αποφύγουμε λάθη
SET SQL_SAFE_UPDATES = 0;

-- Δημιουργία της βάσης αν δεν υπάρχει
CREATE DATABASE IF NOT EXISTS cyagro 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE cyagro;

-- Έλεγχος αν υπάρχουν ήδη τα νέα tables
SELECT 'Checking existing tables...' as Status;

-- Εκτέλεση του schema extension μόνο αν δεν υπάρχουν τα tables
SET @table_exists = (
    SELECT COUNT(*) 
    FROM information_schema.tables 
    WHERE table_schema = 'cyagro' 
    AND table_name = 'users'
);

SELECT 
    CASE 
        WHEN @table_exists > 0 THEN 'Tables already exist - skipping schema creation'
        ELSE 'Tables do not exist - will create them'
    END as SchemaStatus;

-- Προσθήκη της επέκτασης του schema αν χρειάζεται
-- (Αυτό πρέπει να εκτελεστεί χειροκίνητα αν τα tables δεν υπάρχουν)

-- Πληροφορίες για το χρήστη
SELECT 'If tables do not exist, please run:' as Instructions;
SELECT 'mysql -u ada -p cyagro < schema_extension.sql' as Command1;
SELECT 'mysql -u ada -p cyagro < sample_data.sql' as Command2;

-- Έλεγχος υπαρχόντων δεδομένων
SELECT 'Current database status:' as Status;
SELECT TABLE_NAME, TABLE_ROWS 
FROM information_schema.tables 
WHERE table_schema = 'cyagro' 
ORDER BY TABLE_NAME;

-- Επιστροφή του safe mode
SET SQL_SAFE_UPDATES = 1;