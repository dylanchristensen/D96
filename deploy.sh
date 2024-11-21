#!/bin/bash

echo "Starting deployment process..."

# Step 1: Navigate to the project root
cd ~/D96 || exit

# Step 2: Pull the latest changes from the GitHub repository
echo "Pulling latest changes from GitHub..."
git pull origin main

# Step 3: Build the frontend
echo "Building the frontend..."
cd frontend || exit
npm install
npm run build

# Step 4: Restart NGINX
echo "Restarting NGINX..."
sudo systemctl restart nginx

# Step 5: Restart the backend with PM2
echo "Restarting backend with PM2..."
cd ../backend || exit
npm install
pm2 restart backend || pm2 start server.js --name backend

echo "Deployment complete!"
