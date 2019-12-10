#!/bin/bash

# This script is used to start the application
cd /usr/galan-dev
pm2 start /usr/galan-dev/bin/www -n www -f
