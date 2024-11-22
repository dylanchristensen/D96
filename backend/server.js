require('dotenv').config(); // Load .env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const chartDataRoutes = require('./routes/chartData');
const dashboardRoutes = require('./routes/dashboard'); 

// Environment variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/defaultdb';
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/chartData', chartDataRoutes);
app.use('/dashboard', dashboardRoutes);

// MongoDB connection
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
