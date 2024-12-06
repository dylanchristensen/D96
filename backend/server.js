require('dotenv').config(); // Load .env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/defaultdb';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running. Use /auth, /chartData, or /dashboard' });
});

// Routes
const routes = require('./routes/routes');
app.use('/', routes);

// MongoDB connection
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error(`MongoDB connection error: ${err.message}`);
        throw new Error("Server encountered a critical error and will shut down.");
    });

// Global error handler
app.use((err, req, res, next) => {
    console.error(`Global Error: ${err.message}`);
    if (!res.headersSent) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
    next(); // Pass error to the default Express handler
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
