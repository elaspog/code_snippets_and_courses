
# How to configure Docker Swarm

https://upcloud.com/community/tutorials/how-to-configure-docker-swarm/

**Vagrantfile**

## Deploy your cloud servers

* Example setup:
  * manager1 - primary manager
  * manager2 - backup manager
  * consul - consul server
  * node1 - compute node
  * node2 - compute node
* It is possible to run a simpler Docker Swarm on a group of three instances
  * a single manager with consul on the same host
  * two separate worker nodes like in the first example

Note: CentOS and other Red Hat variants might require additional steps to allow the Swarm to communicate because of their stricter default firewall rules

## Install Docker Engine on each server

```
# Debian and Ubuntu
sudo apt-get install curl -y

# CentOS
sudo yum install curl -y

curl -sSL https://get.docker.com/ | sh

# after the installation finishes, Docker usually starts up on its own, but for the next part to work it need to be stopped
sudo service docker stop

# run the daemon
sudo nohup docker daemon -H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock &

# test that the daemon is accepting commands
sudo docker info

# add username to the Docker users group
sudo usermod -aG docker <username>

# sign out of the server and then back in again to have the group policy changes take effect
```

## Configure a discovery back-end

The **consul**, which works as the **discovery back-end** is for the Swarm managers to know which nodes in the cluster are accessible. The consul usually runs on its own host, but optionally can be installed directly on primary Swarm manager.

```
docker run -d -p 8500:8500 --name=consul progrium/consul -server -bootstrap
```

The consul service maintains a list of IP addresses in Swarm cluster. Node IPs do not need to be publicly available, and it is recommended to use the private addresses assigned to servers to create a secure cluster.

## Create a Swarm Cluster

The easiest way to set up a Docker Swarm installation is to use the official images.

```
# managers
docker run -d -p <manager1 IP>:4000:4000 swarm manage -H :4000 --replication --advertise <manager1 IP>:4000 consul://<consul IP>:8500
docker run -d -p <manager2 IP>:4000:4000 swarm manage -H :4000 --replication --advertise <manager2 IP>:4000 consul://<consul IP>:8500

# compute nodes
docker run -d swarm join --advertise=<node IP>:2375 consul://<consul IP>:8500
```

Note that if CentOS or any other OS with a similarly restrictive firewall is used, the port numbers listed in each command need to be added to firewalls to allow the Swarm nodes to communicate.

## Running the Swarm

The host need to defined to run the command on to reach the Swarm container. The Docker Swarm manager, when configured as above, allows executing commands from any host with Docker installed that has access to the manager host.

```
docker -H <manager1 IP>:4000 info
```
If the nodes are listed as (unknown), the consul is unable to communicate with them. In this case, check your firewall rules that the consul has access to the nodes and that the managers can interact with it.

```
docker -H <manager1 IP>:4000 run hello-world

docker -H <manager1 IP>:4000 ps -a
```

## Test Swarm fail-over

```
docker -H <manager1 IP>:4000 info
docker -H <manager2 IP>:4000 info

# test with shutting down manager1
docker stop <swarm manager name>

# the replica manager will take the lead in becoming the new primary
docker -H <manager2 IP>:4000 info

docker start <swarm manager name>
# becomes the new replica
```

## Conclusions

* Docker boasts results of up to a thousand nodes and fifty thousand containers with no performance degradation
* New nodes are added to the cluster through the discovery back-end like the **consul**, but other options are also available such as **etcd** and **zookeeper** as well as a **static node list files**
