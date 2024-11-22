const router = require('express').Router();
const authenticate = require('../middleware/authMiddleware');

// Protected dashboard route
router.get('/', authenticate, (req, res) => {
    res.json({
        summary : `
        UNC Charlotte is making waves this month with new initiatives to promote sustainability and community engagement.
        A recent program focuses on reducing campus waste by 30% through improved recycling and composting systems.
        This aligns with UNC Charlotte's goal to achieve carbon neutrality by 2040. 
        Students and staff are encouraged to participate in various workshops aimed at environmental awareness.
    `,
        referenceUrl: "https://inside.charlotte.edu/2024/10/07/sga-leads-student-sustainability-on-campus",
        techStack: "Backend: Node.js, Frontend: React, Database: MongoDB"
    });
});

module.exports = router;
