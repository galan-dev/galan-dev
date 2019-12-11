#!/bin/bash

# This script is used to start the application
cd /usr/galan-dev
service nginx start
if pgrep -x "node" > /dev/null
then
    echo "App Start: Node is already running to cont.."
else
    echo "App Start: Node Not Running so Start"
    npm start &
fi
# pm2 start /usr/galan-dev/bin/www -n www -f
