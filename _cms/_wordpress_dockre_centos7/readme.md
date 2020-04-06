
# Wordpress + Docker + Centos7

## Create technical user:

```
adduser technical
# passwd technical
echo "p@55w0rd" | passwd technical --stdin
usermod -aG wheel technical
```

## Install Docker

```
yum install -y yum-utils device-mapper-persistent-data lvm2
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum install -y docker-ce
systemctl start docker
systemctl enable docker
usermod -aG docker technical
curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

## Set Docker containers

```
su technical
cd ~
mkdir wp_website


cat << 'EOF' > ~/wp_website/docker-compose.yml
version: '3.3'

services:

   database:
     container_name: db
     image: mysql:5.7
     volumes:
       - "${PWD}/data_mysql:/var/lib/mysql"
       - "/tmp/db_site:/tmp"
     restart: always
     environment:
       MYSQL_ROOT_PASSWORD: somewordpress
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress

   wordpress:
     container_name: wp
     depends_on:
       - database
     image: wordpress:latest
     ports:
       - "80:80"
     restart: always
     environment:
       WORDPRESS_DB_HOST: database:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD: wordpress
       WORDPRESS_DB_NAME: wordpress
     volumes:
       - "${PWD}/data_wordpress:/var/www/html"
       - "/tmp/wp_site:/tmp"

volumes:
    data_mysql:
    data_wordpress:

EOF


cd wp_website
```

## Run containers

```
docker-compose up -d
```
