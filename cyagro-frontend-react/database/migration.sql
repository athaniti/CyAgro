-- ===================================================================
-- Migration Script για επέκταση υπάρχουσας βάσης
-- Προσθήκη νέων πινάκων στην υπάρχουσα βάση δεδομένων
-- ===================================================================

-- Έλεγχος αν η βάση υπάρχει (προσαρμόστε το όνομα)
-- USE cyagro_db;

-- Δημιουργία backup των υπαρχόντων πινάκων (προαιρετικό)
-- SHOW TABLES LIKE 'cultivation_groups';
-- SHOW TABLES LIKE 'cultivations';
-- SHOW TABLES LIKE 'varieties';
-- SHOW TABLES LIKE 'harmful_causes';

-- Έλεγχος εάν οι βασικοί πίνακες υπάρχουν
SELECT 'Έλεγχος υπαρχόντων πινάκων...' AS Message;

SELECT 
    CASE 
        WHEN COUNT(*) > 0 THEN 'EXISTS' 
        ELSE 'NOT EXISTS' 
    END AS cultivation_groups_status
FROM information_schema.tables 
WHERE table_schema = DATABASE() 
AND table_name = 'cultivation_groups';

SELECT 
    CASE 
        WHEN COUNT(*) > 0 THEN 'EXISTS' 
        ELSE 'NOT EXISTS' 
    END AS cultivations_status
FROM information_schema.tables 
WHERE table_schema = DATABASE() 
AND table_name = 'cultivations';

SELECT 
    CASE 
        WHEN COUNT(*) > 0 THEN 'EXISTS' 
        ELSE 'NOT EXISTS' 
    END AS varieties_status
FROM information_schema.tables 
WHERE table_schema = DATABASE() 
AND table_name = 'varieties';

SELECT 
    CASE 
        WHEN COUNT(*) > 0 THEN 'EXISTS' 
        ELSE 'NOT EXISTS' 
    END AS harmful_causes_status
FROM information_schema.tables 
WHERE table_schema = DATABASE() 
AND table_name = 'harmful_causes';

-- Αν οι πίνακες δεν υπάρχουν, δημιουργήστε τους πρώτα
-- Παραδείγματα (προσαρμόστε σύμφωνα με την υπάρχουσα δομή)

CREATE TABLE IF NOT EXISTS cultivation_groups (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cultivations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cultivation_group_id INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cultivation_group_id) REFERENCES cultivation_groups(id)
);

CREATE TABLE IF NOT EXISTS varieties (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cultivation_id INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cultivation_id) REFERENCES cultivations(id)
);

CREATE TABLE IF NOT EXISTS harmful_causes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    severity_level ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Προσθήκη sample data για τους βασικούς πίνακες αν είναι άδειοι
INSERT IGNORE INTO cultivation_groups (id, name, description) VALUES
(1, 'Μόνιμες Καλλιέργειες', 'Δένδρα και πολυετείς καλλιέργειες'),
(2, 'Ετήσιες Καλλιέργειες', 'Καλλιέργειες που συγκομίζονται εντός του έτους');

INSERT IGNORE INTO cultivations (id, cultivation_group_id, name, description) VALUES
(1, 1, 'Ελιά', 'Καλλιέργεια ελιάς'),
(2, 1, 'Εσπεριδοειδή', 'Πορτοκάλια, λεμόνια, κ.λπ.'),
(3, 2, 'Σιτάρι', 'Καλλιέργεια σιταριού'),
(4, 2, 'Κριθάρι', 'Καλλιέργεια κριθαριού');

INSERT IGNORE INTO varieties (id, cultivation_id, name, description) VALUES
(1, 1, 'Κορωνέικη', 'Ποικιλία ελιάς'),
(2, 1, 'Καλαμών', 'Ποικιλία ελιάς'),
(3, 2, 'Πορτοκάλια Βαλέντσια', 'Ποικιλία πορτοκαλιάς'),
(4, 2, 'Λεμόνια Εουρέκα', 'Ποικιλία λεμονιάς'),
(5, 3, 'Σιτάρι Σκληρό', 'Ποικιλία σκληρού σιταριού'),
(6, 3, 'Σιτάρι Μαλακό', 'Ποικιλία μαλακού σιταριού'),
(7, 4, 'Κριθάρι Ζωοτροφής', 'Ποικιλία κριθαριού για ζωοτροφή');

INSERT IGNORE INTO harmful_causes (id, name, description, severity_level) VALUES
(1, 'Χαλάζι', 'Βλάβες από καιρικά φαινόμενα - χαλάζι', 'high'),
(2, 'Παγετός', 'Βλάβες από παγετό', 'medium'),
(3, 'Ανεμοθύελλα', 'Βλάβες από δυνατούς ανέμους', 'medium'),
(4, 'Πλημμύρα', 'Βλάβες από πλημμύρες', 'critical'),
(5, 'Ξηρασία', 'Βλάβες από παρατεταμένη ξηρασία', 'high');

-- Τώρα εκτελέστε το κυρίως schema extension
SELECT 'Δημιουργία νέων πινάκων...' AS Message;

-- Περισσότερες λεπτομέρειες στο schema_extension.sql
SOURCE schema_extension.sql;