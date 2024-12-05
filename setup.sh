#!/bin/bash

echo "Starting project setup..."

# System Dependencies
declare -a tools=("sudo" "npm" "pm2" "nginx" "git")
for tool in "${tools[@]}"; do
    if ! command -v $tool &> /dev/null; then
        echo "$tool not found. Attempting to install..."
        if [[ "$tool" == "sudo" ]]; then
            echo "You are missing 'sudo'. Install it manually as root if necessary."
            continue
        fi
        if [[ -x "$(command -v apt)" ]]; then
            sudo apt update && sudo apt install -y $tool
        elif [[ -x "$(command -v yum)" ]]; then
            sudo yum install -y $tool
        else
            echo "Unknown package manager. Install $tool manually."
        fi
    else
        echo "$tool is already installed."
    fi
done

# Node.js and npm setup
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "Node.js version: $(node -v)"
    echo "NPM version: $(npm -v)"
fi

# PM2 setup
if ! command -v pm2 &> /dev/null; then
    echo "PM2 not found. Installing globally..."
    npm install -g pm2
else
    echo "PM2 is already installed."
fi

# Project Setup
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || { echo "Failed to navigate to script directory"; exit 1; }

echo "Setting up frontend..."
cd "$SCRIPT_DIR/frontend" || { echo "Frontend directory not found"; exit 1; }
if [ ! -d "node_modules" ]; then
  npm install
fi
npm run build

echo "Setting up backend..."
cd "$SCRIPT_DIR/backend" || { echo "Backend directory not found"; exit 1; }
if [ ! -d "node_modules" ]; then
  npm install
fi

echo "Restarting services..."
sudo systemctl restart nginx || { echo "Failed to restart NGINX. Please check your setup."; exit 1; }
pm2 restart backend || pm2 start server.js --name backend

echo "Project setup and deployment completed successfully!"
