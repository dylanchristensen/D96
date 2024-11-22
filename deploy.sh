#!/bin/bash

echo "Starting deployment process..."

# Step 1: Navigate to the project root
cd ~/D96 || { echo "Failed to navigate to ~/D96"; exit 1; }

# Step 2: Pull the latest changes from the GitHub repository
echo "Pulling latest changes from GitHub..."
if ! git pull origin main; then
  echo "Git pull failed. Exiting..."
  exit 1
fi

# Step 3: Build the frontend
echo "Building the frontend..."
cd frontend || { echo "Failed to navigate to frontend"; exit 1; }
if ! npm install; then
  echo "Frontend npm install failed. Exiting..."
  exit 1
fi

if ! npm run build; then
  echo "Frontend build failed. Exiting..."
  exit 1
fi

# Step 4: Restart NGINX
echo "Restarting NGINX..."
if ! sudo systemctl restart nginx; then
  echo "Failed to restart NGINX. Exiting..."
  exit 1
fi

# Step 5: Restart the backend with PM2
echo "Restarting backend with PM2..."
cd ../backend || { echo "Failed to navigate to backend"; exit 1; }
if ! npm install; then
  echo "Backend npm install failed. Exiting..."
  exit 1
fi

if ! pm2 restart backend; then
  echo "PM2 restart failed. Attempting to start the backend..."
  if ! pm2 start server.js --name backend; then
    echo "Failed to start backend with PM2. Exiting..."
    exit 1
  fi
fi

echo "Deployment complete!"
