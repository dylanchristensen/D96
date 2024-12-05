/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'good job ricky'; // Fallback if config file is unavailable

const authenticate = (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access denied: No or invalid token format provided' });
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach decoded token to request object
        next();
    } catch (err) {
        console.error('Authentication error:', err.message);
        const errorMessage = err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
        return res.status(403).json({ message: errorMessage });
    }
};

module.exports = authenticate;
