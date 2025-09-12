-- Δημιουργία πίνακα Τμημάτων
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL
);

-- Πίνακας Τεμαχίων / Αγροτεμαχίων
CREATE TABLE land_parcels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT,
    region VARCHAR(255),
    community VARCHAR(255),
    block VARCHAR(50),
    parcel_number VARCHAR(50),
    description TEXT,
    ownership ENUM('ownership','management') NOT NULL,
    contract_start DATE,
    contract_end DATE,
    status ENUM('inactive','active','pending') DEFAULT 'pending',
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Πίνακας Ομάδων Καλλιεργειών
CREATE TABLE cultivation_groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    accounting_code VARCHAR(50),
    koap_code VARCHAR(50)
);

-- Πίνακας Καλλιεργειών
CREATE TABLE cultivations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    season_start DATE,
    season_end DATE,
    type ENUM('annual','perennial'),
    coverage ENUM('full','basic'),
    full_price DECIMAL(10,2),
    basic_price DECIMAL(10,2),
    active_from DATE,
    active_to DATE,
    FOREIGN KEY (group_id) REFERENCES cultivation_groups(id)
);

-- Πίνακας Ποικιλιών
CREATE TABLE varieties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cultivation_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    unit ENUM('trees','area') NOT NULL,
    FOREIGN KEY (cultivation_id) REFERENCES cultivations(id)
);

-- Πίνακας Ζημιογόνων
CREATE TABLE harmful_causes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    UNIQUE(name)
);

-- Πίνακας σύνδεσης Καλλιεργειών ↔ Ζημιογόνων (πολλά-προς-πολλά)
CREATE TABLE cultivation_harmful (
    cultivation_id INT,
    harmful_id INT,
    PRIMARY KEY (cultivation_id, harmful_id),
    FOREIGN KEY (cultivation_id) REFERENCES cultivations(id),
    FOREIGN KEY (harmful_id) REFERENCES harmful_causes(id)
);

-- Πίνακας σύνδεσης Ποικιλιών ↔ Ζημιογόνων (πολλά-προς-πολλά)
CREATE TABLE variety_harmful (
    variety_id INT,
    harmful_id INT,
    PRIMARY KEY (variety_id, harmful_id),
    FOREIGN KEY (variety_id) REFERENCES varieties(id),
    FOREIGN KEY (harmful_id) REFERENCES harmful_causes(id)
);

--------------------------------------------------------
-- ΕΝΔΕΙΚΤΙΚΑ TEST ΔΕΔΟΜΕΝΑ
--------------------------------------------------------

-- Departments
INSERT INTO departments (name, code) VALUES
('Τμήμα Αμπελουργίας', 'DEP01'),
('Τμήμα Δενδροκομίας', 'DEP02');

-- Land Parcels
INSERT INTO land_parcels (department_id, region, community, block, parcel_number, description, ownership, status)
VALUES
(1, 'Λεμεσός', 'Κοιλάνι', 'Β1', '123', 'Αμπέλι δίπλα στο ποτάμι', 'ownership', 'pending'),
(2, 'Πάφος', 'Γεροσκήπου', 'Γ3', '456', 'Ελαιώνας με 50 δέντρα', 'management', 'inactive');

-- Cultivation Groups
INSERT INTO cultivation_groups (name, code, accounting_code, koap_code) VALUES
('Δημητριακά', 'GR01', '16-1', 'KOAP001'),
('Δενδρώδεις Καλλιέργειες', 'GR02', '16-2', 'KOAP002');

-- Cultivations
INSERT INTO cultivations (group_id, name, code, season_start, season_end, type, coverage, full_price, basic_price, active_from, active_to)
VALUES
(1, 'Σιτάρι', 'CULT01', '2025-10-01', '2026-06-30', 'annual', 'full', 120.00, 80.00, '2025-09-01', '2026-07-01'),
(2, 'Ελιά', 'CULT02', '2025-01-01', '2025-12-31', 'perennial', 'basic', 200.00, 150.00, '2025-01-01', '2030-12-31');

-- Varieties
INSERT INTO varieties (cultivation_id, name, unit) VALUES
(1, 'Μαυραγάνι', 'area'),
(2, 'Κορωνέικη', 'trees');

-- Harmful Causes
INSERT INTO harmful_causes (name) VALUES
('Χαλάζι'),
('Πυρκαγιά'),
('Ξηρασία');

-- Relations Cultivation ↔ Harmful
INSERT INTO cultivation_harmful (cultivation_id, harmful_id) VALUES
(1, 1), -- Σιτάρι ↔ Χαλάζι
(2, 3); -- Ελιά ↔ Ξηρασία

-- Relations Variety ↔ Harmful
INSERT INTO variety_harmful (variety_id, harmful_id) VALUES
(2, 2); -- Κορωνέικη ↔ Πυρκαγιά
