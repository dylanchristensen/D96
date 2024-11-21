const express = require('express');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Dashboard route (protected)
router.get('/', authenticate, (req, res) => {
    const summary = `
        UNC Charlotte is making waves this month with new initiatives to promote sustainability and community engagement.
        A recent program focuses on reducing campus waste by 30% through improved recycling and composting systems.
        This aligns with UNC Charlotte's goal to achieve carbon neutrality by 2040. 
        Students and staff are encouraged to participate in various workshops aimed at environmental awareness.
    `;
    const referenceUrl = 'https://inside.charlotte.edu';

    res.json({
        summary,
        referenceUrl,
        techStack: 'Node.js, Express, MongoDB, React, JWT for Authentication',
    });
});

module.exports = router;

