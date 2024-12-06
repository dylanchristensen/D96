const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'good job ricky';

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied: No or invalid token format provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Authentication error:', err.message);
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
