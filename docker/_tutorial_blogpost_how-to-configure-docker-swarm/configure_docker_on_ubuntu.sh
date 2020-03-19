#!/bin/bash

# Debian and Ubuntu
sudo apt-get install curl -y
curl -sSL https://get.docker.com/ | sh

# Workaround: install older version
sudo apt-get update
sudo apt-get remove -y docker-ce
sudo apt-get install -y docker-ce=18.06.1~ce~3-0~ubuntu

sudo service docker stop

# sudo nohup docker daemon -H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock &
sudo nohup dockerd -H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock &

sudo docker info

sudo usermod -aG docker vagrant
