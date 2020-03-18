
# How to install WordPress with Docker

https://upcloud.com/community/tutorials/wordpress-with-docker/

## Install Docker

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

## MariaDB in a container

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

## WordPress with Docker

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
