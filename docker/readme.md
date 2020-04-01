
# Cheatsheet

## Docker simple commands

```
docker ps
docker cp script.sh <container_name>:/tmp/script.sh
```

## Stop and Remove all Docker containers

```
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

## Docker Compose

```
docker-compose build
docker-compose up --build
docker-compose up
docker-compose up -d
docker-compose up --detach
docker-compose start
docker-compose stop
docker-compose restart <service>
docker-compose down
# deletes everything but the volumes
docker-compose ps
```
