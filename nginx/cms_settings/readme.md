
# Useful NginX Settings for CMS

## WordPress settings

sources:  
[udemy.com: nginx-apache-ssl-encryption-certification-course][1]  
[udemy.com: nginx-crash-course][2]  

[1]: ../../_webserver/_udemy.com_nginx-apache-ssl-encryption-certification-course
[2]: ../../nginx/_udemy.com_nginx-crash-course

### S02/E29 Installing PhpMyAdmin

[nginx-apache-ssl-encryption-certification-course][1]

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

### S02/E28 Installing Lets Encrypt SSL on NGINX

[nginx-apache-ssl-encryption-certification-course][1]

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

### S02/E31 Securing PhpMyAdmin with Authentication Gateways

[nginx-apache-ssl-encryption-certification-course][1]

Create authentication gateway:

```
openssl passwd
# enter a new password
# select and copy the encrypted version of the entered password

nano /etc/nginx/pma_pass
# <USER_NAME>:<COPIED_ENCRYPTED_PASSWORD>
# save the file
```

### S2/L08 NginX as a Layer 7 Proxy

[nginx-crash-course][2]  

#### Block admin connections

- don't allow access to admin from port 80
- allow access only from internal network

`/usr/local/etc/nginx/nginx.conf`:
```
server {
    listen 80;
    #...

    location /admin {
        return 403;
    }
}
```

in web browser:
```
localhost/admin
# Error 403 - not served
```

### S2/L10 Enable HTTPS on NginX

[nginx-crash-course][2]  

- in router settings:
  - forward TCP/UDP port 80 for HTTP
  - forward TCP/UDP port 443 for HTTPS

`/usr/local/etc/nginx/nginx.conf`:
```
http {

    upstream allbackend {
        #ip_hash;
        server 127.0.0.1:2222;
        server 127.0.0.1:3333;
        server 127.0.0.1:4444;
        server 127.0.0.1:5555;
    }

    upstream app1backend {
        server 127.0.0.1:2222;
        server 127.0.0.1:3333;
    }

    upstream app2backend {
        server 127.0.0.1:4444;
        server 127.0.0.1:5555;
    }

    server {
        listen 80;
        location / {
            proxy_pass http://allbackend/;
        }

        location /app1 {
            proxy_pass http://app1backend/;
        }

        location /app2 {
            proxy_pass http://app2backend/;
        }

        location /admin {
            return 403;
        }
    }

}

events { }
```

#### Create a certificate

https://letsencrypt.org

- Let's encrypt
- certbot API
  - public key
  - private key

OSX install:
```
brew install letsencrypt
```
in console:
```
nginx -s stop
# because the certbot need to use port 80 to communicate with the website

sudo certbot certonly --standalone
# enter the registered domain name: e.g.: nginxtest.ddns.net
# path to private and public key is on the output
```

- `sudo` for using privileged port 80
- there is a different way to generate certificate, but that touches the existing (nginx) config
  - better to

`/usr/local/etc/nginx/nginx.conf`:
```
server {
    listen 80;
    listen 443 ssl;

    ssl_certificate /etc/letsencrypt/live/nginxtest.ddns.net/fullchain.pem;

    ssl_certificate /etc/letsencrypt/live/nginxtest.ddns.net/privkey.pem;

    # ...
}
```

in console:
```
nginx -s reload
```

from web browser:
```
<created_domain_name>
e.g.: nginxtest.ddns.net
# connection is secure
```

- RSA Encryption - not recommended cypher
- Diffie-Hellman - recommended cypher

TLS checker: https://cdn77.com/tls-test

- The website doed not have TLS 1.3


### S2/L11 Enable TLS 1.3 on NginX

[nginx-crash-course][2]  

`/usr/local/etc/nginx/nginx.conf`:
```
server {
    # ...
    ssl_protocols TLSv1.3;
    # ...
}
```

- TLS 1.3
  - will fail with clients not supporting
  - Diffie-Hellman - latest encryption algorithm
- TLS 1.2
  - slow
  - uses old cyphers by default
  - downgrade attack

in console:
```
nginx -s reload
```

from web browser:
```
<created_domain_name>
e.g.: nginxtest.ddns.net
# connection is secure
```

### S2/L12 Enable HTTP/2 on NginX

[nginx-crash-course][2]  

`/usr/local/etc/nginx/nginx.conf`:
```
server {
    listen 80;
    listen 443 ssl http2;

    # ...
}
```

in console:
```
nginx -s reload
```

from web browser:
```
<created_domain_name>
e.g.: nginxtest.ddns.net
# connection uses http2
```

- Sidenotes:
  - the certificate is still encrypted with RSA algorithm
  - HAProxy forces to use the latest security solutions

```
sudo nginx -v
```

### S02/E23 Install and Configure PHP on NGINX

[nginx-apache-ssl-encryption-certification-course][1]

* NGINX does not contain the ability to process PHP natively
  * Processing manager: **php-fpm**
    * FPM - Fast CGI Process Manager

```
apt install php-fpm php-mysql
yum install php-fpm php-mysql
```

* modify server block configuration files on NGINX
  * Server block files are similar to Virtual Host files on Apache
  * they instruct the server how to process many different components
    * e.g.: handle multiple domain, specify what file extensions a block can handle

* modifying the default block configuration file (because there is only one domain in this example)

```
server {
  listen 80 default_server;
  listen [::]:80 default_server;

  # SSL configuration
  #
  # listen 443 ssl default_server;
  # listen [::]:443 ssl default_server;
  #
  # Note: You should disable gzip for SSL traffic.
  # See: https://bugs.debian.org/773332
  #
  # Read up on ssl_ciphers to ensure a secure configuration.
  # See: https://bugs.debian.org/765782
  #
  # Self signed certs generated by the ssl-cert package
  # Don't use them in a production server!
  #
  # include snippets/snakeoil.conf;

  root /var/www/html;

  # set preference on PHP files  HTML files
  index index.php index.html index.htm index.nginx-debian.html;

  # domain name or IP address
  # server_name _;
  server_name www.unificaxt.com unificaxt.com 165.227.254.72;

  # set how to handle requests for pages that are not found
  location / {
    # try_files $uri $uri/ =404;
    # Permalinks are more SEO friendly, rather than using numerical id numbers for posts etc.
    try_files $uri $uri/ /index.php$is_args$args;
  }

  # It's costly to serve static files, they are better to be served from system cache.
  location = /favicon.ico { log_not_found off; access_log off; }
  location = /robots.txt { log_not_found off; access_log off; allow all; }
  location ~* \.(css|gif|ico|jpeg|jpg|js|png)$ {
    expires max;
    log_not_found off;
  }

  # create a new location block with the name phpmyadmin symbolic link created earlier:
  location /hidedb {

    # displays authentication prompt to users when trying to access phpmyadmin
    auth_basic "Admin Login";

    # confirm the username/password agains previously created file
    auth_basic_user_file /etc/nginx/pma_pass;
  }

  # configuration for processing PHP
  location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
  }

  # not to process .htaccess files
  location ~ /\.ht {
    deny all;
  }
}
```
