const express = require('express');
const router = express.Router();

// Route: /chartData/summary
router.get('/summary', (req, res) => {
    const chartData = [
        { category: 'Recycling', value: 30 },
        { category: 'Composting', value: 20 },
        { category: 'Landfill', value: 50 },
    ];
    res.json(chartData);
});

// Route: /chartData/reports
router.get('/reports', (req, res) => {
    const chartData = [
        { year: 2022, value: 40 },
        { year: 2023, value: 60 },
    ];
    res.json(chartData);
});

module.exports = router;

