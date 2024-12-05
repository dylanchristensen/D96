require('dotenv').config(); // Load .env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const winston = require('winston'); // Logging library

// Set up Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({ filename: 'logs/app.log', level: 'info' }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
    ]
});

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/defaultdb';

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running. Use /auth, /chartData, or /dashboard' });
});

// Routes
try {
    const authRoutes = require('./routes/auth');
    const chartDataRoutes = require('./routes/chartData');
    const dashboardRoutes = require('./routes/dashboard');

    app.use('/auth', authRoutes);
    app.use('/chartData', chartDataRoutes);
    app.use('/dashboard', dashboardRoutes);
} catch (err) {
    logger.error(`Failed to load routes: ${err.message}`);
    throw new Error("Critical error loading routes. Ensure all routes are correctly defined.");
}

// 404 Catch-all for undefined routes
app.use((req, res) => {
    logger.warn(`404 - Route not found: ${req.originalUrl}`);
    res.status(404).json({ message: 'Route not found' });
});

// MongoDB connection
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('MongoDB connected successfully');
    })
    .catch((err) => {
        logger.error(`MongoDB connection error: ${err.message}`);
        process.exit(1); // Exit the process on critical error
    });

// Global error handler
app.use((err, req, res, next) => {
    logger.error(`Global Error: ${err.message}`);
    if (!res.headersSent) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});
