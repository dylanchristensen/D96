const jwt = require('jsonwebtoken');

// Load the secret from the environment variables
const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
}

const authenticate = (req, res, next) => {
    try {
        // Extract token from "Authorization: Bearer <token>" header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Access denied: No token provided' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access denied: Invalid token format' });
        }

        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach user info to request object for use in routes
        next(); // Proceed to the next middleware/route
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token expired' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token' });
        } else {
            console.error('Authentication error:', err);
            return res.status(500).json({ message: 'Internal server error during authentication' });
        }
    }
};

module.exports = authenticate;
