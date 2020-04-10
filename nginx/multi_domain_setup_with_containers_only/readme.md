
# Multi Domain Setup with Containers only

## Important

- Note
  - container names can be used as host names in the nginx configuration files
- Ensure that
  - all of the containers have the same network interface
    - containers created by the same `docker-compose.yml` files fulfill this criteria by default
  - in nginx configuration files the "inner ports" from the port mappings are used
    - the "outer ports" refer to the `localhost`'s network interface, not the container's network interface

## Ngix configuration file

`nginx_revproxy/default.conf`:
```
upstream domain1 {
  server wp1:80;
}

upstream domain2 {
  server wp2:80;
}


server {
    listen       80;
    server_name  domain1.com;
    location / {
        proxy_pass http://domain1/;
        proxy_set_header Host            $host;
        proxy_set_header X-Forwarded-For $remote_addr;
    }
}

server {
    listen       80;
    server_name  domain2.net;
    location / {
        proxy_pass http://domain2/;
        proxy_set_header Host            $host;
        proxy_set_header X-Forwarded-For $remote_addr;
    }
}
```

## Docker setup

`nginx_revproxy/Dockerfile`:
```
FROM nginx:stable-alpine
COPY default.conf /etc/nginx/conf.d
EXPOSE 80/tcp
EXPOSE 443/tcp
CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;';"]
WORKDIR /usr/share/nginx/html
```

`docker-compose.yml`:
```
version: '3.7'

services:

   revproxy:
     container_name: revproxy
     build: nginx_revproxy
     depends_on:
       - wp1
       - wp2
     restart: always
     ports:
       - 80:80
     networks:
       - mynet

   db1:
     container_name: db1
     image: mysql:5.7
     volumes:
       - "${PWD}/data_mysql1:/var/lib/mysql"
       - "/tmp/db_site1:/tmp"
     restart: always
     environment:
       MYSQL_ROOT_PASSWORD: somewordpress
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress
     networks:
       - mynet

   db2:
     container_name: db2
     image: mysql:5.7
     volumes:
       - "${PWD}/data_mysql2:/var/lib/mysql"
       - "/tmp/db_site2:/tmp"
     restart: always
     environment:
       MYSQL_ROOT_PASSWORD: somewordpress
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress
     networks:
       - mynet

   wp1:
     container_name: wp1
     depends_on:
       - db1
     image: wordpress:latest
     ports:
       - "8081:80"
     restart: always
     environment:
       WORDPRESS_DB_HOST: db1:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD: wordpress
       WORDPRESS_DB_NAME: wordpress
     volumes:
       - "${PWD}/data_wordpress1:/var/www/html"
       - "/tmp/wp_site1:/tmp"
     networks:
       - mynet

   wp2:
     container_name: wp2
     depends_on:
       - db2
     image: wordpress:latest
     ports:
       - "8082:80"
     restart: always
     environment:
       WORDPRESS_DB_HOST: db2:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD: wordpress
       WORDPRESS_DB_NAME: wordpress
     volumes:
       - "${PWD}/data_wordpress2:/var/www/html"
       - "/tmp/wp_site2:/tmp"
     networks:
       - mynet

volumes:
    data_mysql1:
    data_mysql2:
    data_wordpress1:
    data_wordpress2:

networks:
    mynet:

```

## Preparation

```
mkdir /tmp/db_site1
mkdir /tmp/db_site2
mkdir /tmp/wp_site1
mkdir /tmp/wp_site2

chmod 1777 /tmp/db_site1
chmod 1777 /tmp/db_site2
chmod 1777 /tmp/wp_site1
chmod 1777 /tmp/wp_site2
```

## Useful helper commands

```
docker run -it -d -p 80:80 --network=mynetwork --name proxy nginx:stable-alpine
docker network create mynetwork
docker network connect mynetwork container_name
docker network inspect mynetwork
```
