
# Jenkins, From Zero To Hero: Become a DevOps Jenkins Master

https://www.udemy.com/course/jenkins-from-zero-to-hero

## S1 Introduction & Installation

**Vagrantfile**  

### S01/E1 Resources for this section

### S01/E2 Introduction to the course

https://jenkins.io

- automation server
- continuous integration
- continuous delivery

### S01/E3 Note: About the Lab

https://www.virtualbox.org/wiki/Downloads  
https://docs.docker.com/docker-for-mac/  

### S01/E4 Start building your Lab - Create a Virtual Machine using VirtualBox

CentOS Minimal ISO

### S01/E5 Start building your Lab - Install CentOs

CentOS 7 64bit

VirtualBox
- Red Hat 64bit
- 2GB RAM
- VDI, Dynamically allocated, 20GB

Settings
- Network: Bridged Adapter
  - Ethernet or WiFi (depends on the used connection)

Installation
- user: jenkins (Admin rights)

### S01/E6 Start building your Lab - Configure Putty

https://www.putty.org

```
ip a
```

### S01/E7 Install Docker

```
ping google.com

# install Docker for CentOS
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce

# start the service
sudo systemctl start docker

# start the service at boot
sudo systemctl enable docker

docker ps
# error with jenkins user

sudo usermod -aG docker jenkins
whoami

docker ps
# still error
logut
```

```
docker ps
# no error this time
```

### S01/E8 Install Docker Compose

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

docker-compose
```

### S01/E9 Download the Jenkins Docker Image

https://hub.docker.com/r/jenkins/jenkins/

```
docker pull jenkins/jenkins
docker images

docker info | grep -i root
# <path_to_docker_images_directory>

# sudo du -sh <path_to_docker_images_directory>
sudo du -sh /var/lib/docker
```

### S01/E10 Create a Docker Compose file for Jenkins

**docker-compose.yml**  

```
mkdir ~/jenkins-data
cd jenkins-data
mkdir jenkins_home
vi docker-compose.yml
```
docker-compose.yml:
```
version: '3'
services:
  jenkins:
    container_name: jenkins
    image: jenkins/jenkins
    ports:
      - "8080:8080"
    volumes:
      - "$PWD/jenkins_home:/var/jenkins_home"
    networks:
      - net
networks:
  net:
```

### S01/E11 Create a Docker Container for Jenkins

```
ls -l
id
# uid 1000
sudo chown 1000:1000 jenkins_home -R
# user and the group is jenkins
```

```
docker-compose up -d
docker ps
# running server

# docker logs -f <container_name>
docker logs -f jenkins
# copy the password from the log
# e.g.: b8a489b11ef743e3895a89dc46a6a13f
```
browser:
```
<IP>:8080
# enter password
```

- install suggested plugins

### S01/E12 Troubleshooting: Jenkins not coming up?

Issue:
```
docker ps # doesn't show the running container
```
Debug:
```
# shows the container with exit status
docker ps -a

# shows a volume permission error
docker logs jenkins
```
Reason:
* inside of the Jenkins container there's a user named "jenkins" which has a Linux uid of 1000
* the docker volume is mounted to /var/jenkins_home which is the home directory of that user
* if the directory doesn't have 1000 permissions, then the user won't be able to write/delete files, which causes the container to exit

Resolution:
* apply 1000 permissions to your jenkins-data folder, and then restart the container

```
sudo chown 1000:1000 -R ~/jenkins-data
docker-compose up -d
```

### S01/E13 Create a local DNS for your Jenkins server

open the hosts file from the Host OS:
- `C:\\Windows\\System32\\drivers\\etc\\hosts`

place the IP address of the Guest OS:
```
<GUEST_OS_IP> jenkins.local
```
browser:
```
jenkins.local:8080
```

- local DNS has been created

### S01/E14 Note: You should keep using putty

Ubuntu installed as subsystem fo Windows to display fonts better for the course

### S01/E15 Learn how to work with Docker and Jenkins

```
docker-compose stop
docker ps
docker-compose start
docker-compose restart jenkins
docker-compose down
# deletes everything but the volumes
docker-compose up -d
docker ps
```

### S01/E16 Bonus

https://www.learndevopsnow.tech/devops-courses/

## S2 Getting Started with Jenkins

### S02/E17 Resources for this section

### S02/E18 Introduction to Jenkins UI

### S02/E19 Hands On! Create your first Jenkins Job

task = job

virtual machine:
```
java
# java does not exists in the virtual machine

docker exec -ti jenkins bash
```
container:
```
java
# java exists in the container
java -version

touch /tmp/hello
cat /tmp/hello
exit
```
virtual machine:
```
cat /tmp/hello
# No such file or directory
```

Everything running in Jenkins will run within the container.

- Nem Item
  - Freestyle project: `my-first-job`
    - Build step
      - Execute shell
```
echo Hello World
```
- Build Now
- Console Output
  - `Hello World` is printed
- Configure

### S02/E20 Keep playing with your first Job

```
docker exex -ti jenkins bash
date
```

### S02/E21 Redirect your first Job's output

1. Configure job (Execute shell):
```
NAME=John
echo "Hello, $NAME. Current date and time is $(date)" > /tmp/info
```
2. Build job

In container:
```
cat /tmp/info
# file exists
exit
```
In virtual machine:
```
cat /tmp/info
# file does not exists
```
In container:
```
rm -Rf /tmp/info
```

### S02/E22 Learn how to execute a bash script from Jenkins

**script.sh**

virtual machine:
```
docker ps
docker exec -ti jenkins bash
vi
# no vi program in container
exit
```
script.sh:
```
#!/bin/bash

FIRST_NAME=$1
LAST_NAME=$2

echo "Hello, $FIRST_NAME $LAST_NAME"
```
virtual machine:
```
chmod +x ./script.sh
./script.sh
./script.sh John Doe

docker cp script.sh jenkins:/tmp/script.sh
docker exec -ti jenkins bash
/tmp/script.sh Jane Doe
```
Configure
```
FIRST=Jack
LAST=Doe
/tmp/script.sh $FIRST $LAST
```

### S02/E23 Add parameters to your Job

- Configure
  - General
    - This project is parametrized
      - Add parameter
        - String parameter
          - Name: `FIRST_NAME`
          - Default Value: `Ricardo`
      - Add parameter
        - String parameter
          - Name: `SECOND_NAME`
          - Default Value: `André`
  - Build
```
echo "Hello, $FIRST_NAME $SECOND_NAME"
```

### S02/E24 Learn how to create a Jenkins list parameter with your script

- Configure
  - General
    - This project is parametrized
      - Add parameter
        - Choice parameter
          - Name: `LASTNAME`
          - Choices:
```
Smith
Gonzalez
Doe
```
  - Build
```
echo "Hello, $FIRST_NAME $SECOND_NAME $LASTNAME"
```

### S02/E25 Add basic logic and boolean parameters

**script.sh**

- Configure
  - General
    - This project is parametrized
      - Add parameter
        - Boolean parameter
          - Name: `SHOW`

script.sh:
```
#!/bin/bash

NAME=$1
LASTNAME=$2
SHOW=$3

if [ "$SHOW" = "true" ]; then
  echo "Hello, $NAME $LASTNAME"
else
  echo "If you want to see the name, please mark the show option"
fi
```
virtual machine:
```
./script.sh Ricardo Gonzalez false
./script.sh Ricardo Gonzalez true

docker cp script.sh jenkins:/tmp/script.sh
docker exec -ti jenkins bash
cat /tmp/script.sh

# Parameters from Jenkins
/tmp/script.sh $FIRST_NAME $LASTNAME $SHOW
```

## S3 Jenkins & Docker

**Vagrantfile**  

### S03/E26 Resources for this section

### S03/E27 Docker + Jenkins + SSH - I

**Dockerfile**  

Remote execution via SSH.

```
mkdir centos7
cd centos7
vi Dockerfile
```
Dockerfile:
```
FROM centos

RUN yum -y install openssh-server

RUN useradd remote_user && \
    echo "1234" | passwd remote_user --stdin && \
    mkdir /home/remote_user/.ssh && \
    chmod 700 /home/remote_user/.ssh
```

### S03/E28 Troubleshooting: remote-host image not building correctly?

**Dockerfile.centos7**  
**Dockerfile.centos8**  

Possible solutions for outdated CentOS problem:

- **CentOS7:** Use the old image:
```
FROM centos:7
```

- **CentOS8:** Change Dockerfile content from this:
```
RUN useradd remote_user && \
    echo "1234" | passwd remote_user  --stdin && \ # Passwd command is deprecated on centos:8
    mkdir /home/remote_user/.ssh && \
    chmod 700 /home/remote_user/.ssh
```
to this:
```
RUN useradd remote_user && \
    echo "remote_user:1234" | chpasswd && \
    mkdir /home/remote_user/.ssh && \
    chmod 700 /home/remote_user/.ssh
```

### S03/E29 Docker + Jenkins + SSH - II

**Dockerfile.centos7**  
**Dockerfile.centos8**  

Virtual machine, `centos7` folder:
```
ssh-keygen -f remote-key
```
Dockerfile:
```
COPY remote_key.pub /home/remote_user/.ssh/authorized_keys

RUN chown remote_user:remote_user -R /home/remote_user/.ssh/ && \
    chmod 600 /home/remote_user/.ssh/authorized_keys

RUN /usr/sbin/ssd-keygen

CMD /usr/sbin/sshd -D
```

### S03/E30 Docker + Jenkins + SSH - III

**docker-compose.yml**  

add lines to `docker-compose.yml`:
```
  remote_host:
    container_name: remote-host
    image: remote-host
    build:
      context: centos7
    networks:
      - net
```

Virtual machine, `~` folder:
```
docker-compose build
docker images
docker ps
docker-compose up -d
```

From Virtual Machine SSH into `remote_host` from `jenkins` container:
```
docker exec -it jenkins bash

ssh remote_user@remote_host
# password: 1234
exit # remote_host container

exit # jenkins container
```

Test SSH into `remote_host` from `jenkins` with key file:
```
cd centos7
docker cp remote-key jenkins:/tmp/remote-key
docker exec -it jenkins bash

ls /tmp
ssh -i /tmp/remote-key remote_user@remote_host
```

- The `remote_host` and `jenkins` from `docker-compose.yml` file can be used as host names while SSHing from other containers, but not from the Virtual Machine.

To configure this in Vagrant Virtual Machine:
```
vagrant plugin install vagrant-scp
vagrant scp S03/E29/Dockerfile.centos7 :/home/vagrant/Dockerfile
vagrant scp S03/E30/docker-compose.yml :/home/vagrant/docker-compose.yml
```

### S03/E31 Learn how to install Jenkins Plugins (SSH Plugin)

Test internet connection of the VM and container:
```
pint google.com
```

Install:
- Manage Jenkins
  - Manage Plugins
    - Available tab
      - search for SSH
      - mark SSH
      - Install without restart
    - Restart Jenkins when installation is complete and no jobs are running

Verify:
- Manage Jenkins
  - Manage Plugins
    - Installed tab
      - Check SSH Plugin

### S03/E32 Integrate your Docker SSH server with Jenkins

- **Configure SSH in Jenkins:**
  - Manage Jenkins
    - Configure System
      - SSH remote host
        - Add
          - hostname: `remote_host`
          - port: `22`
          - credentials
            - ADD
- **If the `Add` button not working:**
  - Credentials: `Jenkins`
    - Local Crendentials
      - Add Credentials
        - Kind: `SSH Username with private key`
          - username
          - private key
        - OK
- **Set credentials and test connection:**
  - Manage Jenkins
    - Configure System
      - SSH sites
        - hostname: `remote_host`
        - port: `22`
        - credentials: `remote_user`
    - Check connection
    - Save

### S03/E33 Run your a Jenkins job on your Docker remote host through SSH

- **Run Task over SSH:**
  - New Item: `remote-task`
  - Freestyle project
    - Build
      - Execute shell script on remote host using ssh
        - Command
        ```
        NAME=Ricardo
        echo "Hello, $NAME. Current date and time is $(date)" > /tmp/remote-file
        ```
  - Build Now

After the execution is finished the file will be created on `remote_host`.

## S4 Jenkins & AWS

### S04/E34 Resources for this section

### S04/E35 Introduction: MySQL + AWS + Shell Scripting + Jenkins

### S04/E36 Create a MySQL server on Docker

### S04/E37 Install MySQL Client and AWS CLI

### S04/E38 Create a MySQL Database

### S04/E39 Create a S3 Bucket on AWS

### S04/E40 Create a user (IAM) for AWS authentication

### S04/E41 Learn how to take a backup and upload it manually to S3

### S04/E42 Automate the backup and upload process with a shell script

### S04/E43 Integrate your script with AWS CLI

### S04/E44 Learn how to manage sensitive information in Jenkins (Keys, Passwords)

### S04/E45 Create a Jenkins job to upload your DB to AWS

### S04/E46 Execute your Job and be happy!

### S04/E47 Persist the script on the remote host

### S04/E48 Reuse your Job to upload different DB's to different buckets

## S5 Jenkins & Ansible

### S05/E49 Resources for this section

### S05/E50 Introduction: Jenkins + Ansible

### S05/E51 Install Ansible: Docker + Jenkins

### S05/E52 Make the ssh keys permanent on the Jenkins container

### S05/E53 Create a simple Ansible Inventory

### S05/E54 Create your first Ansible Playbook

### S05/E55 Integrate Ansible and Jenkins (Ansible Plugin)

### S05/E56 Learn how to execute Playbooks from a Jenkins Job

### S05/E57 Power up! Add parameters to Ansible and Jenkins

### S05/E58 Missing the colors? Colorize your playbooks' output

### S05/E59 Challenge: Jenkins + Ansible + MySQL + PHP + NGINX + Shell Scripting

### S05/E60 Create the DB that will hold all the users

### S05/E61 Create a Bash Script to feed your DB - I

### S05/E62 Create a Bash Script to feed your DB - II

### S05/E63 Test your Script inserting the data to the DB

### S05/E64 Start building a Docker Nginx Web Server + PHP - I

### S05/E65 Start building a Docker Nginx Web Server + PHP - II

### S05/E66 Build a table using HTML, CSS and PHP to display users

### S05/E67 Integrate your Docker Web Server to the Ansible Inventory

### S05/E68 Create a Playbook in Ansible to update your web table

### S05/E69 Test your playbook and see the magic!

### S05/E70 Ready? Let's create a Jenkins Job to build everything with a click!

## S6 Jenkins & Security

### S06/E71 Intro - Learn how to Enable/Disable Login in Jenkins

### S06/E72 Allow users to sign up

### S06/E73 Install a powerful security plugin

### S06/E74 Create users manually in the Jenkins DB

### S06/E75 Ever heard about roles? Let's create a Read Only role!

### S06/E76 Assign the role that you created to a particular user

### S06/E77 Create a role to execute jobs, and assign that role to your user

### S06/E78 Learn how to restrict Jobs to users using Project Roles.

## S7 Jenkins Tips & Tricks

### S07/E79 Resources for this section

### S07/E80 Global environment variables in Jenkins

### S07/E81 Create your own custom global environment variables

### S07/E82 Modify the Jenkins URL

### S07/E83 Meet the Jenkins' cron: Learn how to execute Jobs automatically

### S07/E84 Learn how to trigger Jobs from external sources: Create a generic user

### S07/E85 Troubleshooting: Githooks throwing 403 forbidden errors?

### S07/E86 Trigger your Jobs from Bash Scripts (No parameters)

### S07/E87 Trigger your Jobs from Bash Scripts (With Parameters)

## S8 Jenkins & Email

### S08/E88 Introduction: Jenkins & Email

### S08/E89 Install a Mail Plugin

### S08/E90 Integrate Jenkins and AWS Simple Email Service

### S08/E91 Integrate Jenkins and Gmail

### S08/E92 Add notifications to your jobs

## S9 Jenkins & Maven

### S09/E93 Introduction: Jenkins & Maven

### S09/E94 Install the Maven Plugin

### S09/E95 Install the GIT Plugin

### S09/E96 Learn how to clone a GIT/GITHUB repository from Jenkins

### S09/E97 Learn how to build a JAR using maven

### S09/E98 Learn how to test your code

### S09/E99 Deploy your Jar locally

### S09/E100 Display the result of your tests using a graph

### S09/E101 Archive the last successful artifact

### S09/E102 Send Email notifications about the status of your maven project

## S10 Jenkins & GIT

### S10/E103 Resources for this section

### S10/E104 Create a Git Server using Docker

### S10/E105 Create your first Git Repository

### S10/E106 Create a Git User to interact with your Repository

### S10/E107 Upload the code for the Java App in your Repo

### S10/E108 Integrate your Git server to your maven Job

### S10/E109 Learn about Git Hooks

### S10/E110 Trigger your Jenkins job using a Git Hook

## S11 Jenkins & DSL

### S11/E111 Resources for this section

### S11/E112 Introduction: Jenkins DSL

### S11/E113 Install the DSL Plugin

### S11/E114 What is a Seed Job in DSL?

### S11/E115 Understand the DSL Structure

### S11/E116 Description

### S11/E117 Parameters

### S11/E118 SCM

### S11/E119 Triggers

### S11/E120 Steps

### S11/E121 Mailer

### S11/E122 Recreate the Ansible Job using DSL

### S11/E123 Recreate the Maven Job using DSL

### S11/E124 Version your DSL code using Git

### S11/E125 Magic? Create Jobs only pushing the DSL code to your Git server!

## S12 CI/CD - Definitions

### S12/E126 Introduction to CI/CD

### S12/E127 Continuous Integration

### S12/E128 Continuous Delivery

### S12/E129 Continuous Deployment

## S13 Jenkins Pipeline - Jenkinsfile

### S13/E130 Resources for this section

### S13/E131 Introduction to Pipeline

### S13/E132 Introduction to Jenkinsfile

### S13/E133 Install the Jenkins Pipeline Plugin

### S13/E134 Create your first Pipeline

### S13/E135 Add multi-steps to your Pipeline

### S13/E136 Retry

### S13/E137 Timeouts

### S13/E138 Environment variables

### S13/E139 Credentials

### S13/E140 Post actions

## S14 CI/CD + Jenkins Pipeline + Docker + Maven

### S14/E141 Resources for this section

### S14/E142 Introduction

### S14/E143 Learn how to install Docker inside of a Docker Container

### S14/E144 Define the steps for your Pipeline

### S14/E145 Build: Create a Jar for your Maven App using Docker

### S14/E146 Build: Write abash script to automate the Jar creation

### S14/E147 Build: Create a Dockerfile and build an image with your Jar

### S14/E148 Build: Create a Docker Compose file to automate the Image build process

### S14/E149 Build: Write a bash script to automate the Docker Image creation process

### S14/E150 Build: Add your scripts to the Jenkinsfile

### S14/E151 Test: Learn how to test your code using Maven and Docker

### S14/E152 Test: Create a bash script to automate the test process

### S14/E153 Test: Add your test script to Jenkinsfile

### S14/E154 Create a remote machine to deploy your containerized app

### S14/E155 Push: Create your own Docker Hub account

### S14/E156 Push: Create a Repository in Docker Hub

### S14/E157 Push: Learn how to Push/Pull Docker images to your Repository

### S14/E158 Push: Write a bash script to automate the push process

### S14/E159 Push: Add your push script to Jenkinsfile

### S14/E160 Deploy: Transfer some variables to the remote machine

### S14/E161 Deploy: Deploy your application on the remote machine manually

### S14/E162 Deploy: Transfer the deployment script to the remote machine

### S14/E163 Deploy: Execute the deploy script in the remote machine

### S14/E164 Deploy: Add your deploy script to Jenkinsfile

### S14/E165 Create a Git Repository to store your scripts and the code for the app

### S14/E166 Create the Jenkins Pipeline. Finally!

### S14/E167 Modify the path when mounting Docker volumes

### S14/E168 Create the Registry Password in Jenkins

### S14/E169 Add the private ssh key to the Jenkins container

### S14/E170 Add post actions to Jenkinsfile

### S14/E171 Execute your Pipeline manually

### S14/E172 Create a Git Hook to automatically trigger your Pipeline

### S14/E173 Start the CI/CD process by committing new code to Git!

## S15 Bonus

### S15/E174 More courses from Ricardo
