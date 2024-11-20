const express = require('express');
const router = express.Router();

// Chart data based on UNC Charlotte sustainability initiatives
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

// Endpoint for summary chart data
router.get('/summary', (req, res) => {
    res.json({
        chartType: 'bar',
        data: summaryChartData,
        description: 'Percentage breakdown of UNC Charlotte’s recent waste management improvements.',
    });
});

// Endpoint for reports chart data
router.get('/reports', (req, res) => {
    res.json({
        chartType: 'line',
        data: reportsChartData,
        description: 'Participation levels in workshops, events, and surveys at UNC Charlotte.',
    });
});

module.exports = router;

