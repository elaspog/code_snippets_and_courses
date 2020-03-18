
# Cheatsheet

## Stop and Remove all Docker containers

```
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```
