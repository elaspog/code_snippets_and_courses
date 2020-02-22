
# NGINX, Apache, SSL Encryption - Certification Course

https://www.udemy.com/course/nginx-apache-ssl-encryption-certification-course

## S01 Apache Web Server Configuration

### S01/E01 Deploying a Virtual Server on Digital Ocean

One server can be used to host multiple websites

- create new project: mainserver (or website server name)
- create droplet:
  - Ubuntu 18.04 x64
  - 1 GB memory, 1 vCPU, 25 GB SSD, 1 TB transfer
  - hostname: mainserver

IP address and root administrative password are generated

### S01/E02 Creating and Attaching a Floating IP

Floating IP = reassignable IP address

Networking, Floating IPs tab, select mainserver, press Assign Floating IP button

### S01/E03 Intro to Terminal and Root User Authentication

```
ssh root@<FLOATING_IP>
```

Use the password from Digital Ocean's email received after droplet creation.

### S01/E04 Apache Installation and Testing

```
apt update
apt install apache2
```

in web browser:
```
http://<FLOATING_IP>
```

### S01/E05 Installing MySQL Database Management System

```
sudo apt install mysql-server
sudo mysql_secure_installation
# validate password plugin      -> no
#   secure password format is required, may conflict with plugins
# remove anonymous users        -> yes
# disallow root login remotely  -> yes
# remove test database          -> yes
# reload the privilege tables   -> yes
```

Switch authentication method from `auth_socket` to `mysql_native_password`.

```
sudo mysql
SELECT user, authentication_string, plugin, host FROM mysql.user;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
SELECT user, authentication_string, plugin, host FROM mysql.user;
exit
```

### S01/E06 Installing and Testing PHP

**/var/www/html/info.php**

```
sudo apt install php libapache2-mod-php php-mysql
sudo systemctl restart apache2

sudo nano /var/www/html/info.php
# insert the content of the file
```

in browser:
```
http://<FLOATING_IP>/info.php
```

```
rm /var/www/html/info.php
```

### S01/E07 Installing PhpMyAdmin for Database Administration

```
apt update
sudo apt install phpmyadmin php-mbstring php-gettext
# select apache2, press OK
# configure database with dbconfig-common for phpmyadmin, select yes
```
phpMyAdmin configuration file: `/etc/apache2/conf-enabled`
```
# enable PHP extension
sudo phpenmod mbstring
sudo systemctl restart apache2
```
in web browser:
```
http://<FLOATING_IP>/phpmyadmin
```

### S01/E08 Introduction to Virtual Hosts

Apache **Virtual Hosts** allow to serve multiple domains from a single server.

Primary website domain (in case of one hosted website):
- **www/html**

When hosting multiple domains, there is no primary domain:
- **www/xyz.com/html**
- **www/abc.com/html**

### S01/E09 Directory Structure, Permissions and Test Files

**/var/www/example1.com/html/index.html**  
**/var/www/example2.com/html/index.html**

```
sudo mkdir /var/www/example1.com
sudo mkdir /var/www/example2.com

# SFTP connection with FileZilla
# create subfolders 'html' in each subdomain folder
# reset the permissions on all of these folders to 755

# create the HTML files
nano /var/www/example1.com/html/index.html
nano /var/www/example2.com/html/index.html
```

### S01/E10 Configuring Virtual Host Files and Directives

**/etc/apache2/sites-available/example1.com.conf**  
**/etc/apache2/sites-available/example2.com.conf**

Default configuration directive for Apache: `/etc/apache2/sites-available/0000-default.conf`

```
sudo nano /etc/apache2/sites-available/example1.com.conf
sudo a2ensite example1.com.conf
systemctl reload apache2

sudo nano /etc/apache2/sites-available/example2.com.conf
sudo a2ensite example2.com.conf
systemctl reload apache2

sudo a2dissite 0000-default.conf
systemctl reload apache2
```

### S01/E11 Name Server Configuration

GoDaddy.com

Domain, DNS button, Nameservers, point the domain to Digital Ocean

```
ns1.digitalocean.com
ns2.digitalocean.com
ns3.digitalocean.com
```

### S01/E12 DNS Zone File Configuration and Testing

#### currently unavailable due to course error

### S01/E13 Installing SSL for each Domain using Lets Encrypt

```
sudo add-apt-repository ppa:certbot/certbot
sudo apt install python-certbot-apache
```

Certbot need to be able to find correct Virtual Host files for each domain in the Apache configuration.

- option 1: register certificates for all the domain at once:
```
sudo certbot --apache -d example1.com -d www.example1.com -d example2.com -d www.example2.com
```
- option 2: register certificates separately:
```
sudo certbot --apache -d example1.com -d www.example1.com
sudo certbot --apache -d example2.com -d www.example2.com
```

for any option:
- enter email address
- agree the terms of service
- don't share email address with EFF
- redirect all traffic to HTTPS version of the website

### S01/E14 Summary and Next Steps

## S02 NGINX Web Server Configuration

### S02/E15 Apache vs NGINX

### S02/E16 History of Apache

### S02/E17 Advantages of NGINX

### S02/E18 Deploying a Droplet on Digital Ocean

### S02/E19 Attaching a Floating IP

### S02/E20 Connecting to your Virtual Server

### S02/E21 Install and Configure NGINX

### S02/E22 Install and Configure MySQL on NGINX

### S02/E23 Install and Configure PHP on NGINX

### S02/E24 Creating a PHP Test File

### S02/E25 Modifying Domain Name Servers

### S02/E26 Configuring DNS Zone Files

### S02/E27 Updating the NGINX Block File Configuration

### S02/E28 Installing Lets Encrypt SSL on NGINX

### S02/E29 Installing PhpMyAdmin

### S02/E30 Securing PhpMyAdmin with Symbolic Links

### S02/E31 Securing PhpMyAdmin with Authentication Gateways

### S02/E32 Enabling Authentication Gateways

### S02/E33 Introduction to WordPress

### S02/E34 Creating a Database for Wordpress

### S02/E35 Installing PHP Extensions for WordPress

### S02/E36 NGINX Block Configuration for WordPress

### S02/E37 Downloading WordPress

### S02/E38 WordPress Configuration

### S02/E39 WordPress Setup

## S03 Bonus: SSL Certificates Explored + Practice Project

### S03/E40 Introduction to SSL Certificates

### S03/E41 Traditional vs. Digital Certificate

### S03/E42 Types of SSL Certificates

### S03/E43 How SSL Certificates Work

### S03/E44 Obtaining an SSL Certificate

### S03/E45 Introduction to Lets Encrypt

### S03/E46 Server Preparation

### S03/E47 Domain Name Server Administration

### S03/E48 Introduction to Digital Ocean

### S03/E49 Droplet Configurations

### S03/E50 Creating a Droplet

### S03/E51 Install PuTTY-Terminal and Connect

### S03/E52 Install LAMP Stack - Apache, MySQL, PHP

### S03/E53 Configure DNS on Digital Ocean

### S03/E54 Droplet Basic Configurations

### S03/E55 Installing Lets Encrypt

### S03/E56 SSL Certificate Status Reports

### S03/E57 Redirect all Domain Variations to HTTPS

### S03/E58 Auto Renewal with cron jobs
