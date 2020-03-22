
# Tutorial

https://www.udemy.com/docker-and-kubernetes-the-complete-guide

## S01 Dive Into Docker!

### S01/L01 Finished Code Repositories and Diagrams

### S01/L02 Why Use Docker?

### S01/L03 What is Docker?

### S01/L04 Docker for Mac/Windows

### S01/L05 Installing Docker on MacOS

```
docker version
```

### S01/L06 Installing Docker for Windows Home users

Windows Home users will need to install Docker Toolbox which uses VirtualBox.  
https://docs.docker.com/toolbox/toolbox_install_windows/

A major difference between the course lecture using Docker Desktop vs. Docker Toolbox is that you will not be able to use localhost anymore.

Instead, you will need to access your machine with the IP address 192.168.99.100

### S01/L07 Windows 10 Pro and Enterprise Docker Desktop 2.2 Issues

### S01/L08-L10 Installing Docker for Windows - Professional and Enterprise Editions

```
docker version
```

### S01/L11 Installing Docker on Linux

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

### S01/L12 Using the Docker Client

```
docker version
sudo docker run hello-world
```

### S01/L13 But Really...What's a Container?

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

### S01/L14 How's Docker Running on Your Computer?

namespaces and cgroups are Linux speific features
on Winqows or MacOS a Linux Virtual Machine with it's Linux Kernel is running

```
docker version
```

## S02 Manipulating Containers with Docker Client

### S02/L15 Docker Run in Detail

in local terminal:

```
# docker run <image-name>
docker run hello-world
```

### S02/L16 Overriding Default Commands

```
# docker run <image-name> <override-default-command>
```
programs (echo, ls) exist in container's file system
```
docker run busybox echo hi there
docker run busybox echo bye there
docker run busybox ls
```
programs (echo, ls) do not exists in container's file system
```
docker run hello-world echo hi there
docker run hello-world echo bye there
docker run hello-world ls
```

### S02/L17 Listing Running Containers

in local terminal:

```
docker ps
docker run busybox echo hi there
docker run ping google.com
```

in another local terminal:

```
docker ps
docker ps --all
```

### S02/L18 Container Lifecycle

```
docker run <image-name>

docker create <image-name>
docker start <container-id>
```

**docker run = docker create + docker start**

outputs an id:
```
docker create hello-world
```
just starts the container
```
docker start <id>
```
attach to container by id (print output etc.:)
```
docker start -a <id>
```

### S02/L19 Restarting Stopped Containers

```
docker ps --all
docker run busybox echo hi there
docker ps --all
docker start <container-id>
docker start -a <container-id>
```
the default command can not be replaced in a restarted container once it was executed
```
docker start -a <container-id> echo hi there	# ERROR
```

### S02/L20 Removing Stopped Containers

```
docker ps --all
docker system prune
docker ps --all
```

### S02/L21 Retrieving Log Outputs

if restarting the container is time/resource consuming:

```
docker create busybox echo hi there
docker start <container-id>    # accidental error (no visible output)
docker start -a <container-id>

docker create busybox echo hi there
docker start <container-id>
docker logs <container-id>    # does not restarts the container
```

### S02/L22 Stopping Containers

* SIGTERM (waits 10 seconds, fallback to SIGKILL)
* SIGKILL

```
docker create busybox ping google.com    # outputs container id
docker start <container-id>
docker logs <container-id>
docker ps

# docker stop <container-id>
# docker kill <container-id>

docker stop <container-id>    # fallback to SIGKILL
docker start <container-id>
docker kill <container-id>    # instant kill
```

### S02/L23 Multi-Command Containers

in local terminal:

```
redis-server
```

in another local terminal:

```
redis-cli
> set mynumber 5
> get mynumber
```

in local terminal:

```
docker run redis
```

### S02/L24 Executing Commands in Running Containers

* Redis server was started in container (previous lecture)
* Start up the Redis CLI in the same container

Execute additional command inside a container

```
docker ps

# docker exec -it <container-id> <command>
# -it provides input to the container, ability to enter text

docker exec -it <container-id> redis-cli
> set myvalue 5
> get myvalue 5

docker exec <container-id> redis-cli
```

### S02/L25 The Purpose of the IT Flag

```
docker exec -it <container-id> redis-cli
```

communication channels of processes:

* STDIN
* STDOUT
* STDERR

```
# docker exec -i -t <container-id> <command>

docker exec -i <container-id> redis-cli
# no autoformat/autocomplete etc.
```

### S02/L26 Getting a Command Prompt in a Container

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
> CTRL+D
```

### S02/L27 Starting with a Shell

* keeps any default command form running
* any other process is not running

```
# docker exec -it <container-id> <command>
# docker run -it <container-id> <command>

docker run -it bosybox sh
# ls
# ping google.com
```

### S02/L28 Container Isolation

there is no data sharing between containers by default

Exit from command processor:

* CTRL+C
* CRTL+D
* `exit` command


in local terminal 1:

```
docker run -it bosybox sh
```

in local terminal 2:

```
docker run -it bosybox sh
```

in local terminal 3:

```
docker ps
```

in local terminal 1:

```
# touch hithere
# ls
```

in local terminal 2:

```
# ls	# there is no file named 'hithere'
```

## S03 Building Custom Images Through Docker Server

### S03/L29 Creating Docker Images

Dockerfile

* base image
* run some commands to install additional programs
* specify a command to run on container startup

### S03/L30 Building a Dockerfile

**Dockerfile**

```
cd redis-image
docker build .
docker run <image-id>
```

### S03/L31 Dockerfile Teardown

Instructions for Docker Server + Arguments:

```
FROM	alpine
RUN 	apk add --update redis
CMD 	["redis-server"]
```

### S03/L32 What's a Base Image?

* The __FROM__ command defines the base image (implicitly the operating system)  
alpine = operating system

Later operating system specific instructions are used.  
apk = preinstalled package manager

### S03/L33 The Build Process in Detail

* Temporary containers are created in each step of the build process. The temporary containers run the __RUN__ instructions of the Dockerfile as their primary running process, during the execution they modify their file system, then a snapshot is made from their file system, which defines the output image.
* The __CMD__ instruction of the Dockerfile sets the primary command/process of the container, does not execute it. This last image is used for starting the final container.

```
# docker build <build-context>
docker build .
```

### S03/L34 A Brief Recap

### S03/L35 Rebuilds with Cache

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

### S03/L36 Tagging an Image

Technically only the `version` is the _tag_.

```
docker build .
docker run <image-id>	# hard to find

# docker build -t <docker-id>/<repo-or-project-name>:<version> <build-context>
```

The images with shorter names are community images (e.g.:):

* redis
* hello-world
* busybox

```
docker build -t stephengrinder/redis:latest .
docker run stephengrinder/redis
```

### S03/L37 Manual Image Generation with Docker Commit

**Dockerfile**

* Image can be used to initiate containers.
* Container can be used to create new image.

in local terminal 1:

```
docker run -it alpine sh
# apk add --update redis
```

in local terminal 2:

```
docker ps
docker commit -c 'CMD["redis-server"]' <running-container-id>	# outputs image id
docker run <image-id>
```

## S04 Making Real Projects with Docker

### S04/L38 Project Outline

### S04/L39 Node Server Setup

**package.json**, **index.js**

```
mkdir simpleweb
cd simpleweb
code .
```

### S04/L40 A Few Planned Errors

**Dockerfile**

```
# npm install
# npm start
```

```
ls
docker build .	# ERROR: npm not found
```

### S04/L41 Base Image Issues

**package.json**, **index.js**, **Dockerfile**

* find a different base image
	* with preinstalled `node` and `npm`
* continue using the previous image but configure

https://hub.docker.com/

`alpine` = term in docker world for image: _'small and compact as possible'_

```
docker build .	# ERROR: no parkage.json
```

### S04/L42 A Few Missing Files

### S04/L43 Copying Build Files

**package.json**, **index.js**, **Dockerfile**

Dockerfile:

```
# COPY <from-local-file-system-path> <to-container-file-system-path>
```

where `from-local-file-system-path` is relative to build context

```
docker build .
docker build -t stephengrider/simpleweb .
docker run stephengrider/simpleweb
```

in web browser:

```
localhost:8080	# ERROR: the page is not loaded
```

### S04/L44 Container Port Mapping

* __incoming requests__: by default no traffic coming into the localhost network is routed into the container
	* container has isolated set of ports
	* to reach into the container need to he specified (by port mapping) explicitly
* __outgoing requests__: reach out from the container is not limited by default

```
# docker run -p 8080:8080 <image-id>
# docker run -p 8080:8080 <image-name>

docker run -p 8080:8080 stephengrider/simpleweb
```

in web browser:

```
localhost:8080	# OK
```

The localhost and container ports do not have to he identical:

```
docker run -p 5000:8080 stephengrider/simpleweb
```

### S04/L45 Specifying a Working Directory

**package.json**, **index.js**, **Dockerfile**

```
docker run -it stephengrider/simpleweb sh
# ls	# NodeJS files are copied to '/' directory, might be in conflict
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

in another local terminal:

```
docker ps	# outputs the container id
docker exec -ti <container-id> sh
/usr/app # ls	# enter to the directory defined by WORKDIR
/usr/app # cd /
# ls	# there are no conflicting files
```

### S04/L46 Unnecessary Rebuilds

**package.json**, **index.js**, **Dockerfile**

```
docker run -p 8080:8080 stephengrider/simpleweb
```

The change made in `index.js` is not going to be automatically reflected inside the container. One option is to rebuild the container.

```
docker build -t stephengrider/simpleweb .	# Docker has detected the changes in the copied files
```

Therefore it executes every step after the command of the detected change.

### S04/L47 Minimizing Cache Busting and Rebuilds

**package.json**, **index.js**, **Dockerfile**

Only `package.json` needs to be copied for `npm install`. The changed `index.js` can be copied by a latter `COPY` command to maximize the common layer history.

(example 2)

```
docker build -t stephengrider/simpleweb .
docker build -t stephengrider/simpleweb .	# uses cached version of every single step
```

(example 2)

```
docker build -t stephengrider/simpleweb .	# runs quickly
```

The order of `Dockerfile` commands make difference in build time.

### S04/L48 Completed Code for Section 4

## S05 Docker Compose with Multiple Local Container

### S05/L49 App Overview

### S05/L50 App Server Code

**package.json**, **index.js**

### S05/L51 Assembling a Dockerfile

**Dockerfile**

```
docker build .
docker build -t stephengrider/visits:latest .
```

### S05/L52 Introducing Docker Compose

```
docker run stephengrider/visits    # ERROR: can't connect to redis server
docker run redis    # start a redis server
```

The containers are isolated processes don't have any communication.

```
docker run stephengrider/visits    # ERROR: can't connect to redis server
```

Networking infrastructure needs to be set:

* use Docker CLI's network features
* use Docker Compose

```
docker-compose
```

### S05/L53 Docker Compose Files

**package.json**, **index.js**, **Dockerfile**, **docker-compose.yml**

docker-compose.yml

```
# docker build -t stephengrider/visits:latest
# docker run -p 8080:8080 stephengrider/visits
```

* __version__ specifies file format
* __services__ is the type of a container
* __image__ use a predefined service/container
* __build__ use the Dockerfile to build an image
* __ports__ array of port mappings

### S05/L54 Networking with Docker Compose

**package.json**, **index.js**, **Dockerfile**, **docker-compose.yml**

Docker Compose automatically creates the containers on the same network.  
The `ports` declaration in `docker-compose.yml` file is to open up access to container from local machine.

index.js:

* if not using Docker:

```
redis.createClient({
  host: 'https://my-redis-server.com'
}
```

* if using Docker (where `redis-server` is referring to the name given in `docker-compose.yml` file):

```
redis.createClient({
  host: 'redis-server'
}
```

default redis port number: 6379

### S05/L55 Docker Compose Commands

**package.json**, **index.js**, **Dockerfile**, **docker-compose.yml**

```
docker-compose up
```

```
localhost:4001
```

Starts the image with an optional build:

```
# docker-compose up
# similar to
# docker run myimage
```

Starts the image with a necessary rebuild:

```
# docker-compose up --build
# similar to
# docker build .
# docker run myimage
```

### S05/L56 Stopping Docker Compose Containers

```
docker run -d redis
docker ps
docker stop <container-id>
```

```
docker-compose up -d
docker-compose down
docker ps
```

### S05/L57 Container Maintenance with Compose

**package.json**, **index.js**, **Dockerfile**, **docker-compose.yml**

```
docker-compose up --build
```

in another terminal:

```
docker ps	# there is just one running container
```

### S05/L58 Automatic Container Restarts

**package.json**, **index.js**, **Dockerfile**, **docker-compose.yml**

Exit status codes:

* __0__ = everything is OK
* __1,2,3,...__ = something went wrong

Restart policies:

* __"no"__ or __'no'__ = never attempts to restart the container
	* quotes need to be used because of the YAML syntax
* __always__ = always attempts to restart
* __on-failure__ = only restarts if the container stops with an error code
* __unless-stopped__ = always restarts unless it's forcibly stopped

(example 1)

```
# index.js: process.exit(0);
# docker-compose.yml: restart: always
```

```
docker-compose up
```

__WARNING__: Docker can decide to restart or reuse the container. If reuses it, the STDOUT log will show all the previous messages.

(example 2)

```
# index.js: process.exit(0);
# docker-compose.yml: restart: on-failure
```

Due to the value of the exit code the container will not be restarted.

### S05/L59 Container Status with Docker Compose

in local terminal 1:

```
docker run redis
```

in local terminal 2:

```
docker ps
```

in local terminal 1:

```
CTRL+C
docker-compose up
```

in local terminal 2:

```
docker-compose ps    # looks for docker-compose.yaml
cd ..
docker-compose ps    # ERROR
cd visits
```

## S06 Creating a Production-Grade Workflow

### S06/L61-L63 Development Workflow + Flow Specifics + Docker's Purpose

* Workflow:
	* Development -> Testing -> Deployment
	* DEV -> TEST -> PROD
* GitHub repository
	* branches: feature -> master
		* pull request
* Travis CI
* AWS Elastic Beanstalk

### S06/L64 Project Generation

```
node -v
```

### S06/L65 npx Create React App Generation

From **npm@5.2.0** this is now the recommended way to generate an app with Create React App.

Instead of:
```
npm install -g create-react-app
create-react-app frontend
```
Run this:
```
npx create-react-app frontend
```

### S06/L66 More on Project Generation

**...**

* ReactJS with NodeJS

```
npm install -g create-react-app
create-react-app frontend
```

### S06/L67 Necessary Commands

`npm run test`	: runs tests associated to the project  
`npm run build` : builds a production version of the application  
`npm run start` : starts up a deveopment server (development use only)  

```
npm run test
npm run build
ls
ls build
ls build/static
ls build/static/js
npm run start
```

### S06/L68 Creating the Dev Dockerfile

**Dockerfile.dev**

```
docker build .	# ERROR: the 'Dockerfile' is not existing in the directory
docker build -f Dockerfile.dev .    # OK
```

### S06/L69 Duplicating Dependencies

The __node_modules__ directory maked the context sent to Docker daemon very large.
Possible solution is to delete this directory.

### S06/L70 Starting the Container

```
docker run <image-id>
docker run -p 3000:3000 <image-id>
```

If a source file (e.g. `src/App.js`) is changed, the changes are not reflected to the docker container or application automatically.

Possible solutions:

* rebuild the image
	* it's very time consuming to rebuild the image each time when source code changes
* using volumes

### S06/L71 Quick Note for Windows Users

**.env**

Create-React-App has some issues detecting when files get changed on Windows based machines.

https://facebook.github.io/create-react-app/docs/troubleshooting#npm-start-doesn-t-detect-changes

### S06/L72 Docker Volumes

**...**

```
# docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app <image-id>
docker build -f Dockerfile.dev .
docker run -p 3000:3000 -v $(pwd):/app <image-id>	# the application does not start correctly
```

__Warning__ : the `$(pwd)` command is not working properly in Windows based terminals

### S06/L73 Windows 10 Pro and Enterprise Docker Desktop v2.2 Issues

### S06/L74 Windows Home - ENOENT: no such file or directory, open '/app/package.json'

```
docker-compose down
docker-compose up --build
```

### S06/L75 Bookmarking Volumes - Specific Commands for Windows

```
# Windows
docker run -p 3000:3000 -v /app/node_modules -v pwd:/app CONTAINER_ID

# Windows 10 Pro w/ Docker Desktop
docker run -p 3000:3000 -v /app/node_modules -v ${pwd}:/app CONTAINER_ID
```

### S06/L76 Bookmarking Volumes

**...**

__-v &lt;local-folder-path&gt;:&lt;container-folder-path&gt;__ = maps folders  
__-v &lt;placeholder-in-container&gt;__ = booksmarks the folder inside the container, prevents from mounting

```
docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app <image-id>
```

__Warning__ : the `$(pwd)` command is not working properly in Windows based terminals

After using the mounted source code, the effect of a change is immediate.
After a change in src/App.js in local folder, in browser:

```
localhost:3000
```

### S06/L77 Shorthand with Docker Compose

**docker-compose.yml**

```
docker-compose up    # ERROR: the Dockerfile can't be found
```

### S06/L78 Overriding Dockerfile Selection

**docker-compose.yml**, **Dockerfile.dev**

in docker-compose.yml:

```
...
    build:
      context: .
      dockerfile: Dockerfile.dev
...
```

in local terminal:

```
docker-compose up    # OK
```

### S06/L79 Do We Need Copy?

### S06/L80 Executing Tests

Travis CI - Continuous Integration service

```
docker build -f Dockerfile.dev .
docker run <container-id> npm run test    # overrides the existing command 'npm run start' but the test can't accept input
docker run -it <container-id> npm run test    # OK
...
CTRL+C
```

### S06/L81 Live Updating Tests

After modifying the `src/App.test.js` file, the tests were not rerun. A container has been created specifically to run the tests. The temporary container does not have the volumes set up. Without the volumes set up the outdated files are used inside the container.

Possible solutions:

* Create a new service in `docker-compose.yml`, set up the volumes. The entire purpose of that service is to run the test suite.
* Reuse the existing container

in local terminal 1:

```
docker-compose up
```

in local terminal 2:

```
docker ps
docker exec -it <container-id> npm run test
```

After modifying something in tests, the whole test suite will run again.

__Downside__: had to remember the container-id, then execute the test inside the container.

### S06/L82 Docker Compose for Running Tests

**...**

```
docker-compose up --build
```

After modifying something in tests, the whole test suite will run again.

__Downside__: we are getting the output inside the logging interface of docker-compose, but there is no ability to enter inputs.

### S06/L83 Tests Not Re-running on Windows

### S06/L84 Shortcomings on Testing

If there is a running test suite launched with docker-compose (executed by the commands of the previous lecture), then in a second terminal:

```
docker ps	# get the container-id of the image created from frontend-web image
docker attach <container-id>    # working exactly like the docker-compose solution
```

The input can't be given, the test suite can't be manipulated.

in a third terminal:

```
docker exec -ti <container-id> sh
/app # ps
```

The `ps` command shows, that the primary process `npm` starts another processes according to the given arguments. A process of those is running the tests. The `docker attach` always attaches to the STDIN of the primary process of the container, but notthe `npm` command is interpreting the user inputs for the test suite.

There are other test frameworks which do not accept inputs.

### S06/L85 Need for Nginx

* In development environment the requests go the the development server, which is running in a Web Container. The resources are served by this development server.
* The production version of the application is created by `npm run build`. There is no development server involved (because it has a ton of processing power inside of it, dedicated to processing JS files and putting themtogether), which is not required in production.

In production environment a server is needed with sole purpose to respont browser requests and serve JS and HTML files that contains application code: __nginx__

### S06/L86 Multi-Step Docker Builds

Only the static content of the `build` directory (generated by the `npm run build` command is needed) is needed for production environment. For hosting simple static content __nginx__ can be used.

* Build phase
	* use node:alpine
	* copy package.json
	* install dependencies
	* run `npm run build`
* Run phase
	* run __nginx__
	* copy the results of `npm run build`
	* start __nginx__

### S06/L87 Implementing Multi-Step Builds

**Dockerfile**

https://hub.docker.com/_/nginx

### S06/L88 Running Nginx

**...**

```
docker build .
docker run -p 8080:80 <container-id>
```
