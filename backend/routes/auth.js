const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router(); // <-- Define the router here

const SECRET_KEY = 'good job ricky';

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            username: { $regex: new RegExp(`^${username}$`, 'i') },
            password
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router; // <-- Export the router here

