#!/bin/bash

# This script is executed before copying the source

yum -y update

curl --silent --location https://rpm.nodesource.com/setup_13.x | bash -
yum -y install nodejs

# npm install pm2@latest -g
# pm2 update

export app_root=/usr/galan-dev
if [ -d "$app_root" ];then
    rm -rf /usr/galan-dev
    mkdir -p /usr/galan-dev
else
    mkdir -p /usr/galan-dev
fi

