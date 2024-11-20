const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const chartDataRoutes = require('./routes/chartData');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://dylan:dylan@localhost:27017/d96db?authSource=admin';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/chartData', chartDataRoutes);

// MongoDB connection
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

