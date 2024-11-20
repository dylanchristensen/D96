const jwt = require('jsonwebtoken');
const SECRET_KEY = 'good job ricky';

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Access denied: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Verify token
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware/route
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticate;

