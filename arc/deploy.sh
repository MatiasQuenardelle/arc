#!/bin/bash

# === CONFIG ===
KEY_PATH=~/Documents/ssh/Arcoiris-de-Amor.pem
USER=ec2-user
HOST=51.20.60.136
REMOTE_DIR=/home/ec2-user/next-app
APP_NAME=arcoiris

# === BUILD LOCALLY ===
echo "🛠️  Building Next.js locally..."
npm install
npm run build

# === SYNC FILES ===
echo "🚀 Uploading updated files to EC2..."
rsync -avz \
  --exclude node_modules \
  --exclude .git \
  -e "ssh -i $KEY_PATH" \
  .next public package.json package-lock.json \
  $USER@$HOST:$REMOTE_DIR

# === RESTART APP WITH PM2 ===
echo "♻️  Restarting app with PM2..."
ssh -i $KEY_PATH $USER@$HOST "pm2 restart $APP_NAME"

echo "✅ Deploy complete!"

