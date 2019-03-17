
# Tutorial

https://www.udemy.com/containers-101/

## S1/L1

* search/pull/run/commit/tag/push container/image
* generate NodeJS express application

in local shell:

```
$ boot2docker version
$ boot2docker status
$ docker images
$ docker search ubuntu
$ docker search -s 1000
$ docker run -i -t ubuntu ./bin/bash
```

in docker container:

```
$ ls
$ vi installnode.sh

```

into the file:

```
apt-get update
apt-get install --yes nodejs
apt-get install --yes nodejs-legacy
apt-get install --yes nodejs-npm

```

in docker container:

```
$ bash installnode.sh
$ node -v
$ exit
```

in local shell:

```
$ docker images
$ docker ps
$ docker run -d --name=my_container ubuntu sleep 15
$ docker ps
$ docker ps -a
$ docker commit -a razielt <id_of_Container> ubuntu-node:0.1
$ docker images
$ npm install -g express-generator
$ express my_microservice
$ cd my_microservice
$ ls
```

edit routes/api.js  
edit app.js  

in local shell:

```
$ npm install
$ npm start
```

in web browser:

```
http://localhost:3000/api/sayhello
```

in local shell:

```
$ docker images
$ docker run -it -v /Users/RazelMac/meetup/my_microservice:/host -p 9000:3000 ubuntu-node:0.1 ./bin/bash
```

in docker container:

```
$ ls
$ cp -r /host /microservice
$ cd /microservice
$ npm start
$ exit
```

in local shell:

```
$ docker ps -a
$ docker commit -a razielt <container_id> node-microservice:0.1
$ docker run -d -w /microservice -p 9000:3000 node-microservice:0.1 npm start
$ docker ps
$ docker attach <container_id>
$ docker login
$ docker images
$ docker tag node-microservice:0.1 node-microservice:latest
$ docker images
$ docker tag node-microservice razielt/node-microservice
$ docker images
$ docker push razielt/node-microservice
```

## S1/L2

* optimal Dockerfile
* save/load image (move between machines)

in local shell:

```
$ docker -v
$ docker-machine ls
$ docker images
$ vi Dockerfile
```

edit Dockerfile (edit 1)

in local shell:

```
$ docker build -t nodejs:0.1 .
$ docker images
$ docker run nodejs:0.1 node -v
$ docker images -a
$ docker history nodejs:0.1
```

edit Dockerfile (edit 2)

in local shell:

```
$ docker build -t nodejs:0.2 .
$ express my-microservice
$ mv Dockerfile my-microserice/
$ cd my-microservice
```

edit Dockerfile (edit 3)

in local shell:

```
$ docker build -t my-microservice:0.1 .
$ docker images
$ touch test.txt
$ docker build -t my-microservice:0.2 .
```

edit Dockerfile (edit 4)

in local shell:

```
$ docker build -t my-microservice:0.3 .
$ touch test1.txt
$ docker build -t my-microservice:0.4 .
```

edit Dockerfile (edit 5)

in local shell:

```
$ docker build -t my-microservice:0.5 .
$ docker images
$ docker run -d -p 3000:3000 my-microservice:0.5
$ docker ps
$ docker-machine ip meetup
```

in web browser:

```
http://<ip_address>:3000
```

in local shell:

```
$ docker-machine ls
$ docker-machine create -d -help | grep digitalocean
$ docker-machine create -d -help | grep google
$ docker images
$ docker pull hello-world:latest
$ docker images
$ docker save -o hello.tar hello-world:latest
$ eval "$(docker-machine env digitalocean)"
$ docker-machine ls
$ docker load -i hello.tar
$ docker images
$ docker run -d -p 3000:3000 my-micro:0.4
$ docker ps
$ docker-machine ip digitalocean
```

in web browser:

```
http://<ip_address>:3000
```

## S1/L3

* onbuild triggers
* compose

in local shell:

```
$ docker --version
$ docker-machine ls
$ docker images
$ docker run nodejs-base:0.1 node -v
$ ls
$ vi Dockerfile
$ docker build -t nodejs-base:0.2 .
$ express microservice
$ cd microservice
$ vi Dockerfile
```

edit Dockerfile

in local shell:

```
$ docker build -t microservice:0.1 .
$ docker run -d -p 3000:3000 microservice:0.1
$ docker ps
$ docker-machine ip meetup
```

in web browser:

```
http://<ip_address>:3000
```

https://github.com/Codefresh-Examples/express-angular-mongo

in local shell:

```
$ cd ..
$ docker ps
$ docker stop <container_id>
$ git clone https://github.com/Codefresh-Examples/express-angular-mongo.git
$ cd express-angular-mongo
$ vi Dockerfile
$ docker build -t web:0.1 .
$ docker images
$ docker run -d -p 27017:27017 mongo:latest
$ docker ps
```

check GitHub: express-angular-mongo/config/database.js


in local shell:

```
$ docker-machine ip meetup
$ docker run -it -p 9000:9000 -e "MONGO_URI=mongodb://<ip_address>:27017/test" web:0.1
```

in local shell:

```
$ docker ps
$ docker stop <container_id>
$ docker ps
$ vi docker-compose.yml
```

edit docker-compose.yml

in local shell:

```
$ docker-compose up
```

## S1/L4

* compose v2
  * default name
    * directory vs build + image
  * networking
  * volumes

https://www.github.com/containers101/demochat

in local shell:

```
$ git clone https://github.com/containers101/demochat.git
$ cd demochat
$ vi docker-compose.yml
docker images
docker-compose up
docker-machine ip default
```

in web browser:

```
http://<ip_address>:5000
```

in local shell:

```
$ docker-compose stop
$ docker-compose rm
```

edit docker-compose.yml

in local shell:

```
$ docker-compose up
$ docker-compose stop
$ docker-compose rm
```

edit networking/docker-compose.yml

in local shell:

```
$ docker-compose up
$ docker ps
$ docker exec -it networking_service1_1 bash
```

in container:

```
$ ping service2 # ok
$ ping service3 # ok
$ exit
```

in local shell:

```
$ docker exec -it networking_service2_1 bash
```

in container:

```
$ ping service2 # ok
$ ping service3 # no
$ exit
```

edit volumes/docker-compose.yml

in local shell:

```
$ docker compose up
$ docker ps
$ docker exec -it volumes_service1_1 bash
```

in another local shell:

```
$ docker exec -it volumes_service2_1 bash
```

in container (volumes_service1_1):

```
$ ls
$ ls data
```

in container (volumes_service2_1):

```
$ ls
$ ls data
$ touch test
$ ls
```

in container (volumes_service1_1):

```
$ ls
$ ls data
```


# TODO
(continue)

## S2/L5

## S2/L6

## S2/L7

## S2/L8

## S2/L9


