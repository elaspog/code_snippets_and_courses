
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
docker run busybox echo bye there
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

## S3/L27 Creating Docker Images

Dockerfile

* base image
* run some commands to install additional programs
* specify a command to run on container startup

## S3/L28 Building a Dockerfile

```
cd redis-image
docker build .
docker run <image-id>
```

## S3/L29 Dockerfile Teardown

Instructions for Docker Server + Arguments:

```
FROM	alpine
RUN 	apk add --update redis
CMD 	["redis-server"]
```

## S3/L30 What's a Base Image?

* The __FROM__ command defines the base image (implicitly the operating system)  
alpine = operating system

Later operating system specific instructions are used.  
apk = preinstalled package manager

## S3/L31 The Build Process in Detail

* Temporary containers are created in each step of the build process. The temporary containers run the __RUN__ instructions of the Dockerfile as their primary running process, during the execution they modify their file system, then a snapshot is made from their file system, which defines the output image.
* The __CMD__ instruction of the Dockerfile sets the primary command/process of the container, does not execute it. This last image is used for starting the final container.

```
// docker build <build-context>
docker build .
```

## S3/L33 Rebuilds with Cache

During the build process:

* there is no image fetching from dockerhub
* reuses the already created cached/saved images

(example 1)

```
docker build .
docker build .
```

Until the series of steps is unchanged in the Dockerfile the Docker can reuse the images with the same history. When the order of the operations changes, new images should be  generated. That's why the new instructions need to be placed to the latest possible position in the Dockerfile to get the longest common history.

(example 2)

```
docker build .
```

## S3/L34 Tagging an Image

Technically only the `version` is the _tag_.

```
docker build .
docker run <image-id>	// hard to find

// docker build -t <docker-id>/<repo-or-project-name>:<version> <build-context>
```

The images with shorter names are community images (e.g.:):

* redis
* hello-world
* busybox

```
docker build -t stephengrinder/redis:latest .
docker run stephengrinder/redis
```

## S3/L35 Manual Image Generation with Docker Commit

* Image can be used to initiate containers.
* Container can be used to create new image.

in local shell 1:

```
docker run -it alpine sh
# apk add --update redis
```

in local shell 2:

```
docker ps
docker commit -c 'CMD["redis-server"]' <running-container-id>	// outputs image id
docker run <image-id>
```

## S4/L39 A Few Planned Errors

```
// npm install
// npm start
```

```
ls
docker build .	// ERROR: npm not found
```

## S4/L40 Base Image Issues

* find a different base image
	* with preinstalled `node` and `npm`
* continue using the previous image but configure

https://hub.docker.com/

`alpine` = term in docker world for image: _'small and compact as possible'_

```
docker build .	// ERROR: no parkage.json
```

## S4/L42 Copying Build Files

Dockerfile:

```
// COPY <from-local-file-system-path> <to-container-file-system-path>
```

where `from-local-file-system-path` is relative to build context

```
docker build .
docker build -t stephengrider/simpleweb .
docker run stephengrider/simpleweb
```

in web browser:

```
localhost:8080	// ERROR: the page is not loaded
```

## S4/L43 Container Port Mapping

* __incoming requests__: by default no traffic coming into the localhost network is routed into the container
	* container has isolated set of ports
	* to reach into the container need to he specified (by port mapping) explicitly
* __outgoing requests__: reach out from the container is not limited by default

```
// docker run -p 8080:8080 <image-id>
// docker run -p 8080:8080 <image-name>

docker run -p 8080:8080 stephengrider/simpleweb
```

in web browser:

```
localhost:8080	// OK
```

The localhost and container ports do not have to he identical:

```
docker run -p 5000:8080 stephengrider/simpleweb
```

## S4/L44 Specifying a Working Directory

```
docker run -it stephengrider/simpleweb sh
# ls	// NodeJS files are copied to '/' directory, might be in conflict
# exit
```

Dockerfile:

```
// WORKDIR <container-file-system-path>
```

Any following commands or instructions will be executed relative to the the defined folder.
Affects commands that are executed inside the container later on by `exec` command.

```
docker build -t stephengrider/simpleweb .
docker run -p 8080:8080 stephengrider/simpleweb
```

in another local shell:

```
docker ps	// outputs the container id
docker exec -ti <container-id> sh
/usr/app # ls	// enter to the directory defined by WORKDIR
/usr/app # cd /
# ls	// there are no conflicting files
```

## S4/L45 Unnecessary Rebuilds

```
docker run -p 8080:8080 stephengrider/simpleweb
```

The change made in `index.js` is not going to be automatically reflected inside the container. One option is to rebuild the container.

```
docker build -t stephengrider/simpleweb .	// Docker has detected the changes in the copied files
```

Therefore it executes every step after the command of the detected change.

## S4/L46 Minimizing Cache Busting and Rebuilds

Only `package.json` needs to be copied for `npm install`. The changed `index.js` can be copied by a latter `COPY` command to maximize the common layer history.

(example 2)

```
docker build -t stephengrider/simpleweb .
docker build -t stephengrider/simpleweb .	// uses cached version of every single step
```

(example 2)

```
docker build -t stephengrider/simpleweb .	// runs quickly
```

The order of `Dockerfile` commands make difference in build time.

