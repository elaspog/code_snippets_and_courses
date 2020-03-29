
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
  fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
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

In web browser:

```
http://<FLOATING_IP>
http://<DOMAIN_NAME>
http://<WWW.DOMAIN_NAME>
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

## S05 PhpMyAdmin on NGINX

### S05/E15 Installing PhpMyAdmin

PhpMyAdmin

```
apt-get update
apt-get install phpmyadmin
# select niether apache2 nor lighttpd
# configure database with dbconfig-common for phpmyadmin

# to access phpmyadmin from web browser
ln -s /usr/share/phpmyadmin /var/www/html

# enable mcrypt module
phpenmod mcrypt

# restart php7.2-fpm
systemctl restart php7.2-fpm
```

In web browser:

```
http://<DOMAIN_NAME>/phpmyadmin
# root / password
```

### S05/E16 Securing PhpMyAdmin with Symbolic Links

```
cd /var/www/html
ls -l
mv phpmyadmin hidedb
ls -l
```

In web browser:

```
http://<DOMAIN_NAME>/phpmyadmin
# no longer works

http://<DOMAIN_NAME>/hidedb
# works
```

### S05/E17 Securing PhpMyAdmin with Authentication Gateways

**/etc/nginx/pma_pass**

Create authentication gateway:

```
openssl passwd
# enter a new password
# select and copy the encrypted version of the entered password

nano /etc/nginx/pma_pass
# <USER_NAME>:<COPIED_ENCRYPTED_PASSWORD>
# save the file
```

### S05/E18 Enabling Authentication Gateways on NGINX

**/etc/nginx/sites-available/default**

```
nano /etc/nginx/sites-available/default
# create a new location block with the name phpmyadmin symbolic link created earlier:

  location /hidedb {

    # displays authentication prompt to users when trying to access phpmyadmin
    auth_basic "Admin Login";

    # confirm the username/password agains previously created file
    auth_basic_user_file /etc/nginx/pma_pass;
  }
```

```
service nginx restart
```

In web browser:
```
http://<DOMAIN_NAME>/hidedb
# login prompt asks for username/password
```

## S06 WordPress on NGINX

### S06/E19 Introduction to WordPress

### S06/E20 Creating a Database for WordPress

```
mysql -p
# enter previously created password for root user in mysql

CREATE DATABASE wordpress DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

GRANT ALL ON wordpress.* TO 'wordpressuser'@'localhost' IDENTIFIED BY 'password';

FLUSH PRIVILEGES;

exit;
```

### S06/E21 Installing PHP Extensions for WordPress

```
apt update

apt install php-curl php-gd php-intl php-mbstring php-soap php-xml php-xmlrpc php-zip

systemctl restart php7.2-fpm
```

### S06/E22 NGINX Block Configuration File for WordPress

**/etc/nginx/sites-available/default**

Manage requests for `favicon.ico` or `robots.txt`.
```
nano /etc/nginx/sites-available/default

# Permalinks are more SEO friendly, rather than using numerical id numbers for posts etc.
location / {

  # try_files $uri $uri/ =404;
  try_files $uri $uri/ /index.php$is_args$args;
}

# It's costly to serve static files, they are better to be served from system cache.
location = /favicon.ico { log_not_found off; access_log off; }
location = /robots.txt { log_not_found off; access_log off; allow all; }
location ~* \.(css|gif|ico|jpeg|jpg|js|png)$ {
  expires max;
  log_not_found off;
}
```

```
nginx -t

systemctl reload nginx
```

### S06/E23 Downloading WordPress

```
cd /tmp
curl -LO https://wordpress.org/latest.tar.gz
tar xzvf latest.tar.gz
cp /tmp/wordpress/wp-config-sample.php /tmp/wordpress/wp-config.php

sudo cp -a /tmp/wordpress/. /var/www/html

# give WordPress permission to serve web files and and perform updates towards html directory
chown -R www-data:www-data /var/www/html
```

### S06/E24 WordPress Configuration

**/var/www/html/wp-config.php**

```
# configure secret keys that WordPress uses for security installation
curl -s https://api.wordpress.org/secret-key/1.1/salt

# generated keys:
define('AUTH_KEY',         'UA-XH%1+y}P1+o-`f.@+P_G=^;L%>H6mkTx`n6p*l)fn>|t&mD#4U+pUn)<HryU@');
define('SECURE_AUTH_KEY',  '3z%Sa~.^YwR:/<X4eld{4-+jot@&@V7gFc%P=H_J%9i]}$:~ d5jx=8:|`{ah2B-');
define('LOGGED_IN_KEY',    'i_-lbq$yKIS|YV7|%YR_O0BPmuDk&rM8}u+k>l|Opw|/OUdWaxj7GR_Hahuw&|)-');
define('NONCE_KEY',        ' Y+<Z^09M&ig~$a+hb~0A)]h`^FiLz$uy@Ueo~9Qm_r;X;7gy|(KV(^c2CX1JekU');
define('AUTH_SALT',        ']ZXPf|n{c,-fqEG%xF7wWN6j7xG2+w18%Gw|f8!0 -51{$DP{fsc #1&/@Z-( e[');
define('SECURE_AUTH_SALT', 'Nu-GK-A;+-iZ{5+V;32_M8`:voTZ%LMhfO~wjL4AF9<+qqqo=8k( wU-W_@cQ_Zz');
define('LOGGED_IN_SALT',   'Hqn T]}A;&9j)?H!UVRA.Me7#Z2m+p^yY0&0`+ 9fc+c+uR-M-_86}!5GYrs@I* ');
define('NONCE_SALT',       'JF-+8$!cg.B)_T-=HQ),u$lbSLz*Xg1CuKSY4IjPVKuKRK~7kuuIBa>`-S<(4CM-');

nano /var/www/html/wp-config.php
```

Modify the values and insert the previously generated keys:
```
// define( 'DB_NAME', 'database_name_here' );
define( 'DB_NAME', 'wordpress' );

// define( 'DB_USER', 'username_here' );
define( 'DB_USER', 'wordpressuser' );

// define( 'DB_PASSWORD', 'password_here' );
define( 'DB_PASSWORD', 'password' );

// ...

// directive that gives WordPress permission to write directly to the file system
// without this directive WordPress prompts for FTP credentials when performing certain actions
define( 'FS_METHOD', 'direct' );

// Keys generated by WordPress API
define('AUTH_KEY',         'UA-XH%1+y}P1+o-`f.@+P_G=^;L%>H6mkTx`n6p*l)fn>|t&mD#4U+pUn)<HryU@');
define('SECURE_AUTH_KEY',  '3z%Sa~.^YwR:/<X4eld{4-+jot@&@V7gFc%P=H_J%9i]}$:~ d5jx=8:|`{ah2B-');
define('LOGGED_IN_KEY',    'i_-lbq$yKIS|YV7|%YR_O0BPmuDk&rM8}u+k>l|Opw|/OUdWaxj7GR_Hahuw&|)-');
define('NONCE_KEY',        ' Y+<Z^09M&ig~$a+hb~0A)]h`^FiLz$uy@Ueo~9Qm_r;X;7gy|(KV(^c2CX1JekU');
define('AUTH_SALT',        ']ZXPf|n{c,-fqEG%xF7wWN6j7xG2+w18%Gw|f8!0 -51{$DP{fsc #1&/@Z-( e[');
define('SECURE_AUTH_SALT', 'Nu-GK-A;+-iZ{5+V;32_M8`:voTZ%LMhfO~wjL4AF9<+qqqo=8k( wU-W_@cQ_Zz');
define('LOGGED_IN_SALT',   'Hqn T]}A;&9j)?H!UVRA.Me7#Z2m+p^yY0&0`+ 9fc+c+uR-M-_86}!5GYrs@I* ');
define('NONCE_SALT',       'JF-+8$!cg.B)_T-=HQ),u$lbSLz*Xg1CuKSY4IjPVKuKRK~7kuuIBa>`-S<(4CM-');
```

In browser:
```
http://<DOMAIN_NAME>
  will redirect to http://<DOMAIN_NAME>/wp-admin/install.php
```

### S06/E25 WordPress Setup

Graphical installation of the WordPress website.

Most important URLs:
```
https://<DOMAIN_NAME>
https://<DOMAIN_NAME>/wp-admin

# https://<DOMAIN_NAME>/phpmyadmin
#   in this course: https://<DOMAIN_NAME>/hidedb
```
