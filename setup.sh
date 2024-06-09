#!/bin/bash

set -e

APP_NAME="next-portfolio"
LOG_FILE="/home/alashchev17/.pm2/logs/$APP_NAME-out.log"

echo "Starting setup process ($APP_NAME)..."

cd /var/www/$APP_NAME


echo "Pulling latest changes from repository..."
sudo git pull


echo "Installing dependencies..."
sudo npm install


echo "Building the project..."
npm run build


echo "Shutting down the server..."
pm2 delete $APP_NAME --silent || true # Ignore error if the process does not exist

rm -f $LOG_FILE

echo "Starting the server..."
pm2 start ecosystem.config.js --silent &

check_pm2_ready() {
  grep -q "✓ Ready in" "$LOG_FILE"
}

check_pm2_errors() {
  grep -q "Error" $LOG_FILE
}

while [ ! -f "$LOG_FILE" ]; do
    sleep 1
done

echo "Waiting PM2 to finish starting up the project..."
TIMEOUT=60
ELAPSED=0
INTERVAL=1

while ! grep -q "$APP_NAME@0.1.0 deploy" "$LOG_FILE"; do
    sleep 1
done

while ! check_pm2_ready; do
  sleep $INTERVAL
  ELAPSED=$((ELAPSED + INTERVAL))

  if check_pm2_errors; then
    echo "PM2 encountered an error during startup. Check the log file for details."
    cat $LOG_FILE
    exit 1
  fi
  
  if [ $ELAPSED -ge $TIMEOUT ]; then
    echo "PM2 failed to start within $TIMEOUT seconds. Check the log file for details."
    cat $LOG_FILE
    exit 1
  fi
done

echo -e "\n\n\033[0;32m✓ \033[0;33mProject ($APP_NAME) set up successfully! \n\033[0mSee the log file for details: \n\033[0;32m$LOG_FILE\033[0;33m\n\n"
exit 1