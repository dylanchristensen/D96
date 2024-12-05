const express = require('express');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../config'); // Import the secret key

const router = express.Router();

const HARD_CODED_USER = {
    username: 'dylan',
    password: 'dylan'
};

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === HARD_CODED_USER.username && password === HARD_CODED_USER.password) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }

    return res.status(401).json({ message: 'Invalid username or password' });
});

module.exports = router;
