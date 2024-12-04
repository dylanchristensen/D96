const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware'); // Middleware for authentication

// Chart data for UNC Charlotte sustainability initiatives
const summaryChartData = {
    labels: ['Recycling', 'Composting', 'Waste Reduction'],
    datasets: [
        {
            label: 'Waste Management Improvements (%)',
            data: [45, 30, 25],
            backgroundColor: ['#4caf50', '#8bc34a', '#cddc39'],
        },
    ],
};

const reportsChartData = {
    labels: ['Workshops', 'Events', 'Surveys'],
    datasets: [
        {
            label: 'Participation Levels',
            data: [200, 150, 300],
            backgroundColor: ['#2196f3', '#03a9f4', '#00bcd4'],
        },
    ],
};

// Base endpoint for /chartData (no authentication required)
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Chart data route is working' });
});

// Protected endpoint for summary chart data
router.get('/summary', authenticate, (req, res) => {
    try {
        res.status(200).json({
            chartType: 'bar',
            data: summaryChartData,
            description: 'Percentage breakdown of UNC Charlotte’s recent waste management improvements.',
        });
    } catch (error) {
        console.error('Error in /chartData/summary:', { error: error.message, route: req.path });
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Protected endpoint for reports chart data
router.get('/reports', authenticate, (req, res) => {
    try {
        res.status(200).json({
            chartType: 'line',
            data: reportsChartData,
            description: 'Participation levels in workshops, events, and surveys at UNC Charlotte.',
        });
    } catch (error) {
        console.error('Error in /chartData/reports:', { error: error.message, route: req.path });
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
