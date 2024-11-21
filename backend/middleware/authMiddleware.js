const jwt = require('jsonwebtoken');

// Load the secret from the environment variables
const SECRET_KEY = process.env.JWT_SECRET;

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
