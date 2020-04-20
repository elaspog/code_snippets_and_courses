
# Certbotą

[udemy.com: nginx-apache-ssl-encryption-certification-course](../_webserver/_udemy.com_nginx-apache-ssl-encryption-certification-course)  
[udemy.com: install-nginx-php-mysql-ssl-wordpress-on-ubuntu](../_webserver/_udemy.com_install-nginx-php-mysql-ssl-wordpress-on-ubuntu)  
[udemy.com: nginx-crash-course](../nginx/_udemy.com_nginx-crash-course)  
[udemy.com: haproxy-http-tcp-load-balancer](../haproxy/_udemy.com_haproxy-http-tcp-load-balancer)  

# Cheatsheet

- `/etc/letsencrypt/live/[cert name]/*.pem` where `[cert name]` is typically the domain name
  - symlinks to files in the the archive folder
- `/etc/letsencrypt/archive/[cert name]/*N.pem` where `[cert name]` is typically the domain name
  - where `N` represents all of the versions of the pem files
  - max(N) is the current version


`[cert name]/privkey.pem`  : the private key for your certificate  
`[cert name]/fullchain.pem`: the certificate file used in most server software  
`[cert name]/chain.pem`    : used for OCSP stapling in Nginx >=1.3.7  
`[cert name]/cert.pem`     : will break many server configurations, and should not be used without reading further documentation (see link below)  

**WARNING**: DO NOT MOVE OR RENAME THESE FILES! Certbot expects these files to remain in this location in order to function properly! https://certbot.eff.org/docs/using.html#where-are-my-certificates.
