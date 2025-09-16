// Password hash checker
// Hash to check: $2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6dWOr9wG/W

const bcrypt = require('bcrypt');

const targetHash = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6dWOr9wG/W';

// Common passwords to test
const commonPasswords = [
    'password',
    'admin',
    'test',
    'demo',
    '123456',
    'password123',
    'admin123',
    'test123',
    'demo123',
    'user',
    'user123',
    'secret',
    'qwerty',
    'abc123',
    'welcome',
    'login',
    'pass',
    'root',
    'toor',
    'guest',
    'farmer',
    'cultivation',
    'agro',
    'cyagro'
];

async function checkPassword(password, hash) {
    try {
        const match = await bcrypt.compare(password, hash);
        return match;
    } catch (error) {
        console.error('Error checking password:', error);
        return false;
    }
}

async function findPassword() {
    console.log('Checking common passwords against hash...\n');
    
    for (const password of commonPasswords) {
        const isMatch = await checkPassword(password, targetHash);
        if (isMatch) {
            console.log(`✅ FOUND! Password is: "${password}"`);
            return password;
        } else {
            console.log(`❌ Not: "${password}"`);
        }
    }
    
    console.log('\n❌ No match found in common passwords list');
    return null;
}

// Run if this is the main module
if (require.main === module) {
    findPassword();
}

module.exports = { checkPassword, findPassword };