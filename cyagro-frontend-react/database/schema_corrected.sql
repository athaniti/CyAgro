-- ===================================================================
-- CYAGRO DATABASE SCHEMA - CORRECTED VERSION
-- Συμβατό με FastAPI Models
-- ===================================================================

USE cyagro;

-- ================= CORE TABLES =================

-- Πίνακας Χρηστών (Users)
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    id_number VARCHAR(20) UNIQUE,
    address TEXT,
    city VARCHAR(100),
    postal_code VARCHAR(10),
    is_active BOOLEAN DEFAULT TRUE,
    has_profile BOOLEAN DEFAULT FALSE,
    role ENUM('farmer', 'inspector', 'admin') DEFAULT 'farmer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_role (role)
);

-- Πίνακας Περιφερειών (Regions)
CREATE TABLE IF NOT EXISTS regions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Πίνακας Επαρχιών (Provinces)
CREATE TABLE IF NOT EXISTS provinces (
    id INT PRIMARY KEY AUTO_INCREMENT,
    region_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (region_id) REFERENCES regions(id) ON DELETE CASCADE,
    INDEX idx_region (region_id)
);

-- Πίνακας Κοινοτήτων (Communities)
CREATE TABLE IF NOT EXISTS communities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    province_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (province_id) REFERENCES provinces(id) ON DELETE CASCADE,
    INDEX idx_province (province_id)
);

-- Πίνακας Τεμαχίων (Plots)
CREATE TABLE IF NOT EXISTS plots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    community_id INT NOT NULL,
    plot_number VARCHAR(50) NOT NULL,
    area_in_sqm FLOAT NOT NULL,
    location_description TEXT,
    coordinates_lat FLOAT NULL,
    coordinates_lng FLOAT NULL,
    soil_type VARCHAR(100),
    irrigation_type ENUM('drip', 'sprinkler', 'flood', 'none') DEFAULT 'none',
    ownership_type ENUM('owned', 'rented', 'managed') DEFAULT 'owned',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (community_id) REFERENCES communities(id) ON DELETE RESTRICT,
    INDEX idx_owner (owner_id),
    INDEX idx_community (community_id)
);

-- Πίνακας Αγροτεμαχίων (Agricultural Plots)
CREATE TABLE IF NOT EXISTS agricultural_plots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    plot_id INT NOT NULL,
    cultivation_id INT NOT NULL,
    variety_id INT NULL,
    area_in_sqm FLOAT NOT NULL,
    planting_date DATE,
    expected_harvest_date DATE,
    irrigation_system VARCHAR(100),
    notes TEXT,
    status ENUM('planned', 'planted', 'growing', 'harvested', 'abandoned') DEFAULT 'planned',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (plot_id) REFERENCES plots(id) ON DELETE CASCADE,
    FOREIGN KEY (cultivation_id) REFERENCES cultivations(id) ON DELETE RESTRICT,
    FOREIGN KEY (variety_id) REFERENCES varieties(id) ON DELETE SET NULL,
    INDEX idx_plot (plot_id),
    INDEX idx_cultivation (cultivation_id)
);

-- Πίνακας Δηλώσεων Καλλιέργειας (Cultivation Declarations)
CREATE TABLE IF NOT EXISTS cultivation_declarations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    agricultural_plot_id INT NOT NULL,
    cultivation_year INT NOT NULL,
    declared_area FLOAT NOT NULL,
    coverage_type ENUM('full', 'basic') DEFAULT 'full',
    estimated_production FLOAT,
    cultivation_practices TEXT,
    status ENUM('draft', 'submitted', 'under_review', 'approved', 'rejected') DEFAULT 'draft',
    submission_date TIMESTAMP NULL,
    review_date TIMESTAMP NULL,
    reviewer_notes TEXT,
    fee_amount DECIMAL(10, 2),
    payment_status ENUM('pending', 'paid', 'overdue') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (agricultural_plot_id) REFERENCES agricultural_plots(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_agricultural_plot (agricultural_plot_id),
    INDEX idx_status (status),
    INDEX idx_year (cultivation_year)
);

-- Πίνακας Δηλώσεων Ζημιάς (Damage Declarations)
CREATE TABLE IF NOT EXISTS damage_declarations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    agricultural_plot_id INT NOT NULL,
    harmful_cause_id INT NOT NULL,
    damage_date DATE NOT NULL,
    reported_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    affected_area FLOAT NOT NULL,
    damage_percentage FLOAT,
    estimated_loss DECIMAL(10, 2),
    description TEXT NOT NULL,
    inspector_id INT NULL,
    inspection_date TIMESTAMP NULL,
    inspector_notes TEXT,
    verified_damage_percentage FLOAT,
    verified_loss DECIMAL(10, 2),
    status ENUM('reported', 'assigned', 'inspected', 'approved', 'rejected') DEFAULT 'reported',
    compensation_amount DECIMAL(10, 2),
    payment_date TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (agricultural_plot_id) REFERENCES agricultural_plots(id) ON DELETE CASCADE,
    FOREIGN KEY (harmful_cause_id) REFERENCES harmful_causes(id) ON DELETE RESTRICT,
    FOREIGN KEY (inspector_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_agricultural_plot (agricultural_plot_id),
    INDEX idx_status (status),
    INDEX idx_damage_date (damage_date)
);

-- Πίνακας Εγγράφων (Documents)
CREATE TABLE IF NOT EXISTS documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cultivation_declaration_id INT NULL,
    damage_declaration_id INT NULL,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT,
    mime_type VARCHAR(100),
    document_type ENUM('photo', 'certificate', 'contract', 'other') DEFAULT 'other',
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (cultivation_declaration_id) REFERENCES cultivation_declarations(id) ON DELETE CASCADE,
    FOREIGN KEY (damage_declaration_id) REFERENCES damage_declarations(id) ON DELETE CASCADE,
    INDEX idx_cultivation_declaration (cultivation_declaration_id),
    INDEX idx_damage_declaration (damage_declaration_id),
    
    CONSTRAINT chk_document_relation CHECK (
        (cultivation_declaration_id IS NOT NULL AND damage_declaration_id IS NULL) OR
        (cultivation_declaration_id IS NULL AND damage_declaration_id IS NOT NULL)
    )
);

-- ================= INDEXES FOR PERFORMANCE =================
CREATE INDEX idx_users_active ON users(is_active);
CREATE INDEX idx_plots_coordinates ON plots(coordinates_lat, coordinates_lng);
CREATE INDEX idx_cultivation_declarations_payment ON cultivation_declarations(payment_status);
CREATE INDEX idx_damage_declarations_inspector ON damage_declarations(inspector_id);

-- ================= SUCCESS MESSAGE =================
SELECT '✅ Schema created successfully! All tables are compatible with FastAPI models.' as Status;