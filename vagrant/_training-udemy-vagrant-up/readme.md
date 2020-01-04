# Vagrant Up! Comprehensive development system automation

https://www.udemy.com/course/vagrant-up/

## S01 Introduction

### S01/E01 Course Introduction and Overview

### S01/E02 Core Concepts

- Virtual Machines
  - Host
  - Guest
- Networking
  - NAT
    - Port Forwarding
  - Private

https://www.virtualbox.org/  
https://www.vagrantup.com/

- Architectures
  - Kitchen Sink
  - Light Server


* Boxes
  * ~/.vagrant.d/boxes


* Providers
  * Virtualbox
  * VMWare
  * Parallels
  * Cloud: AWS, Azure
  * Docker
* Provisioners
  * File
  * Shell
  * Chef (Solo / Client)
  * Puppet (Apply / Agent)
  * Docker


- Vagrantfile
  - Ruby programming language

### S01/E03 Course Materials

https://github.com/screencasts-pro/course-vagrant-up

https://github.com/screencasts-pro/vagrant

## S02 Installation

### S02/E04 Installation Overview

### S02/E05 Windows Installation

### S02/E06 Mac OS X Installation

## S03 Getting Started

### S03/E07 Quick Start

```
pwd
mkdir projects
cd projects
mkdir demo
cd demo
pwd
clear

vagrant help
vagrant help init
vagrant init hashicorp/precise64
ls -al
mate Vagrantfile
vagrant up
vagrant ssh
pwd
cd /vagrant
ls
nano Vagrantfile
exit
pwd
mate Vagrantfile

vagrant suspend
vagrant status
vagrant up
vagrant status
vagrant halt
vagrant status
vagrant up
vagrant destroy
vagrant up
vagrant ssh

ls
exit
vagrant destroy
```

### S03/E08 Version Control Vagrant Projects

*.vagrant*

```
pwd
cd ~
which git
git version
cd projects/demo/
pwd
ls -al
git init
ls -al
git add Vagrantfile
git commit -m "Adding initial files"
clear
mate .gitignore
git add .gitignore
git commit -m "adding ignore file"
git log --oneline
mate Vagrantfile
git status
git -a -m "updated vagrant config"
git status
git log --oneline
```

### S03/E09 Getting Started Command Listing

## S04 Boxes

### S04/E10 Managing Boxes

```
vagrant help box
vagrant box list -h
pwd
cd .vagrant.d/
ls
cd boxes/
ls
cd hashicorp-VAGRANTSLASH-precise64/
ls
cd ~
vagrant box list
vagrant box add ubuntu/trusty64
vagrant box list
clear
vagrant box list
cd projects/
mkdir trusty
cd trusty
vagrant init ubuntu/trusty64
vagrant up
vagrant destroy
clear
vagrant box list
vagrant box outdated
vagrant box update
cd ~
clear
vagrant box list
vagrant box remove hashicorp/precise64
vagrant box list
cd projects/demo/
vagrant up
clear
cd ~
```

### S04/E11 Finding More Boxes

http://www.vagrantbox.es/  
http://www.vagrantcloud.com/


```
vagrant box add {title} {url}
vagrant init {title}
vagrant up
```

```
cd projects/
mkdir fedora20-demo
cd fedora20-demo/
vagrant box add fedora20 http://opscode-vm-bento.s3.amazonaws.com/vagrant/virtualbox/opscode_fedora-20_chef-provisionerless.box
vagrant box list
pwd
vagrant init fedora20
ls
vagrant up
vagrant ssh
cd /etc
cat fedora-release
exit
vagrant destroy
cd ..
pwd
mkdir centos65-demo
cd centos65-demo/
vagrant init chef/centos-6.5
ls
vagrant up
vagrant ssh
cd /etc
cat redhat-release
exit
vagrant box list
vagrant destroy
cd ~
```

### S04/E12 Boxes Command Listing
