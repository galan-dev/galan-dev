#!/bin/bash

# This script is used to stop application
cd cd /usr/galan-dev
sudo service nginx stop
killall node
# pm2 stop www || true