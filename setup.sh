#!/bin/bash

echo "Starting project setup..."

# Check and install system dependencies
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

# Ensure Node.js and npm are up-to-date
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "Node.js version: $(node -v)"
    echo "NPM version: $(npm -v)"
fi

# Ensure PM2 is installed globally
if ! command -v pm2 &> /dev/null; then
    echo "PM2 not found. Installing globally..."
    npm install -g pm2
else
    echo "PM2 is already installed."
fi

# Navigate to project directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || { echo "Failed to navigate to script directory"; exit 1; }

# Install dependencies and build frontend
echo "Setting up frontend..."
cd "$SCRIPT_DIR/frontend" || { echo "Frontend directory not found"; exit 1; }
npm install
npm run build

# Install dependencies for backend
echo "Setting up backend..."
cd "$SCRIPT_DIR/backend" || { echo "Backend directory not found"; exit 1; }
npm install

# Restart services
echo "Restarting services..."
sudo systemctl restart nginx || { echo "Failed to restart NGINX. Please check your setup."; exit 1; }
pm2 restart backend || pm2 start server.js --name backend

echo "Project setup and deployment completed successfully!"
