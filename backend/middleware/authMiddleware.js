const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
}

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Access denied: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY); // Verify the token
        req.user = decoded; // Attach user info to request object
        next(); // Proceed
    } catch (err) {
        const errorMessage = err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
        res.status(403).json({ message: errorMessage });
    }
};

module.exports = authenticate;
