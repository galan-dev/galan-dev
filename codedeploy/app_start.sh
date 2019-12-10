#!/bin/bash

# This script is used to start the application
cd /usr/galan-dev
sudo service nginx start
npm start
# pm2 start /usr/galan-dev/bin/www -n www -f
