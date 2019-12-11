#!/bin/bash

# This script is used to stop application
# cd /usr/galan-dev
service nginx stop
killall -9 node
# pm2 stop www || true