
# Tutorial

https://www.udemy.com/docker-and-kubernetes-the-complete-guide

## S1/L4 Installing Docker on MacOS

```
docker version
```

## S1/L5 Installing Docker for Windows Home users

Windows Home users will need to install Docker Toolbox which uses VirtualBox.  
https://docs.docker.com/toolbox/toolbox_install_windows/

A major difference between the course lecture using Docker Desktop vs. Docker Toolbox is that you will not be able to use localhost anymore.

Instead, you will need to access your machine with the IP address 192.168.99.100

## S1/L6-8 Installing Docker for Windows - Professional and Enterprise Editions

```
docker version
```

## S1/L9 Installing Docker on Linux

https://docs.docker.com/install/

Installation  
https://docs.docker.com/install/linux/docker-ce/ubuntu/#set-up-the-repository

```
sudo docker run hello-world
```

Installing Docker Compose  
https://docs.docker.com/compose/install/#install-compose

```
sudo docker-compose -v
```

Run without Sudo  
https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user

Start on Boot  
https://docs.docker.com/install/linux/linux-postinstall/#configure-docker-to-start-on-boot  

## S1/L10 Using the Docker Client

```
docker version
sudo docker run hello-world
```

## S1/L11 But Really...What's a Container?

* namespaces
	* isolates resources per process (or group of processes)
* control groups (cgroups)
	* limit amount of resources used per process

namespace + cgroup => isolates a single process and it's resources => container

* container
	* running process
	* kernel
	* hard drive, network, RAM, CPU
* image
	* file system snapshot
		* directories, files
	* startup command

## S1/L12 How's Docker Running on Your Computer?

namespaces and cgroups are Linux speific features
on Winqows or MacOS a Linux Virtual Machine with it's Linux Kernel is running

```
docker version
```

## S2/L13 Docker Run in Detail

in local shell:

```
// docker run <image-name>
docker run hello-world
```

## S2/L14 Overriding Default Commands

```
// docker run <image-name> <override-default-command>

// programs exist in container's file system
docker run busybox echo hi there
docker run busybox echo by there
docker run busybox ls

// programs do not exists in container's file system
docker run hello-world echo hi there
docker run hello-world echo hi there
docker run hello-world ls
```

## S2/L15 Listing Running Containers

in local shell:

```
docker ps
docker run busybox echo hi there
docker run ping google.com
```

in another local shell:

```
docker ps
docker ps --all
```

## S2/L16 Container Lifecycle

```
docker run <image-name>

docker create <image-name>
docker start <container-id>
```

docker run = docker create + docker start

```
// outputs an id
docker create hello-world

// just starts the container
docker start <id>

// attach to container by id (print output etc.)
docker start -a <id>
```

## S2/L17 Restarting Stopped Containers 

```
docker ps --all
docker run busybox echo hi there
docker ps --all
docker start <container-id>
docker start -a <container-id>

// the default command can not be replaced in a restarted container once it was executed
docker start -a <container-id> echo hi there	// ERROR
```

## S2/L18 Removing Stopped Containers

```
docker ps --all
docker system prune
docker ps --all
```

## S2/L19 Retrieving Log Outputs 

if restarting the container is time/resource consuming:

```
docker create busybox echo hi there
docker start <container-id>	// accidental error (no visible output)
docker start -a <container-id>

docker create busybox echo hi there
docker start <container-id>
docker logs <container-id>	// does not restarts the container
```

## S2/L20 Stopping Containers

* SIGTERM (waits 10 seconds, fallback to SIGKILL)
* SIGKILL

```
docker create busybox ping google.com	// outputs container id
docker logs <container-id>
docker ps

// docker stop <container-id>
// docker kill <container-id>

docker stop <container-id>	// fallback to SIGKILL
docker start <container-id>
docker kill <container-id>	// instant kill
```

## S2/L21 Multi-Command Containers

in local shell:

```
redis-server
```

in another local shell:

```
redis-cli
> set mynumber 5
> get mynumber
```

in local shell:

```
docker run redis
```

## S2/L22 Executing Commands in Running Containers

* Redis server was started in container (previous lecture)
* Start up the Redis CLI in the same container

Execute additional command inside a container

```
docker ps

// docker exec -it <container-id> <command>
// -it provides input to the container, ability to enter text

docker exec -it <container-id> redis-cli
> set myvalue 5
> get myvalue 5

docker exec <container-id> redis-cli
```

## S2/L23 The Purpose of the IT Flag

```
docker exec -it <container-id> redis-cli
```

communication channels of processes:

* STDIN
* STDOUT
* STDERR

```
// docker exec -i -t <container-id> <command>

docker exec -i <container-id> redis-cli
// no autoformat/autocomplete etc.
```

## S2/L24 Getting a Command Prompt in a Container

Exit from container:

* CTRL+C
* CRTL+D

Command processors:

* bash
* powershell
* zsh
* sh

```
docker ps
docker exec -it <container-id> sh
# cd ~/
# ls
# cd /
# ls
# echo hi there
# export b=5
# echo $b
# redis-cli
> set myvalue 5
```

## S2/L25 Starting with a Shell

* keeps any default command form running
* any other process is not running

```
// docker exec -it <container-id> <command>
// docker run -it <container-id> <command>

docker run -it bosybox sh
# ls
# ping google.com
```

## S2/L26 Container Isolation

there is no data sharing between containers by default

Exit from command processor:

* CTRL+C
* CRTL+D
* `exit` command


in local shell 1:

```
docker run -it bosybox sh
```

in local shell 2:

```
docker run -it bosybox sh
```

in local shell 3:

```
docker ps
```

in local shell 1:

```
# touch hithere
# ls
```

in local shell 2:

```
# ls	// there is no file named 'hithere'
```

