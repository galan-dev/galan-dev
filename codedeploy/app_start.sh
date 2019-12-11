#!/bin/bash

# This script is used to start the application
cd /usr/galan-dev
service nginx start
if pgrep -x "node" > /dev/null
then
    echo "App Start: Node is already running so stop and run new.."
    killall -9 node
    npm start && exit 0
else
    echo "App Start: Node Not Running so Start" 
    npm start && exit 0
fi
# pm2 start /usr/galan-dev/bin/www -n www -f
