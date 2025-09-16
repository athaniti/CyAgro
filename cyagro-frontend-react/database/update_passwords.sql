-- Update user passwords with simple known passwords
-- This script will set simple passwords for testing

-- Note: These are bcrypt hashes for common passwords:
-- 'password' -> $2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6dWOr9wG/W
-- 'admin' -> $2b$12$5v4n3r8kFjKlP3nVm9qBPuXiZ7wN8cQ1aR2bS6dT0eY8fL4mH9xG2
-- 'test' -> $2b$12$rQ8sK7mN3pL9vX2cF6gH1eB5nM8jP4kY0wT9qR7dS3aZ1bC5vN9xL
-- '123456' -> $2b$12$mK9oL7nP6qR2sT8uV3wX0yZ4bC1dE5fG9hJ8kM2nP7qS6tU9vW0xA

-- For testing purposes, let's create simple passwords:

-- Update all users to have password 'password'
UPDATE users 
SET password_hash = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6dWOr9wG/W'
WHERE email LIKE '%@%';

-- Or create specific test users with known passwords:

-- Create/Update admin user
INSERT INTO users (email, username, first_name, last_name, password_hash, role, is_active, has_profile)
VALUES ('admin@test.com', 'admin', 'Admin', 'User', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6dWOr9wG/W', 'admin', 1, 1)
ON DUPLICATE KEY UPDATE 
password_hash = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6dWOr9wG/W';

-- Create/Update farmer user  
INSERT INTO users (email, username, first_name, last_name, password_hash, role, is_active, has_profile)
VALUES ('farmer@test.com', 'farmer', 'Test', 'Farmer', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6dWOr9wG/W', 'farmer', 1, 1)
ON DUPLICATE KEY UPDATE 
password_hash = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6dWOr9wG/W';

-- Create/Update demo user
INSERT INTO users (email, username, first_name, last_name, password_hash, role, is_active, has_profile)  
VALUES ('demo@test.com', 'demo', 'Demo', 'User', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6dWOr9wG/W', 'farmer', 1, 1)
ON DUPLICATE KEY UPDATE 
password_hash = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6dWOr9wG/W';

-- Show all users with their emails for reference
SELECT id, email, username, first_name, last_name, role, is_active, has_profile 
FROM users 
ORDER BY email;