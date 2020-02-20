
# Install NGINX, PHP, MySQL, SSL & WordPress on Ubuntu 18.04

https://www.udemy.com/course/install-nginx-php-mysql-ssl-wordpress-on-ubuntu

## S01 Introduction

### S01/E01 Apache vs. NGINX

* LAPM stack:
  * Linux
  * Apache
  * MySQL
  * PHP

### S01/E02 History of Apache

* architectural simplicity
* built to handle one process at a time, relative to the HTTP connections it facilitates
* one connection per process model
  * easy model to build on
* developers can create modules and insert them in any point in Apache's web serving logic
* easy to debug
  * only the process running the code is affected
* heavyweight threads and processes
  * each one competes for limited system resources
* mpm - multi processing modules
  * improves simultaneous connections
  * methods are bloated, overcomplex, security issues (Denial-of-service attack)

### S01/E03 History of NGINX

* LEMP Stack:
  * Linux
  * NGINX
  * MySQL
  * PHP


* resolves issues in connection concurrency
* can be deployed as standalone server
* can be used as a frontend proxy for Apache or other popular webservers
  * Reverse Proxy
* can handle thousands of HTTP requests simultaneously
* suitable for resource intensive web applications
* lightweight, customisable, easy to configure
* proven track record of stability
* mitigates security vulnerabilities and DDoS attacks
* scalable
* strict coding style
* zero downtime
* multiple backend apps

## S02 Virtual Server Basics

### S02/E04 Deploying a Droplet on Digital Ocean

https://www.digitalocean.com/

* create new project
* Ubuntu 18.04

### S02/E05 Attaching a floating IP

* allows to transfer the IP address to any other server in the future

### S02/E06 Connecting to your Virtual Server

* terminal
* putty
* web based command console

```
ssh root@<FLOATING_IP>
```

## S03 Install and Configure LEMP Stack (Linux, NGINX, MySQL, PHP)

### S03/E07 Install and Configure NGINX

```
apt update
apt install nginx
```

### S03/E08 Install and Configure MySQL on NGINX

```
apt install mysql-server-5.7
mysql_secure_installation
# validate password plugin      -> no
#   interferes with other modules
# remove anonymous users        -> yes
# disallow root login remotely  -> yes
# remove test database          -> yes
# reload the privilege tables   -> yes
```

**auth_socker plugin**
* in Ubuntu systems that are running the latest version of MySQL the root mysql user is configured to authenticate with auth_socket plugin by default, rather than a text based password
* this authentication method interferes with components installed later

**mysql_native_password**
* lets the connection with regular text based password

```
mysql
SELECT user, authentication_string, plugin, host FROM mysql.user;
# root user authenticates with auth_socket plugin

+------------------+-------------------------------------------+-----------------------+-----------+
| user             | authentication_string                     | plugin                | host      |
+------------------+-------------------------------------------+-----------------------+-----------+
| root             |                                           | auth_socket           | localhost |
| mysql.session    | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | mysql_native_password | localhost |
| mysql.sys        | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | mysql_native_password | localhost |
| debian-sys-maint | *742DF0C78B1F767572E29120A0D96C01FB00C678 | mysql_native_password | localhost |
+------------------+-------------------------------------------+-----------------------+-----------+
4 rows in set (0.00 sec)

# ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Test0101';
FLUSH PRIVILEGES;
SELECT user, authentication_string, plugin, host FROM mysql.user;

+------------------+-------------------------------------------+-----------------------+-----------+
| user             | authentication_string                     | plugin                | host      |
+------------------+-------------------------------------------+-----------------------+-----------+
| root             | *A88C15500DF07EE41AF620EBD20B9AC5895B2F91 | mysql_native_password | localhost |
| mysql.session    | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | mysql_native_password | localhost |
| mysql.sys        | *THISISNOTAVALIDPASSWORDTHATCANBEUSEDHERE | mysql_native_password | localhost |
| debian-sys-maint | *742DF0C78B1F767572E29120A0D96C01FB00C678 | mysql_native_password | localhost |
+------------------+-------------------------------------------+-----------------------+-----------+
4 rows in set (0.00 sec)

exit
```

### S03/E09 Install and Configure PHP on NGINX

**/etc/nginx/sites-available/default**

* NGINX does not contain the ability to process PHP natively
  * Processing manager: **php-fpm**
    * FPM - Fast CGI Process Manager

```
apt install php-fpm php-mysql
```

* modify server block configuration files on NGINX
  * Server block files are similar to Virtual Host files on Apache
  * they instruct the server how to process many different components
    * e.g.: handle multiple domain, specify what file extensions a block can handle

* modifying the default block configuration file (because there is only one domain in this example)

```
nano /etc/nginx/sites-available/default
```

Uncomment and set the lines in the block configuration file:
```
# set preference on PHP files  HTML files
index index.php index.html index.htm index.nginx-debian.html;

# domain name or IP address
server_name <FLOATING_IP>;

# set how to handle requests for pages that are not found
location / {
  try_files $uri $uri/ =404;
}

# configuration for processing PHP
location ~ \.php {
  include snippets/fastcgi-php.conf;
  fastcgi_pass unix:/var/run/php/php7.2-fpm.sock
}

# not to process .htaccess files
location ~ /\.ht {
  deny all;
}
```

```
# Test configuration file
nginx -t

# Reload the sever
systemctl reload nginx
```

In web browser:
```
http://<FLOATING_IP>
```

### S03/E10 Creating a PHP Test File

**info.php**

```
nano /var/www/html/info.php
rm /var/www/html/info.php
```

In web browser:
```
http://<FLOATING_IP>/info.php
```

## S04 Domain Names & SSL

### S04/E11 Modifying Domain Name Server

GoDaddy -> Domain -> DNS -> Nameservers -> Change

```
ns1.digitalocean.com
ns2.digitalocean.com
ns3.digitalocean.com
```

### S04/E12 Configuring DNS Zone Files

Digital Ocean -> Networking
  * Enter domain
  * Attach to the project

add A record:
* enter '@' or hostname
* enter the FLOATING IP
* TTL = 120

add A record:
* enter 'www'
* enter the FLOATING IP
* TTL = 120

### S04/E13 Updating the NGINX Block File Configuration File

**/etc/nginx/sites-available/default**

```
nano /etc/nginx/sites-available/default

# server_name www.unificaxt.com unificaxt.com 165.227.254.72;

systemctl reload nginx
```

### S04/E14 Installing Let's Encrypt SSL on NGINX

Certbot
```
add-apt-repository ppa:certbot/certbot
apt install python-certbot-nginx

# nano /etc/nginx/sites-available/default

cerbot --nginx -d unifcaxt.com -d www.unificaxt.com
# admin@unificaxt.com
# agree terms of service
# not share email address
# redirect all traffic to HTTPS version of the site
```

Auto renewal:

```
certbot new --dry-run
```
