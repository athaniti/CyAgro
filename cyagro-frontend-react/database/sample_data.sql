-- ===================================================================
-- Sample Data για τους νέους πίνακες
-- Χρησιμοποιεί INSERT IGNORE για να αποφύγει duplicate errors
-- ===================================================================

-- Περιφέρειες (INSERT IGNORE για να αποφύγουμε duplicates)
INSERT IGNORE INTO regions (name, code) VALUES
('Λευκωσία', 'NIC'),
('Λεμεσός', 'LIM'),
('Λάρνακα', 'LAR'),
('Πάφος', 'PAF'),
('Αμμόχωστος', 'FAM');

-- Επαρχίες
INSERT IGNORE INTO provinces (region_id, name, code) VALUES
(1, 'Λευκωσία', 'NIC01'),
(2, 'Λεμεσός', 'LIM01'),
(3, 'Λάρνακα', 'LAR01'),
(4, 'Πάφος', 'PAF01'),
(5, 'Αμμόχωστος', 'FAM01');

-- Κοινότητες (δείγμα)
INSERT IGNORE INTO communities (province_id, name, code) VALUES
(1, 'Λευκωσία', 'NIC0101'),
(1, 'Στρόβολος', 'NIC0102'),
(1, 'Λακατάμια', 'NIC0103'),
(1, 'Περιστερώνα', 'NIC0104'),
(2, 'Λεμεσός', 'LIM0101'),
(2, 'Εργάτες', 'LIM0102'),
(2, 'Σούτρα', 'LIM0103'),
(3, 'Λάρνακα', 'LAR0101'),
(3, 'Λειβάδια', 'LAR0102'),
(3, 'Αράδιππος', 'LAR0103'),
(4, 'Πάφος', 'PAF0101'),
(4, 'Γερόσκηπου', 'PAF0102'),
(5, 'Αμμόχωστος', 'FAM0101'),
(5, 'Παραλίμνι', 'FAM0102');

-- Δείγμα χρηστών
INSERT IGNORE INTO users (username, email, password_hash, first_name, last_name, phone, id_number, has_profile, role) VALUES
('petros.iakovou', 'petros.iakovou@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6dWOr9wG/W', 'Πέτρος', 'Ιακώβου', '+357 99123456', '123456789', TRUE, 'farmer'),
('maria.georgiou', 'maria.georgiou@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6dWOr9wG/W', 'Μαρία', 'Γεωργίου', '+357 99654321', '987654321', TRUE, 'farmer'),
('andreas.papadopoulos', 'andreas.papadopoulos@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6dWOr9wG/W', 'Ανδρέας', 'Παπαδόπουλος', '+357 99887766', '112233445', FALSE, 'farmer'),
('eleni.konstantinou', 'eleni.konstantinou@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6dWOr9wG/W', 'Ελένη', 'Κωνσταντίνου', '+357 99445566', '556677889', TRUE, 'farmer'),
('inspector1', 'inspector@cyagro.gov.cy', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6dWOr9wG/W', 'Γιάννης', 'Επιθεωρητής', '+357 22123456', '999888777', TRUE, 'inspector'),
('admin1', 'admin@cyagro.gov.cy', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6dWOr9wG/W', 'Διαχειριστής', 'Συστήματος', '+357 22654321', '111222333', TRUE, 'admin');

-- Δείγμα τεμαχίων (plots)
INSERT IGNORE INTO plots (owner_id, community_id, plot_number, area_in_sqm, location_description, coordinates_lat, coordinates_lng, soil_type, irrigation_type, ownership_type) VALUES
(1, 4, 'XXI-52-8-147', 255000, 'Περιστερώνα, κοντά στο κέντρο', 35.1264, 33.4299, 'Αργιλλώδες', 'drip', 'owned'),
(1, 4, 'XXI-52-8-148', 187500, 'Περιστερώνα, διπλανό τεμάχιο', 35.1265, 33.4301, 'Αμμώδες', 'sprinkler', 'owned'),
(2, 7, 'XV-23-12-89', 320000, 'Σούτρα, κεντρικό τμήμα', 34.9876, 33.2145, 'Πηλώδες', 'flood', 'owned'),
(2, 7, 'XV-23-12-90', 152500, 'Σούτρα, ανατολικό τμήμα', 34.9877, 33.2147, 'Βραχώδες', 'none', 'rented'),
(4, 11, 'VIII-15-5-256', 450000, 'Πάφος, κοντά στην παραλία', 34.7567, 32.4123, 'Αργιλλώδες', 'drip', 'owned');

-- Δείγμα αγροτεμαχίων (agricultural_plots)
INSERT IGNORE INTO agricultural_plots (plot_id, cultivation_id, variety_id, area_in_sqm, planting_date, expected_harvest_date, irrigation_system, notes, status) VALUES
(1, 1, 1, 240000, '2024-01-15', '2024-12-15', 'Σταγόνα υψηλής πίεσης', 'Εσπεριδοειδή υψηλής ποιότητας', 'growing'),
(2, 3, 5, 175000, '2024-03-01', '2024-08-15', 'Καταιονισμός', 'Βιολογική καλλιέργεια', 'planted'),
(3, 2, 3, 300000, '2023-11-20', '2024-10-30', 'Πλημμυριστική', 'Παραδοσιακή καλλιέργεια', 'growing'),
(5, 4, 7, 350000, '2024-02-10', '2024-07-20', 'Σταγόνα', 'Νέα φυτεία', 'planted');

-- Δείγμα δηλώσεων καλλιέργειας
INSERT IGNORE INTO cultivation_declarations (user_id, agricultural_plot_id, cultivation_year, declared_area, coverage_type, estimated_production, cultivation_practices, status, fee_amount, payment_status) VALUES
(1, 1, 2024, 240000, 'full', 15000.00, 'Τακτικό πότισμα και λίπανση', 'approved', 250.00, 'paid'),
(1, 2, 2024, 175000, 'basic', 8000.00, 'Βιολογικές μέθοδοι', 'submitted', 120.00, 'pending'),
(2, 3, 2024, 300000, 'full', 20000.00, 'Παραδοσιακές μέθοδοι', 'approved', 300.00, 'paid'),
(4, 4, 2024, 350000, 'full', 25000.00, 'Σύγχρονες τεχνικές', 'approved', 350.00, 'paid');

-- Δείγμα δηλώσεων ζημιάς
INSERT IGNORE INTO damage_declarations (user_id, agricultural_plot_id, harmful_cause_id, damage_date, affected_area, damage_percentage, estimated_loss, description, status) VALUES
(1, 1, 1, '2024-07-15', 84000, 35.50, 2500.00, 'Βλάβες από χαλάζι στα εσπεριδοειδή. Σημαντικές ζημιές στους καρπούς και τα φύλλα.', 'reported'),
(2, 3, 2, '2024-06-20', 68250, 22.75, 1800.00, 'Ζημιές από παγετό στην ελιά. Επηρεάστηκαν οι ανθοφορίες.', 'approved');

-- Δείγμα εγγράφων
INSERT IGNORE INTO documents (cultivation_declaration_id, damage_declaration_id, filename, original_filename, file_path, file_size, mime_type, document_type) VALUES
(1, NULL, 'cult_decl_1_2024.pdf', 'Δήλωση_Καλλιέργειας_1.pdf', '/uploads/cultivation/cult_decl_1_2024.pdf', 256784, 'application/pdf', 'certificate'),
(NULL, 1, 'damage_photos_1.zip', 'Φωτογραφίες_Ζημιάς_1.zip', '/uploads/damage/damage_photos_1.zip', 2048576, 'application/zip', 'photo'),
(3, NULL, 'organic_cert_3.pdf', 'Πιστοποιητικό_Βιολογικής_3.pdf', '/uploads/cultivation/organic_cert_3.pdf', 189432, 'application/pdf', 'certificate'),
(NULL, 2, 'frost_damage_report.pdf', 'Αναφορά_Παγετού.pdf', '/uploads/damage/frost_damage_report.pdf', 345621, 'application/pdf', 'other');

-- Μηνύματα επιτυχίας
SELECT 'Sample data inserted successfully!' as Message;
SELECT CONCAT('Regions: ', COUNT(*)) as Summary FROM regions;
SELECT CONCAT('Users: ', COUNT(*)) as Summary FROM users;
SELECT CONCAT('Plots: ', COUNT(*)) as Summary FROM plots;
SELECT CONCAT('Agricultural Plots: ', COUNT(*)) as Summary FROM agricultural_plots;
SELECT CONCAT('Cultivation Declarations: ', COUNT(*)) as Summary FROM cultivation_declarations;
SELECT CONCAT('Damage Declarations: ', COUNT(*)) as Summary FROM damage_declarations;