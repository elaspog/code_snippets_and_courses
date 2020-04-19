
# Cheatsheet

## Get info

```
docker system info
```

## Stop and Remove all Docker containers

```
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

## TimeZone settings

`Dockerfile`:
```
ENV TZ=Europe/Budapest
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
```
- Set's the timezone in the container
