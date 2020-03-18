
# How to install WordPress with Docker

https://upcloud.com/community/tutorials/wordpress-with-docker/  
https://upcloud.com/community/tutorials/deploy-wordpress-with-docker-compose/

https://hub.docker.com/_/wordpress/  
https://hub.docker.com/_/mariadb/

## Installation

### Install Docker

```
curl -V

# Debian and Ubuntu
sudo apt-get update
sudo apt-get install curl

# CentOS
sudo yum update
sudo yum install curl

curl -fsSL https://get.docker.com/ | sh

sudo usermod -aG docker <username>
# log out and back
docker run hello-world
sudo systemctl restart docker
```

### Installing Docker Compose

```
sudo -i
curl -L https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
exit

docker-compose -v
```

## Docker based solution

### MariaDB in a container

* MariaDB Environment variables, these are marked in the Docker command with -e:
  * -e MYSQL_ROOT_PASSWORD= Set your own password here.
  * -e MYSQL_DATABASE= Creates and names a new database e.g. wordpress.
* Docker parameters:
  * –name wordpressdb – Names the container.
  * -v “$PWD/database”:/var/lib/mysql – Creates a data directory linked to the container storage to ensure data persistence.
  * -d – Tells Docker to run the container in daemon.
  * mariadb:latest – Finally defines what to install and which version

```
mkdir ~/wordpress && cd ~/wordpress

docker run -e MYSQL_ROOT_PASSWORD=<password> -e MYSQL_DATABASE=wordpress --name wordpressdb -v "$PWD/database":/var/lib/mysql -d mariadb:latest

docker ps

# docker start <container name>
# docker stop <container name>
# docker rm <container name>

# docker --help
# docker <command> --help
```

### WordPress with Docker

* WordPress container also takes environment variables and Docker parameters:
  * -e WORDPRESS_DB_PASSWORD= Set the same database password here.
  * –name wordpress – Gives the container a name.
  * –link wordpressdb:mysql – Links the WordPress container with the MariaDB container so that the applications can interact.
  * -p 80:80 – Tells Docker to pass connections from your server’s HTTP port to the containers internal port 80.
  * -v “$PWD/html”:/var/www/html – Sets the WordPress files accessible from outside the container. The volume files will remain even if the container was removed.
  * -d – Makes the container run on background
  * wordpress – Tells Docker what to install. Uses the package downloaded earlier with the docker pull wordpress -command.

```
docker pull wordpress
docker run -e WORDPRESS_DB_PASSWORD=<password> --name wordpress --link wordpressdb:mysql -p 80:80 -v "$PWD/html":/var/www/html -d wordpress
```

in browser:
```
# http://<public IP>/wp-admin/install.php
http://localhost
```

If error happens while linking the server’s public IP address to the WordPress container’s internal address:
```
# remove the failed container
docker rm wordpress

# restart Docker and the database container
# also make sure no other service is already bound to the port 80
sudo systemctl restart docker
docker start wordpressdb
# try creating the WordPress container again
```

## Docker Compose based solution

```
mkdir  ~/wordpress-compose && cd ~/wordpress-compose
nano docker-compose.yml
```

In **docker-compose.yml** replace the database password and public_ip:
```
wordpress:
    image: wordpress
    links:
     - mariadb:mysql
    environment:
     - WORDPRESS_DB_PASSWORD=password
    ports:
     - "public_ip:80:80"
    volumes:
     - ./html:/var/www/html
mariadb:
    image: mariadb
    environment:
     - MYSQL_ROOT_PASSWORD=password
     - MYSQL_DATABASE=wordpress
    volumes:
     - ./database:/var/lib/mysql
```

```
# Starts both containers in the background and leaves them running
docker-compose up -d
```

in browser:
```
http://localhost:80
```

```
# Check for updates on the WordPress and MariaDB images and push changes to containers
docker-compose pull
docker-compose up -d

# Starts all stopped containers in the work directory
docker-compose start

# Stops all currently running containers in the work directory
docker-compose stop

# Validates and shows the configuration
docker-compose config

# Lists all running containers in the work directory
docker-compose ps

# Stops and removes all containers in the work directory
docker-compose down
```
