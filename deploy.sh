#!/bin/bash

# Strict mode for better error handling
set -euo pipefail

echo "$(date +"%Y-%m-%d %H:%M:%S") - Starting deployment process..."

# Function to navigate to a directory
navigate_to() {
  local dir="$1"
  if ! cd "$dir"; then
    echo "$(date +"%Y-%m-%d %H:%M:%S") - Failed to navigate to $dir. Exiting..."
    exit 1
  fi
}

# Function to execute a command and handle errors
run_command() {
  local cmd="$*"
  if ! $cmd; then
    echo "$(date +"%Y-%m-%d %H:%M:%S") - Command failed: $cmd. Exiting..."
    exit 1
  fi
}

# Step 1: Navigate to the project root dynamically
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
navigate_to "$SCRIPT_DIR"

# Step 2: Pull the latest changes from the GitHub repository
echo "$(date +"%Y-%m-%d %H:%M:%S") - Pulling latest changes from GitHub..."
run_command git pull origin main

# Step 3: Build the frontend
echo "$(date +"%Y-%m-%d %H:%M:%S") - Building the frontend..."
navigate_to "$SCRIPT_DIR/frontend"
run_command npm install
run_command npm run build

# Step 4: Restart NGINX
echo "$(date +"%Y-%m-%d %H:%M:%S") - Checking and restarting NGINX..."
if ! sudo systemctl is-active --quiet nginx; then
  echo "$(date +"%Y-%m-%d %H:%M:%S") - NGINX is not active. Attempting to start..."
  run_command sudo systemctl start nginx
else
  run_command sudo systemctl restart nginx
fi

# Step 5: Restart the backend with PM2
echo "$(date +"%Y-%m-%d %H:%M:%S") - Restarting backend with PM2..."
navigate_to "$SCRIPT_DIR/backend"
run_command npm install

if pm2 list | grep -q "backend"; then
  run_command pm2 restart backend
else
  echo "$(date +"%Y-%m-%d %H:%M:%S") - Backend process not found. Starting with PM2..."
  run_command pm2 start server.js --name backend
fi

echo "$(date +"%Y-%m-%d %H:%M:%S") - Deployment complete!"
