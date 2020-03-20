
# Docker Swarm Multi-Manager Setup

https://www.tothenew.com/blog/docker-swarm-multi-manager-setup/

## Configure Consul

```
docker-machine ls
# to check the current state and details of machines

docker-machine create -d=virtualbox consul-machine
# -d means driver for docker-machine, you can even use --driver virtualbox
```
Creates virtual machine with settings in: `~/.docker/machine/machines/consul-machine`
```
# docker-machine ssh <machine-name>
docker-machine ssh consul-machine
```

on virtual machine:
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version
```
inside the virtual machine create a `docker-compose.yml` file with content:
```
myconsul:
  image: progrium/consul
  restart: always
  hostname: consul
  ports:
    - 8500:8500
  command: "-server -bootstrap"
```

```
docker-compose up -d
# if the filename of the compose file is docker-compose.yml else pass the filename explicitly using -f switch

docker ps
netstat -ntlp
```

## Configure Managers for Docker Swarm

get the IP of the `consul-machine`
```
docker-machine env consul-machine
# CONSUL_IP_ADDRESS
```

create managers using virtualbox driver on the host machine:
```
docker-machine create -d virtualbox --swarm \
  --swarm-master \
  --swarm-opt replication \
  --swarm-discovery consul://<CONSUL_IP_ADDRESS>:8500 \
  --engine-opt cluster-store=consul://<CONSUL_IP_ADDRESS>:8500 \
  manager-0

docker-machine create -d virtualbox --swarm \
  --swarm-master \
  --swarm-opt replication \
  --swarm-discovery consul://<CONSUL_IP_ADDRESS>:8500 \
  --engine-opt cluster-store=consul://<CONSUL_IP_ADDRESS>:8500 \
  manager-1
```

```
# print manager-0 settings
docker-machine env manager-0

# apply manager settings
eval $(docker-machine env manager-0)

# list running containers on manager-0
docker ps
```

## Bringing up the nodes

similar to using the above command without the **–swarm-master**

get the IP of the `consul-machine`
```
docker-machine env consul-machine
# CONSUL_IP_ADDRESS
```

```
docker-machine create -d virtualbox --swarm \
  --swarm-discovery consul://<CONSUL_IP_ADDRESS>:8500 \
  --engine-opt cluster-store=consul://<CONSUL_IP_ADDRESS>:8500 \
  node-1

docker-machine create -d virtualbox --swarm \
  --swarm-discovery consul://<CONSUL_IP_ADDRESS>:8500 \
  --engine-opt cluster-store=consul://<CONSUL_IP_ADDRESS>:8500 \
  node-2
```

## Connect to the Docker Swarm manager’s engine

```
eval $(docker-machine env --swarm manager-0)

docker ps
docker ps -a

docker run -itd --name ubuntu1 ubuntu

docker ps
```

To work inside the containers do any of the followings:
* login to the nodes
* from the manager run `docker exec -it <container-name> bash` (bash or any other command)

Other features:
* launch a container on a node with a specific name
* where similar types of container are running use **label** and **affinity**

## Test fault tolerance

```
eval $(docker-machine env --swarm manager-0)
docker info
# check primary

eval $(docker-machine env --swarm manager-1)
docker info
# check replica

docker-machine stop manager-0
eval $(docker-machine env --swarm manager-1)
docker info
# check primary
```
