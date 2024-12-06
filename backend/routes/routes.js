const express = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authMiddleware'); // Middleware for authentication

const router = express.Router();

// Environment variables and hardcoded credentials
const SECRET_KEY = process.env.SECRET_KEY || 'good job ricky';
const USERNAME = 'dylan';
const PASSWORD = 'dylan';

// --- Authentication Routes --- //

// Test endpoint for /auth
router.get('/auth', (req, res) => {
    res.status(200).json({ message: 'Auth route is working' });
});

// Login route
router.post('/auth/login', (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Check hardcoded credentials
        if (username === USERNAME && password === PASSWORD) {
            // Generate a JWT
            const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({ token });
        }

        // Invalid credentials
        return res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
        console.error('Error in login route:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// --- Chart Data Routes --- //

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
router.get('/chartData', (req, res) => {
    res.status(200).json({ message: 'Chart data route is working' });
});

// Protected endpoint for summary chart data
router.get('/chartData/summary', authenticate, (req, res) => {
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
router.get('/chartData/reports', authenticate, (req, res) => {
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

// --- Dashboard Routes --- //

// Protected dashboard route
router.get('/dashboard', authenticate, (req, res) => {
    res.json({
        summary: `
        UNC Charlotte's Student Government Association (SGA) is leading the charge on campus sustainability under the leadership of President Isaiah Grayson and sustainability liaison Sonia Birla. 
        This fall, the SGA and the Office of Sustainability hosted the annual Student Sustainability Summit, focusing on empowering students to collaborate with representatives to implement lasting sustainability initiatives.

        During the Summit, topics included previous student-led successes, such as creating a green fund, advocating for climate action goals, and establishing a zero-waste stadium. Students brainstormed ways to enhance housing, academics, wellness, and climate action on campus.

        Current SGA efforts include promoting micromobility transportation options such as e-scooters and bikes, organizing a Halloween costume reuse event to foster creativity and reduce waste, and increasing sustainability awareness through signage. These initiatives aim to create a culture of sustainability and collaboration among students.
        `,
        referenceUrl: "https://inside.charlotte.edu/2024/10/07/sga-leads-student-sustainability-on-campus",
        techStack: `
        **Technical Overview:**
        - **Backend:** Built using Node.js and Express.js to create RESTful APIs that serve data to the frontend. 
        - **Frontend:** Developed with React.js for building an interactive and responsive user interface.
        - **Database:** MongoDB is used as the primary data storage solution for dynamic and structured data.
        - **Authentication:** Implemented using JWT (JSON Web Tokens) to secure endpoints and provide session-based access control.
        - **Deployment:** 
            - The application is hosted on a DigitalOcean droplet. 
            - NGINX is configured to serve the React frontend and proxy requests to the Node.js backend.
            - PM2 is utilized for process management and to ensure high availability of backend services.
        - **Additional Tools:**
            - PostCSS is integrated for processing CSS files with autoprefixer.
            - Chart.js is used in the frontend for data visualization in reports and summaries.
        `,
        techStackSummary: "Backend: Node.js, Frontend: React, Database: MongoDB, Deployment: DigitalOcean with NGINX and PM2"
    });
});

module.exports = router;
