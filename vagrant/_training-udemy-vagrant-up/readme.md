# Vagrant Up! Comprehensive development system automation

https://www.udemy.com/course/vagrant-up/

https://screencasts.pro/vagrant

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

## S05 Plugins

### S05/E13 Using Plugins

https://github.com/hashicorp/vagrant/wiki/Available-Vagrant-Plugins

```
pwd
vagrant help plugin
vagrant plugin list
vagrant plugin install vagrant-vbguest
vagrant plugin list
cd projects/trusty/
ls
clear
vagrant up
vagrant ssh
cd /vagrant/
ls
cat Vagrantfile
exit
cd ~
clear
vagrant plugin list
vagrant plugin update
clear
vagrant plugin uninstall vagrant-vbguest
vagrant plugin list
```

### S05/E14 Plugins Command Listing

## S06 Provisioning

### S06/E15 Provisioning Introduction

- Big "Baked" Base Box
- Minimal Base Box
- Core Base Box (hybrid)

### S06/E16 Manual "baked" Provisioning

**index.html**  
**info.php**

```
pwd
cd projects/
mkdir baked-lamp
cd baked-lamp
vagrant init chef/centos-6.5
mate Vagrantfile # enable port forwarding
vagrant ssh # enter VM
clear
sudo yum update -y
clear
sudo yum install -y nano git unzip screen
clear
sudo yum install -y httpd httpd-devel httpd-tools
clear
sudo chkconfig --add httpd
sudo chkconfig httpd on
sudo service httpd stop
cd /var/www/html
ls
cd ..
ls
sudo rm -rf html
ls
sudo ln -s /vagrant /var/www/html
exit
ls
mate index.html
ls
pwd
vagrant ssh # back into VM
sudo service httpd start
exit
vagrant ssh
clear
sudo yum install -y php php-cli php-common php-devel php-mysql
sudo service httpd restart
exit
pwd
mate info.php
ls
vagrant ssh
clear
sudo yum install -y mysql mysql-server mysql-devel
sudo chkconfig --add mysqld
sudo chkconfig mysqld on
sudo service mysqld start
mysql -u root -e "CREATE DATABASE IF NOT EXISTS dev_test";
mysql -u root -e "SHOW DATABASES";
exit
vagrant help package
vagrant status
vagrant package --output centos-lamp.box
clear
ls
vagrant box add centos-lamp centos-lamp.box
cd ..
clear
mkdir test-lamp
cd test-lamp/
vagrant box list
vagrant init centos-lamp
mate Vagrantfile
clear
vagrant plugin install vagrant-vbguest
clear
vagrant up
ls
mate index.html
```

### S06/E17 File Provisioners

http://git.training/

```
pwd
mkdir vagrant
cd vagrant/
mkdir files
cd files
pwd
which git
git config --global user.name "Jason Taylor" # replace with your actual name
git config --global user.email "jason@screencasts.pro" # replace with your email
git config --global --list
cat ~/.gitconfig
cp ~/.gitconfig git-config
ls
cd ~
clear
cd projects/
ls
mkdir git-box
cd git-box/
ls
vagrant box list
vagrant init chef/centos-6.5
vagrant plugin list
mate Vagrantfile # disable vbguest auto update
vagrant up
clear
pwd
ls -la
exit
mate Vagrantfile # configure file provisioner
vagrant status
vagrant provision
vagrant ssh
ls -al
cat .gitignore
exit
clear
vagrant destroy
clear
vagrant up # test file provisioner with fresh vagrant up
vagrant ssh
ls -al
cat .gitconfig
exit
vagrant destroy
```

Disable vbguest auto update:
```
config.vbguest.auto_update = false
```

Configure file provisioner (copy `.gitconfig` in Vagrantfile):
```
config.vm.provision "file"
  #source: "c:\\path\\to\\file.txt"
  source: "~/vagrant/files/git-config",
  destination: "~/.gitconfig"
```

### S06/E18 Shell Provisioners

**provision.sh**

```
pwd
cd projects/
cd git-box/
ls
vagrant status
mate Vagrantfile # config inline shell script
vagrant up
vagrant ssh
which git
git version
exit
mate Vagrantfile # config heredoc shell script
vagrant status
vagrant provision
clear
mate Vagrantfile
cd
cd vagrant/
ls
mkdir scripts
cd scripts/
mate provision.sh
ls
pwd
cd ~/projects/git-box/
mate Vagrantfile # config external shell script
vagrant destroy
vagrant up
vagrant ssh
git version
which nano
exit
vagrant destroy
```

Configure shell provisioner (in Vagrantfile):
```
config.vm.provision "shell"
  inline: "yum install -y git"
config.vm.provision "shell"
  inline: "yum install -y nano"
```
OR
```
config.vm.provision "shell"
  inline: "yum install -y git nano"
```
OR
```
$myscript = <<MYSCRIPT
yum install -y git
yum install -y nano
MYSCRIPT
# ...
config.vm.provision "shell"
  inline: $myscript
```
OR
```
config.vm.provision "shell"
  path: "~/vagrant/scripts/provision.sh"
```

### S06/E19 LAMP Stack Provisioning Example, Part 1

**centos-lamp.sh**
**index.hutml**
**info.php**

```
pwd
cd vagrant/
ls
git init
git add .
git status
git commit -m "initial commit"
git remote add origin git@github.com:screencasts-pro/vagrant.git # use your own repository
git push -u origin master
cd scripts/
ls
mate centos-lamp.sh # write shell provisioning script
cd ..
cd files/
pwd
ls
mate index.html # create simple webpage
mate info.php # create php file to call phpinfo()
cd ..
pwd
git status
git add .
git status
git commit -m "adding files for LAMP stack"
git push origin master # -u is not required
cd scripts/
mate centos-lamp.sh # configure to download index.html and info.php from GitHub
cd ..
pwd
git status
git commit -am "Updated LAMP script with GitHub files"
git push origin master
cd
clear
```

### S06/E20 LAMP Stack Provisioning Example, Part 2

**Vagrantfile**

```
cd projects/
git init shell-lamp
cd shell-lamp/
pwd
vagrant box list
vagrant init chef/centos-6.5
mate Vagrantfile # enable port forwarding, disable vbguest update, add file and shell provisioners
echo ".vagrant" >> .gitignore
git add .
git commit -m "initial commit"
clear
ls
ls -al
clear
vagrant up # notice problem
mate Vagrantfile # fix problem
clear
vagrant up
ls
mate index.html # make changes
vagrant destroy
clear
```

### S06/E21 Provisioning Command Listing

## S07 Multiple Virtual Machines

### S07/E22 Provisioning and Working with Multiple Virtual Machines

**centos-common.sh**
**centos-web.sh**
**centos-database.sh**
**Vagrantfile**

```
pwd
cd vagrant/
cd scripts/
ls
mate centos-lamp.sh
mate centos-common.sh
mate centos-lamp.sh
mate centos-web.sh
mate centos-database.sh
ls
cd ..
git add .
git status
git commit -m "Adding files for multi-vm setup"
git push origin master
clear
cd projects/
git init multi-vms
cd multi-vms/
cp ../shell-lamp/Vagrantfile .
ls
mate Vagrantfile # configure scripts for multi-vm setup
git status
git add .
git commit -m "initial commit"
clear
vagrant up web
vagrant status
vagrant up db
vagrant status
vagrant status web
clear
vagrant halt db
vagrant halt web
vagrant status
vagrant up # brings up both
clear
vagrant ssh web
ifconfig | grep inet
ssh 192.168.10.3
ifconfig | grep inet
exit
clear
nc -z -w1 192.168.10.3 3306
exit
vagrant halt
cd
```

### S07/E23 Multiple VMs Command Listing

## S08 Conclusion

### S08/E24 Conclusion

### S08/E25 Resources

http://vagrantup.com/

https://github.com/mitchellh/vagrant/wiki/Available-Vagrant-Plugins

https://vagrantcloud.com/

## S09 Bonus! Creating Custom Boxes for Vagrant

### S08/E26 Introduction to Custom Boxes

### S08/E27 Acquire OS Image

*CentOS-7.0-1406-x86_64-Minimal.iso*

https://www.centos.org/download/

```
md5 ~/Downloads/CentOS-7.0-1406-x86_64-Minimal.iso
```

### S08/E28 VirtualBox Setup and OS Installation

### S08/E29 Vagrant Customizations, Part 1

```
# as vagrant user
sudo yum update -y
sudo yum install -y nano yum-utils wget
nano .bash_profile  # add editor
sudo shutdown -r now
```

* add editor to .bash_profile:
```
export EDITOR=/usr/bin/nano
```

```
# as vagrant user
sudo su -
export EDITOR=/usr/bin/nano
visudo  # edit sudo settings
exit
exit
```

* edit sudo settings:
```
#Defaults requiretty
Defaults !requiretty
#...
Defaults  env_keep += "SSH_AUTH_SOCK"
#...
#%wheel  ALL=(ALL) ALL
%wheel  ALL=(ALL) NOPASSWD: ALL
```

```
# as vagrant user
sudo which sudo
clear

cd /etc/ssh
sudo nano sshd_config # *1

sudo systemctl restart sshd.service
clear

sudo nano /etc/default/grub # *2
sudo grub2-mkconfig -o /boot/grub2/grub.cfg

sudo shutdown -r now
```

* sudo nano sshd_config:
```
#Port 22
#PubkeyAuthentication yes
#AuthorizedKeysFile  .ssh/authorized_keys
AuthorizedKeysFile  %h/.ssh/authorized_keys
UseDNS no
```

* sudo nano /etc/default/grub
```
GRUB_TIMEOUT=1
```

```
# as vagrant user
cd ~
pwd
mkdir .ssh
cd .ssh
wget --no-check-certificate https://raw.github.com/mitchellh/vagrant/master/keys/vagrant.pub -O authorized_keys
ls -al
chmod 0600 authorized_keys
ls -al
cd ..
chmod 0770 .ssh
clear
```

### S08/E30 Vagrant Customizations, Part 2

```
sudo yum update kernel*
rpm -qa kernel
sudo package-cleanup --oldkernels --count=2
clear
sudo yum install -y kernel-devel kernel-headers dkms gcc gcc-c++ bzip2 make kernel-devel-$(uname -r)
sudo shutdown -r now
```

```
# as vagrant user
clear
sudo su -
mkdir /mnt/cdrom
mount /dev/cdrom /mnt/cdrom
cd /mnt/cdrom/
./VBoxLinuxAdditions.run
cd ~
umount /mnt/cdrom
lsmod | grep vbox
shutdown -r now
```

```
# as vagrant user
sudo lsmod | grep vbox
clear
sudo yum remove kernel-headers gcc make
sudo shutdown -r now
```

```
# as vagrant user
sudo lsmod | grep vbox
clear
sudo dd if=/dev/zero of=/EMPTY bs=1M
sudo rm -f /EMPTY
sudo shutdown -h now
```

```
# as vagrant user
ls -al
chmod 0700 .ssh
sudo shutdown -h now
```

### S08/E31 Package and Test

```
pwd
cd projects/
mkdir vagrant-box
cd vagrant-box
vagrant box list
clear
vagrant package --base vagrant-custon-centos7
ls
mv package.box CentOS7-server.box
ls
vagrant box add centos7 CentOS7-server.box
cd ..
ls
mkdir centos7-test
cd centos7-test/
vagrant box list
vagrant init centos7
clear
ls
vagrant up
vagrant ssh
cd /vagrant/
cat Vagrantfile
exit
vagrant destroy
cd ..
rm -rf centos7-test
```

### S08/E32 Custom Box Conclusion

* Hosting the Box
  * Network storage (NAS/Shared Folder)
  * Cloud storage (Dropbox, Drive, AWS)
  * Online / Website
  * Vagrant Cloud
* More Custom Boxes
  * Vagrant Package


* Provisioning
  * File, Shell
  * Chef, Puppet, others
  * Docker
* Other Operating Systems / Variations
  * Fedora, Ubuntu, Linux Mint
* Packer (packer.io)
  * creates multiple virtual machine images from single configuration file

https://packer.io/

## S10 Bonus! Using the Chef Solo Provisioner

### S10/E33 Introduction to Chef

* Automated Provisioning / Deployment
* Formerly Opscode
* Ruby programming language
* Chef Domain Specific Language
* Infrastructure as Code


* Terminology
  * Recipes
    * Ruby + Chef DSL scripts
      * unit of work defined
    * task actions
    * can use supporting scripts
    * can call other recipes
    * entry point of a cookbook
    * default recipe
  * Templates
    * embedded Ruby templates
    * uses "erb" file extension
    * can contain Ruby and dynamic values
    * excellent for configuration files
  * Attributes
    * settings used in cookbooks
    * overriding / precedence
    * customize cookbooks
  * Cookbooks
    * collection of
      * recipes
      * templates
      * other supporting files scripts
    * metadata
      * name, description
      * version, dependencies
  * Roles
    * group related recipes
    * outside, unrelated to cookbook
    * not versioned in chef
  * Nodes
    * sytem where recipes execute


Chef SOLO vs Client:

* Chef Client
  * hosted / enterprise
  * centralized cookbooks
  * scales
  * full functionality
  * cost (not free)
  * complexty
* Chef Solo
  * simpler
  * sharing?
  * scale?
  * reduced functionality
  * free

### S10/E34 Chef Supermarket and Selecting a Cookbook

https://supermarket.getchef.com/  
https://supermarket.chef.io/

```
pwd
cd vagrant/
ls
mkdir chef
cd chef
mkdir supermarket
mkdir cookbooks
mkdir roles
cd supermarket

tar -xvzf ~/Downloads/java.tgz
tar -xvzf ~/Downloads/tomcat_latest.tgz
cd ..
pwd
git add .
git status
git commit -m "Adding Chef cookbooks from supermarket"
git push origin master
clear
cd
vagrant plugin install vagrant-omnibus
```

### S10/E35 Using the Cookbook with Vagrant

**Vagrantfile**

```
cd projects/
vagrant box list
git init chef-tomcat
cd chef-tomcat
echo ".vagrant" >> .gitignore
vagrant init chef/centos-6.5
git add .
git status
git commit -m "Initial Commit"
```

in Vagrantfile:
```
config.omnibus.chef_version = :latest
```

```
vagrant up
vagrant ssh
which java
java --version
exit
git status
git commit -am "Working Chef Solo config"

# add tomcat recipe to Vagrantfile
vagrant provision
git commmmit -am "Adding Tomcat latest to Chef Solo config"
```

* add tomcat recipe to Vagrantfile
```
chef.add_recipe "tomcat_latest"
```

### S10/E36 Evaluation of the Supermarket Cookbook

### S10/E37 Creating a Custom Cookbook - Setup and Metadata

### S10/E38

### S10/E39

### S10/E40

### S10/E41

### S10/E42

### S10/E43

### S10/E44

### S10/E45

## S11 Bonus! Spcial Offers

### S11/E46
