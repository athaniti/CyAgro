-- Simple password update script
-- All test users will have password: 'password'

-- Update existing users to have password 'password'
UPDATE users 
SET password_hash = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6dWOr9wG/W';

-- Show updated users
SELECT email, username, first_name, last_name, role 
FROM users 
ORDER BY email;