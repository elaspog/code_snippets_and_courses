
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
