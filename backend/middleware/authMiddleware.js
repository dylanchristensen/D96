const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config'); // Import the secret key

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        return next();
    } catch (err) {
        const errorMessage = err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
        return res.status(403).json({ message: errorMessage });
    }
};

module.exports = authenticate;
