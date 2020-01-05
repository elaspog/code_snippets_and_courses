#!/bin/bash

# MySQL
yum install -y mysql mysql-server mysel-devel
chconfig --add mysqld
chconfig mysqld on

service mysqld start

mysql -u root -e "SHOW DATABASES;"
