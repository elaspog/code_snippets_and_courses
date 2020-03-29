
# Tutorial

https://www.udemy.com/docker-essentials/

## S1/L3
```
in local shell:  
$ sudo su -  
$ wget https://nginx.org/keys/nginx_signing.key  
$ cd /etc/apt  
$ nano sources.list  

add two lines:  
deb https://nginx.org/packages/mainline/ubuntu xenial nginx  
deb-src https://nginx.org/packages/mainline/ubuntu xenial nginx  

in local shell:  
$ apt-get remove nginx-common  
$ apt-get update  
$ apt-get install nginx  

in web browser:  
http://localhost:80  
```
## S1/L7
```
in local shell:  
$ sudo apt-get install \  
	apt-transport-https \  
	ca-certificates \  
	curl \  
	software-properties-common  
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-get add -		# get GPG key  
$ sudo apt-key fingerprint 0EBFCD88  
$ sudo add-ap-repository \  
	"deb [arch=amd64] https://download.docker.com/linux/ubuntu \  
	$(lsb_release -cs) \  
	stable"  
$ sudo apt-get install docker-ce  
$ sudo docker run hello-world  
$ sudo groupadd docker  
$ sudo usermod -aG docker my_username  
$ docker run hello-world  
```
## S1/L8
```
in local shell:  
$ docker image pull nginx:latest  
$ docker container run -itd --name web-server-nginx -p 8080:80 nginx:latest  
$ docker ps -a  

in web browser:  
http://localhost:8080  
```
## S2/L12 (S2/D4)
```
in local shell:  
$ docker build -t img-from .  
$ docker images  
```
## S2/L13 (S2/D5)
```
in local shell:  
$ docker build -t img_run-env .  
$ docker images  
$ docker run -itd --name cont_run-env img_run-env  
$ docker exec -it cont_run-env bash  

in container:  
$ echo $USER  
$ echo $SHELL  
$ echo $LOGNAME  
$ cd /home  
$ ls  
$ exit  
```
## S2/L14 (S2/D6)
```
in local shell:  
$ docker build -t img_expose .  
$ docker run -itd --rm --name cont_expose -p 8080:80 img_expose  
$ docker ps -a  

in web browser:  
http://localhost:8080  
```
## S2/L15 (S2/D7)
```
in local shell:  
$ docker build -t img_apache .  
$ docker run -itd --name cont_apache -p 8080:80 img_apache  

in web browser:  
http://localhost:8080  
```
## S3/L17
```
docker registry: https://hub.docker.com  
```
## S3/L18
```
in local shell:  
$ docker search python:3.6  
$ docker search registry  
$ docker search --filter "is-official=true" registry  
$ docker search --format "table {{.Name}}\t{{.Description}}\t{{.IsOfficial}}" registry  
$ docker image ls  
$ docker images  
$ docker images ubuntu  
$ docker images ubuntu:16.04  
$ docker images --no-trunc ubuntu:16.04  
$ docker image pull nginx:latest  
$ docker image pull nginx:alpine  
$ docker image pull --all-tags nginx  
$ docker login  
$ docker tag nginx:latest ceruleancanvas/repo-nginx:cc-nginx  
$ docker image push ceruleancanvas/repo-nginx:cc-nginx  
```
## S3/L19
```
in local shell:  
$ docker images ubuntu  
$ docker image inspect ubuntu:latest  
$ docker image inspect --format "{{.RepoTags}}: {{.RepoDigests}} " ubuntu:latest  
$ docker image inspect --format "{{json .Config}}" ubuntu > inspect_report_ubuntu.txt  
$ docker image history ubuntu  
$ docker image history img_apache  
```
## S3/L20
```
in local shell:  
$ docker images  
$ docker image rm nginx:1-alpune-perl  
$ docker rmi <image_id>  
$ docker rmi <image_id> --force  
```
## S3/L22
```
in local shell:  
$ docker container create -it --name cc-busybox-A busybox:latest  
$ docker ps -a  
$ docker container run -itd --rm --name cc-busybox-B busybox:latest  
```
## S3/L23
```
in local shell:  
$ docker container start cc-busybox-A  
$ docker ps -a  
$ docker container stop cc-busybox-B  
$ docker ps -a  
$ docker container restart --time 5 cc-busybox-A  
$ docker container rename cc-busybox-A my-busybox  
$ docker ps -a  
```
## S3/L24
```
in local shell:  
$ docker ps -a  
$ docker container attach my-busybox  

in container:  
$ ls  
$ exit  

in local shell:  
$ docker ps -a  
$ docker container start my-busybox  
$ docke exec -it my-busybox pwd  
$ docker ps -a  
```
## S3/L25
```
in local shell:  
$ docker container run -itd --name cont_nginx -p 8080:80/tcp img_expose  
$ docker ps -a  
$ docker container run -itd --name cont_nginx-A -P img_expose  
$ docker ps -a  
$ docker container port cont_nginx  
$ docker container port cont_nginx-A  

in web browser:  
http://localhost:8080  
http://localhost:<other_container's_dynamic_port>  
```
## S3/L26
```
in local shell:  
$ docker ps -a  
$ docker container rm cont_from  
$ docker ps -a  
$ docker  container rm <id1> <id2> <id3>  
$ docker ps -a  
$ docker container rm my-busybox --force  
$ docker ps -a  
$ docker container kill --signal=SIGTERM cont_nginx  
$ docker ps -a  
$ docker container prune  
$ docker ps -a  
```
## S4/L30
```
in local shell:  
$ docker network create --driver bridge my-bridge  
$ docker network create --driver bridge --subnet=192.168.0.0/16 --ip-range=192.168.5.0/24 my-bridge-1  
$ docker network ls  
$ docker network ls --filter driver=bridge  
```
## S4/L31
```
in local shell:  
$ docker ps -a  
$ docker start my-ubuntu  
$ docker network ls  
$ docker network connect my-bridge-1 my-ubuntu  
$ docker container inspect my-ubuntu  
$ docker container run -itd --network host --name cont_nginx nginx:latest  
$ docker container port cont_nginx  

in web browser:  
http://localhost:80  

in local shell:  
$ docker container inspect cont_nginx  
$ docker network inspect bridge  
$ docker network inspect my-bridge-1  
$ docker network inspect --format "{{.Scope}}" bridge  
$ docker network inspect --format "{{.ID}}: {{.Name}}" bridge  
$ docker ps-a  
$ docker network disconnect my-bridge-1 my-ubuntu  
$ docker network inspect my-bridge-1  
$ docker container inspect my-ubuntu  
```
## S5/L33
```
in local shell:  
$ docker volume create vol-busybox  
$ docker run -d --volume vol-ubuntu:/tmp ubuntu  
$ docker volume ls  
$ docker volume ls --filter "dangling=true"  
$ docker volume inspect vol-ubuntu  
$ docker volume rm vol-ubuntu  
$ docker ps -a  
$ docker container rm <container_name>  
$ docker volume rm vol-ubuntu  
$ docker volume ls  
```
## S5/L34
```
in local shell:  
$ docker run -itd --name cont-ubuntu --volume vol-ubuntu:/var/log ubuntu:latest  
$ docker volume ls  
$ docker ps -a  
$ docker container inspect --format "{{json .Mounts}}" cont-ubuntu | python -m json.tool  
$ docker exec -it cont_ubuntu bash  

in container:  
$ apt-get update  
$ cd /var/log  
$ ls  
$ exit  

in local shell:  
$ docker stop cont-ubuntu  
$ sudo su -  
$ cd /var/lib/docker/volumes  
$ ls  
$ cd vol-ubuntu  
$ ls  
$ cd _data  
$ ls  
```
## S6/L36
```
in local shell:  
$ sudo curl -L https://github.com/docker/compose/releases/dowload/1.22.0/docker/docker-compose-$(usnale -s)-$(uname -m) -o /usr/local/bin/docker-compose  
$ sudo chmod +x /usr/local/bin/docker-compose  
$ docker-compose --version  
```
## S6/L37 (S6)
```
in local shell:  
$ pwd  
$ ls  
$ nano docker-compose.yaml  
```
## S6/L38
```
in local shell:  
$ docker-compose up -d  
$ docker ps -a

in web browser:  
http://localhost:8000	# wordpress installation  

in local shell:  
$ docker ps -a  
$ docker exec -it mysql_database bash  

in container:  
$ ls  
$ cd /var/lib/mysql  
$ ls  

in local shell:  
$ docker network connect bridge mysql_database  
$ docker run -it --link mysql_database:mysql --rm mysql sh -c 'exec mysql -h"$MYSQL_PORT_3306_TCP_ADDR" -P"$MYSQL_PORT_3306_TCP_PORT" -uroot -p"$MYSQL_ENV_MYSQL_ROOT-PASSWORD"'  

in database manager:  
$ show databases;  
$ use wordpress;  
$ show tables;  
```
## S6/L39
```
in local shell:  
$ docker-compose config  
$ docker-compose config --services  
$ docker-compose images  
$ docker-compose logs  
$ docker-compose logs --tail=10  
$ docker-compose ps  
$ docker-compose top  
$ docker-compose down  
```
## S7/L42
```
in local shell:  
$ sudo nano /etc/apt/sources.list  

add two lines:  
deb https://download.virtualbox.org/virtualbox/debian xenial contrib  

in local shell:  
$ wget -q https://www.virtualbox.org/download/oracle_vbox_2016.asc -0- | sudo apt-key add -  
$ sudo apt-get update  
$ sudo apt-get install virtualbox-5.2  
```
## S7/L43
```
in local shell:  
$ base=https://github.com/docker/machine/releases/download/v0.15.0 && curl -L $base/docker-machine-$(uname -s)-$(uname -m) > /tmp/docker-machine && sudo install /tmp/docker-machine /usr/local/bin/docker-machine  
$ docker-machine version  
```
## S7/L44
```
in local shell:  
$ docker-machine create --driver virtualbox manager  
$ docker-machine ls  
$ docker-machine create --driver virtualbox worker-1  
$ docker-machine create --driver virtualbox worker-2  
$ docker-machine ls  
$ docker-machine stop manager  
$ docker-machine start manager  
$ docker-machine ip manager  
$ docker-machine ip worker-1  
$ docker-machine ip worker-2  
$ docker-machine inspect manager  
$ docker-machine ssh manager  
```
## S7/L45
```
in local shell:  
$ docker machine-ls  
$ docker-machine ssh manager  
$ docker swarm init --advertise-adr 192.168.99.100  

in docker manager shell:  
$ docker swarm join-token worker  

in docker worker-1:  
$ docker-machine ssh worker-1  
$ docker swarm join --token <token> <ip>:<port>  

in docker worker-2:  
$ docker-machine ssh worker-2  
$ docker swarm join --token <token> <ip>:<port>  
```
## S7/L46
```
in docker manager shell:  
$ docker node ls  
$ docker node inspect --pretty self  
$ docker node inspect --pretty worker-1  
$ docker node inspect --pretty worker-2  
```
## S7/L47
```
in docker manager shell:  
$ docker service create --name web-server -p 8080:80 --replicas 3 nginx:latest  
$ docker service ls  
$ docker service ps web-server  
$ docker service inspect web-server  
$ docker ps -a  

in docker worker-1:  
$ docker ps -a  

in docker worker-2:  
$ docker ps -a  

in web browser:
http://<manager's_ip_address>:8080  
http://<worker-1's_ip_address>:8080  
http://<worker-2's_ip_address>:8080  
```
## S7/L48
```
in docker manager shell:  
$ docker node update --availability drain worker-2  
$ docker node ls  
$ docker service ps web-server  

in docker worker-2:  
$ docker ps -a  

in docker manager shell:  
$ docker node rm worker-2  

in docker worker-2:  
$ docker swarm leave  

in docker manager shell:  
$ docker node rm worker-2  
$ docker node ls  
```
## S7/L49
```
in docker manager shell:  
$ docker service scale web-server=6  
$ docker service ps web-server  
$ docker ps -a  

in docker worker-1:  
$ docker ps -a  

in docker manager shell:  
$ docker service update --image nginx:alpine web-server  
$ docker service inspect --pretty web-server  
$ docker service rm web-server  
$ docker ps -a  

in docker worker-1:  
$ docker ps -a  

in docker manager shell:  
$ docker ps -a  

in docker worker-1:  
$ docker swarm leave  
```

