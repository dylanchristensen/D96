
# D96 - UNC Charlotte News and Analytics

## Description
D96 is a web application that provides insights into UNC Charlotte's recent sustainability initiatives. The app features user authentication, a dashboard with a summary of UNC Charlotte news, and dynamic charts showcasing participation in sustainability events and modes of transportation.

---

## Features
- **User Authentication:** Secure login using JWT tokens.
- **Dashboard:** Displays a 200-word summary of UNC Charlotte's recent sustainability efforts.
- **Dynamic Charts:** Interactive visualizations for:
  - Participation in sustainability events over time.
  - Modes of transportation adopted by students.
- **Responsive Design:** Accessible and optimized for different devices.

---

## Tech Stack
- **Frontend:**
  - React.js with 'react-router-dom'
  - Chart.js for data visualization
  - Axios for API calls
- **Backend:**
  - Node.js with Express
  - MongoDB for data storage
  - JWT for authentication
- **Deployment:**
  - NGINX for serving the frontend and reverse proxying the backend
  - PM2 for managing the backend process

---

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running
- NGINX installed (for deployment)

---

### Local Development

#### 1. Clone the repository

git clone https://github.com/dylanchristensen/d96.git
cd d96


#### 2. Backend Setup

cd backend
npm install


Create a '.env' file in the 'backend' folder:
env
PORT=3000
MONGO_URI=mongodb://dylan:dylan@localhost:27017/d96db?authSource=admin
JWT_SECRET=your_jwt_secret


Run the backend server:

npm start


#### 3. Frontend Setup

cd ../frontend
npm install


Create a '.env' file in the 'frontend' folder:
env
REACT_APP_BACKEND_URL=http://localhost:3000


Run the frontend development server:

npm start


The app will be accessible at [http://localhost:3001](http://localhost:3001).

---

### Deployment

#### 1. Build the Frontend

cd frontend
npm run build


#### 2. Deploy with NGINX
Create an NGINX configuration file at '/etc/nginx/sites-available/d96':
nginx
server {
    listen 80;
    server_name 64.225.11.18;

    root /home/dylan/D96/frontend/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}


Enable the configuration and restart NGINX:

sudo ln -s /etc/nginx/sites-available/d96 /etc/nginx/sites-enabled/
sudo systemctl restart nginx


#### 3. Use PM2 for Backend
Install PM2 globally:

npm install -g pm2


Start the backend server with PM2:

pm2 start backend/server.js --name backend
pm2 save


---

## Example '.env' Files

### Backend '.env'
env
PORT=3000
MONGO_URI=mongodb://dylan:dylan@localhost:27017/d96db?authSource=admin
JWT_SECRET=good job ricky


### Frontend '.env'
env
REACT_APP_BACKEND_URL=http://64.225.11.18/api


---

## Deployment Script
You can use the included 'deploy.sh' script to automate deployment:

./deploy.sh


This script:
- Pulls the latest code from GitHub.
- Builds the frontend.
- Restarts NGINX.
- Restarts the backend using PM2.

---

## Testing the App
- Access the app via [http://64.225.11.18](http://64.225.11.18).
- Login credentials:
  - Username: 'dylan'
  - Password: 'dylan'
- Navigate through the dashboard, summary, and reports pages.

---

## Troubleshooting
- **500 Internal Server Error:**
  - Check the backend logs: 'pm2 logs backend'
  - Check NGINX logs: 'sudo tail -f /var/log/nginx/error.log'

- **Frontend Not Loading:**
  - Ensure the 'frontend/build' folder exists.
  - Restart NGINX after rebuilding the frontend.

---



