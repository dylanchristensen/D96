const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

// Use environment variable for secret key
const SECRET_KEY = process.env.SECRET_KEY || 'good job ricky';

// Hardcoded credentials
const USERNAME = 'dylan';
const PASSWORD = 'dylan';

// Test endpoint for /auth
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Auth route is working' });
});

// Login route
router.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Check hardcoded credentials
        if (username === USERNAME && password === PASSWORD) {
            // Generate a JWT
            const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({ token });
        }

        // Invalid credentials
        return res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
        console.error('Error in login route:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
