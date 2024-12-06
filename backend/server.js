require('dotenv').config(); // Load .env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes'); // New consolidated routes

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/defaultdb';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', routes); // Consolidated routes

// Catch-all for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// MongoDB connection
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit if unable to connect
    });

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global Error:', err.message);
    if (!res.headersSent) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
    next(err); // Pass error to the default Express handler
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
