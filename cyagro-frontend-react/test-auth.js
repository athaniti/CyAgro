// Test script to check FastAPI users and authentication
console.log('Testing FastAPI Authentication...');

const API_BASE_URL = 'http://localhost:8000';
const API_KEY = 'AIzaSyClzfrOzB818x55FASHvX4JuGQciR9lv7a';

// Common test credentials to try
const testCredentials = [
    { username: 'admin', password: 'admin' },
    { username: 'test', password: 'test' },
    { username: 'user', password: 'password' },
    { username: 'demo', password: 'demo' },
    { username: 'farmer', password: 'farmer' },
    { username: 'farmer1', password: 'password123' },
    { username: 'testuser', password: 'testpass' }
];

async function testLogin(username, password) {
    try {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'X-API-Key': API_KEY,
            },
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            console.log(`✅ SUCCESS: ${username}/${password}`, data);
            return true;
        } else {
            console.log(`❌ FAILED: ${username}/${password} - Status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.log(`❌ ERROR: ${username}/${password} - ${error.message}`);
        return false;
    }
}

async function testAllCredentials() {
    console.log('Testing common credentials...\n');
    
    for (const cred of testCredentials) {
        await testLogin(cred.username, cred.password);
        await new Promise(resolve => setTimeout(resolve, 500)); // Small delay
    }
    
    console.log('\nTesting complete!');
}

// Test basic connection first
async function testConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/`, {
            headers: { 'X-API-Key': API_KEY }
        });
        
        if (response.ok) {
            console.log('✅ API Connection successful');
            return true;
        } else {
            console.log('❌ API Connection failed:', response.status);
            return false;
        }
    } catch (error) {
        console.log('❌ API Connection error:', error.message);
        return false;
    }
}

// Run tests
async function runTests() {
    const connected = await testConnection();
    if (connected) {
        await testAllCredentials();
    }
}

// Export for use in browser console
if (typeof module !== 'undefined') {
    module.exports = { testLogin, testAllCredentials, runTests };
} else {
    // Browser environment
    window.testFastAPI = { testLogin, testAllCredentials, runTests };
}