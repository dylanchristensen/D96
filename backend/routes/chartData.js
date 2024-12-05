const express = require('express');

const router = express.Router();
const authenticate = require('../middleware/authMiddleware'); // Middleware for authentication

// New Chart Data for UNC Charlotte sustainability initiatives
const summaryChartData = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [
        {
            label: 'Participation in Sustainability Events',
            data: [150, 200, 250, 300, 350],
            backgroundColor: 'rgba(52, 152, 219, 0.5)',
            borderColor: 'rgba(52, 152, 219, 1)',
            borderWidth: 2,
            fill: false,
        },
    ],
};

const reportsChartData = {
    labels: ['Public Transit', 'Biking', 'Walking', 'Carpooling', 'Single-Occupancy Vehicles'],
    datasets: [
        {
            label: 'Transportation Modes',
            data: [40, 25, 20, 10, 5],
            backgroundColor: [
                '#3498db',
                '#2ecc71',
                '#f1c40f',
                '#e67e22',
                '#e74c3c',
            ],
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
            description: 'This chart represents the growth in student participation in sustainability events at UNC Charlotte from 2020 to 2024.',
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
            chartType: 'pie',
            data: reportsChartData,
            description: 'This chart highlights the distribution of transportation modes among students in 2024, emphasizing eco-friendly practices.',
        });
    } catch (error) {
        console.error('Error in /chartData/reports:', { error: error.message, route: req.path });
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
