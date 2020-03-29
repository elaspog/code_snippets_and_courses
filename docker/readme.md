
# Cheatsheet

## Stop and Remove all Docker containers

```
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

## Docker Compose

```
docker-compose up
docker-compose up -d
docker-compose start
docker-compose stop
docker-compose restart <service>
docker-compose down
# deletes everything but the volumes

docker ps
```
