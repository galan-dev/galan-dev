#!/bin/bash

# This script is used to start the application
cd /usr/module-interview/src
pm2 start /usr/module-interview/src/bin/www -n www -f
