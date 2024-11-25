const jwt = require('jsonwebtoken');

const router = require('express').Router();

// Replace with environment variable if needed
const SECRET_KEY = process.env.SECRET_KEY || 'good job ricky';

// Hardcoded credentials
const USERNAME = 'dylan';
const PASSWORD = 'dylan';

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check hardcoded credentials
    if (username === USERNAME && password === PASSWORD) {
        // Generate a JWT
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }

    // Invalid credentials
    return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
