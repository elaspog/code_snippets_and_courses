#!/bin/bash

# Update CentOS with any patches
yum update -y --exclude=kernel

# Tools
yum install -y nano git unyip screen

# Apache
yum install -y httpd httpd-devel httpd-tools
chconfig --add httpd
chconfig httpd on
service httpd stop

rm -rf /var/www/html
ln -s /vagrant /var/www/html

service httpd start

# PHP
yum install -y php php-cli php-common php-devel php-mysql

# MySQL
yum install -y mysql mysql-server mysel-devel
chconfig --add mysqld
chconfig mysqld on

service mysqld start

mysql -u root -e "SHOW DATABASES;"

# Download Starter Content
cd /vagrant
sudo -u vagrant wget -q https://raw.githubusercontent.com/screencasts-pro/vagrant/master/files/index.html
sudo -u vagrant wget -q https://raw.githubusercontent.com/screencasts-pro/vagrant/master/files/info.php

service httpd restart
