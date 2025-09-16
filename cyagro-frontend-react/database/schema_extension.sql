-- ===================================================================
-- CyAgro Database Schema Extension
-- Επέκταση υπάρχουσας βάσης δεδομένων με τους πίνακες για Τεμάχια και Αγροτεμάχια
-- ===================================================================

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
    name VARCHAR(100) NOT NULL COMMENT 'Όνομα περιφέρειας',
    code VARCHAR(10) UNIQUE NOT NULL COMMENT 'Κωδικός περιφέρειας',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Πίνακας Επαρχιών (Provinces)
CREATE TABLE IF NOT EXISTS provinces (
    id INT PRIMARY KEY AUTO_INCREMENT,
    region_id INT NOT NULL,
    name VARCHAR(100) NOT NULL COMMENT 'Όνομα επαρχίας',
    code VARCHAR(10) UNIQUE NOT NULL COMMENT 'Κωδικός επαρχίας',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (region_id) REFERENCES regions(id) ON DELETE CASCADE
);

-- Πίνακας Κοινοτήτων (Communities)
CREATE TABLE IF NOT EXISTS communities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    province_id INT NOT NULL,
    name VARCHAR(100) NOT NULL COMMENT 'Όνομα κοινότητας',
    code VARCHAR(10) UNIQUE NOT NULL COMMENT 'Κωδικός κοινότητας',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (province_id) REFERENCES provinces(id) ON DELETE CASCADE
);

-- Πίνακας Τεμαχίων (Plots)
CREATE TABLE IF NOT EXISTS plots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    community_id INT NOT NULL,
    plot_number VARCHAR(50) NOT NULL,
    area_in_sqm FLOAT NOT NULL COMMENT 'Έκταση σε τετραγωνικά μέτρα',
    location_description TEXT,
    coordinates_lat FLOAT NULL,
    coordinates_lng FLOAT NULL,
    soil_type VARCHAR(100),
    irrigation_type ENUM('drip', 'sprinkler', 'flood', 'none') DEFAULT 'none',
    ownership_type ENUM('owned', 'rented', 'managed') DEFAULT 'owned',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (community_id) REFERENCES communities(id),
    INDEX idx_owner (owner_id),
    INDEX idx_community (community_id)
);

-- Πίνακας Αγροτεμαχίων (Agricultural Plots)
CREATE TABLE IF NOT EXISTS agricultural_plots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL COMMENT 'Όνομα αγροτεμαχίου',
    description TEXT,
    total_area DECIMAL(10,2) NOT NULL COMMENT 'Συνολική έκταση',
    creation_date DATE NOT NULL,
    status ENUM('active', 'inactive', 'under_review') DEFAULT 'under_review',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Πίνακας σύνδεσης Τεμαχίων με Αγροτεμάχια
CREATE TABLE IF NOT EXISTS agricultural_plot_land_plots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    agricultural_plot_id INT NOT NULL,
    land_plot_id INT NOT NULL,
    area_used DECIMAL(10,2) NOT NULL COMMENT 'Έκταση που χρησιμοποιείται από το τεμάχιο',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agricultural_plot_id) REFERENCES agricultural_plots(id) ON DELETE CASCADE,
    FOREIGN KEY (land_plot_id) REFERENCES land_plots(id) ON DELETE CASCADE,
    UNIQUE KEY unique_plot_assignment (agricultural_plot_id, land_plot_id)
);

-- Πίνακας Δηλώσεων Καλλιέργειας (Cultivation Declarations)
CREATE TABLE IF NOT EXISTS cultivation_declarations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    land_plot_id INT NOT NULL,
    cultivation_group_id INT,
    cultivation_id INT,
    variety_id INT,
    cultivation_type ENUM('seasonal', 'permanent') NOT NULL,
    planting_date DATE NOT NULL,
    cultivated_area DECIMAL(10,2) NOT NULL,
    number_of_trees INT NULL COMMENT 'Αριθμός δέντρων για μόνιμες καλλιέργειες',
    irrigation_method ENUM('drip', 'sprinkler', 'furrow', 'none') NOT NULL,
    organic_certified BOOLEAN DEFAULT FALSE,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_late_submission BOOLEAN DEFAULT FALSE,
    status ENUM('draft', 'submitted', 'approved', 'rejected') DEFAULT 'draft',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (land_plot_id) REFERENCES land_plots(id) ON DELETE CASCADE,
    FOREIGN KEY (cultivation_group_id) REFERENCES cultivation_groups(id),
    FOREIGN KEY (cultivation_id) REFERENCES cultivations(id),
    FOREIGN KEY (variety_id) REFERENCES varieties(id)
);

-- Πίνακας Δηλώσεων Ζημιάς (Damage Declarations)
CREATE TABLE IF NOT EXISTS damage_declarations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    land_plot_id INT NOT NULL,
    cultivation_declaration_id INT,
    harmful_cause_id INT,
    damage_date DATE NOT NULL,
    damage_description TEXT NOT NULL,
    estimated_damage_percentage DECIMAL(5,2) NOT NULL COMMENT 'Ποσοστό ζημιάς 0-100%',
    estimated_financial_loss DECIMAL(10,2) COMMENT 'Εκτιμώμενη οικονομική ζημιά',
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_within_deadline BOOLEAN DEFAULT TRUE,
    status ENUM('draft', 'submitted', 'under_review', 'approved', 'rejected', 'compensated') DEFAULT 'draft',
    inspector_notes TEXT,
    compensation_amount DECIMAL(10,2) NULL,
    compensation_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (land_plot_id) REFERENCES land_plots(id) ON DELETE CASCADE,
    FOREIGN KEY (cultivation_declaration_id) REFERENCES cultivation_declarations(id),
    FOREIGN KEY (harmful_cause_id) REFERENCES harmful_causes(id)
);

-- Πίνακας Εγγράφων (Documents)
CREATE TABLE IF NOT EXISTS documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    related_table ENUM('land_plots', 'agricultural_plots', 'cultivation_declarations', 'damage_declarations') NOT NULL,
    related_id INT NOT NULL COMMENT 'ID του σχετικού εγγραφήματος',
    document_type VARCHAR(100) NOT NULL COMMENT 'Τύπος εγγράφου',
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'deleted') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Πίνακας Ιστορικού Αιτήσεων (Application History)
CREATE TABLE IF NOT EXISTS application_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    application_type ENUM('land_plot', 'agricultural_plot', 'cultivation_declaration', 'damage_declaration') NOT NULL,
    application_id INT NOT NULL,
    status_from VARCHAR(50),
    status_to VARCHAR(50) NOT NULL,
    changed_by_user_id INT NULL COMMENT 'Χρήστης που έκανε την αλλαγή (για admin)',
    change_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (changed_by_user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes για βελτιστοποίηση
CREATE INDEX idx_land_plots_user ON land_plots(user_id);
CREATE INDEX idx_land_plots_community ON land_plots(community_id);
CREATE INDEX idx_land_plots_coordinates ON land_plots(coordinates_lat, coordinates_lng);
CREATE INDEX idx_cultivation_declarations_user ON cultivation_declarations(user_id);
CREATE INDEX idx_cultivation_declarations_plot ON cultivation_declarations(land_plot_id);
CREATE INDEX idx_cultivation_declarations_date ON cultivation_declarations(planting_date);
CREATE INDEX idx_damage_declarations_user ON damage_declarations(user_id);
CREATE INDEX idx_damage_declarations_date ON damage_declarations(damage_date);
CREATE INDEX idx_documents_related ON documents(related_table, related_id);
CREATE INDEX idx_application_history_user ON application_history(user_id);