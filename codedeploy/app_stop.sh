#!/bin/bash

# This script is used to stop application
# cd /usr/galan-dev
service nginx stop

if pgrep -x "node" > /dev/null
then
    echo "App Stop: Node is Running so Stop"
    killall -9 node
else
    echo "App Stop: No Node Process Running so cont.."
fi

# pm2 stop www || true