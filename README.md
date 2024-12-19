# D96 Project - UNC Charlotte Sustainability Dashboard

## Overview
The D96 Project is a complete web application that provides insights into sustainability initiatives and transportation practices at UNC Charlotte. It features interactive visualizations of student participation in sustainability events and various transportation modes, emphasizing campus sustainability efforts.

The project is built using a modern full-stack architecture with **React.js** on the frontend and **Node.js** with **Express.js** on the backend. The app is deployed using **NGINX** on a DigitalOcean droplet for scalable and efficient hosting. This project is submitted as part of the final assignment requirements for a network-based app development class.

## Features
- **Authentication**: Secure login using JWT (JSON Web Tokens) to manage user sessions and provide protected access to different pages.
- **Dashboard**: Provides information about UNC Charlotte's sustainability efforts, along with a technical overview of the project.
- **Summary Chart**: Displays data on the growth in student participation in sustainability events from 2020 to 2024.
- **Reports Chart**: Shows the distribution of transportation modes among students in 2024, highlighting eco-friendly practices.
- **Protected Routes**: Certain routes are protected and require the user to be logged in, such as the dashboard and charts data.

## Technical Overview
- **Backend**:
  - Built using **Node.js** and **Express.js** to create RESTful APIs.
  - **JWT** (JSON Web Tokens) are used to secure endpoints and provide session-based access control.
- **Frontend**:
  - Developed with **React.js** for a responsive and interactive user experience.
  - **Chart.js** is used for rendering visual data in the summary and reports sections.
- **Database**: Uses **MongoDB** for storing user data and other structured data.
- **Deployment**:
  - The application is hosted on a **DigitalOcean droplet**.
  - **NGINX** is configured to serve the frontend and proxy requests to the backend.
  - **PM2** is utilized for process management, ensuring that backend services are reliable and highly available.
- **Additional Tools**:
  - **PostCSS** with **autoprefixer** for efficient CSS processing and cross-browser compatibility.
  - **ESLint** for maintaining code quality.

## Project Structure
- **Frontend**: Located in the `frontend` directory and built using **React.js**.
- **Backend**: Located in the `backend` directory, using **Express.js** to manage routes and middleware.
- **Authentication**: Implemented using **JWT**. Users log in with hardcoded credentials for simplicity during development (`username: dylan`, `password: dylan`).

## API Endpoints
### Authentication Routes
- **`GET /auth`**: Test endpoint to check if the authentication route is working.
- **`POST /auth/login`**: Endpoint for user login. Validates credentials and returns a JWT on successful authentication.

### Chart Data Routes
- **`GET /chartData`**: Base endpoint to verify the chart data route is accessible.
- **`GET /chartData/summary`**: Provides the data for a bar chart showing growth in student participation in sustainability events (requires authentication).
- **`GET /chartData/reports`**: Provides the data for a pie chart showing the distribution of transportation modes (requires authentication).

### Dashboard Route
- **`GET /dashboard`**: Returns an overview of the sustainability initiatives at UNC Charlotte, including the technical stack of the project (requires authentication).

## How to Access the Project
To access the project, simply navigate to http://64.225.11.18 in your web browser. The backend and frontend are hosted on the same server, and the application is accessible at all times.


**EDIT**: the semester is over (I got an A) so I no longer need to keep this live. As such, the application is not available at the listed IP any longer. 

## How to Run the Project Locally
### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (running locally or using a cloud service like MongoDB Atlas)
- **npm** (comes with Node.js)

### Setup Instructions
1. **Clone the repository**:
   ```sh
   git clone https://github.com/dylanchristensen/D96
   cd D96
   ```
2. **Install dependencies for backend**:
   ```sh
   cd backend
   npm install
   ```
3. **Install dependencies for frontend**:
   ```sh
   cd ../frontend
   npm install
   ```
4. **Create an environment file** in the backend directory (`.env`) and add the following:
   ```
   SECRET_KEY=your_secret_key
   ```
5. **Run the backend**:
   ```sh
   cd ../backend
   npm start
   ```
6. **Run the frontend**:
   ```sh
   cd ../frontend
   npm start
   ```
7. **Access the app**:
   Open your browser and navigate to `http://localhost:3000`.

## Deployment
The project is hosted on a **DigitalOcean** droplet and uses **NGINX** to serve the frontend and proxy requests to the backend.
- **PM2** is used to manage backend services for seamless restarts and availability.

## Security
- The project uses **JWT** for authenticating users and protecting sensitive routes.
- Ensure that the `SECRET_KEY` used for generating tokens is kept secret and not hardcoded in production environments.

## Future Improvements
- **Database Integration**: Replace hardcoded credentials with a user database for secure and scalable authentication.
- **Responsive Design**: Improve the responsiveness of charts and overall page layout for better usability on mobile devices.
- **Dynamic Data**: Connect with a live database to display real-time updates of sustainability efforts and metrics.

## Instructions for Evaluators
- **App Title**: D96
- **Student Name**: Dylan Christensen
- **Student ID**: 801267896
- **Summary Topic**: Latest sustainability news at UNC Charlotte from October 2024.
- **Credentials for Testing**: Use `username: dylan`, `password: dylan` to log in.
- **GitHub Repository**: [Link to GitHub Repo](https://github.com/your-username/d96-project)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- **UNC Charlotte** for providing insights into student sustainability initiatives.
- **React.js** and **Node.js** communities for their excellent documentation and resources.
- **DigitalOcean** for hosting services.

