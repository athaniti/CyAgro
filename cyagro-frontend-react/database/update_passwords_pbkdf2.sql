-- ===================================================================
-- UPDATE PASSWORDS TO PBKDF2_SHA256 FORMAT
-- Password για όλους τους users: "secret"
-- ===================================================================

USE cyagro;

-- Update όλων των users με το νέο pbkdf2_sha256 hash
UPDATE users SET password_hash = '$pbkdf2-sha256$29000$zBnDuHfOuffeG8MY45xTKg$h4ULMMPWf5ejqkXoru1t5ia6pytJZYg7pX1Br3JfaEI' WHERE username = 'petros.iakovou';
UPDATE users SET password_hash = '$pbkdf2-sha256$29000$zBnDuHfOuffeG8MY45xTKg$h4ULMMPWf5ejqkXoru1t5ia6pytJZYg7pX1Br3JfaEI' WHERE username = 'maria.georgiou';
UPDATE users SET password_hash = '$pbkdf2-sha256$29000$zBnDuHfOuffeG8MY45xTKg$h4ULMMPWf5ejqkXoru1t5ia6pytJZYg7pX1Br3JfaEI' WHERE username = 'andreas.papadopoulos';
UPDATE users SET password_hash = '$pbkdf2-sha256$29000$zBnDuHfOuffeG8MY45xTKg$h4ULMMPWf5ejqkXoru1t5ia6pytJZYg7pX1Br3JfaEI' WHERE username = 'eleni.konstantinou';
UPDATE users SET password_hash = '$pbkdf2-sha256$29000$zBnDuHfOuffeG8MY45xTKg$h4ULMMPWf5ejqkXoru1t5ia6pytJZYg7pX1Br3JfaEI' WHERE username = 'inspector1';
UPDATE users SET password_hash = '$pbkdf2-sha256$29000$zBnDuHfOuffeG8MY45xTKg$h4ULMMPWf5ejqkXoru1t5ia6pytJZYg7pX1Br3JfaEI' WHERE username = 'admin1';

-- Επιπλέον users αν υπάρχουν
UPDATE users SET password_hash = '$pbkdf2-sha256$29000$zBnDuHfOuffeG8MY45xTKg$h4ULMMPWf5ejqkXoru1t5ia6pytJZYg7pX1Br3JfaEI' WHERE username = 'admin';

-- Ελέγχουμε τα αποτελέσματα
SELECT username, LEFT(password_hash, 20) as hash_preview FROM users;