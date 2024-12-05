const router = require('express').Router();

const authenticate = require('../middleware/authMiddleware');

// Protected dashboard route
router.get('/', authenticate, (req, res) => {
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
