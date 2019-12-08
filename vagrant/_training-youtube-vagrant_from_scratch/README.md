# Vagrant from Scratch

LigerLearn: https://www.youtube.com/playlist?list=PLMWwct3_kb-358XZdnN66zb3HaU97DSQ0

## Vagrant - 0 - Course Introduction - Vagrant from Scratch

## Vagrant - 1 - Virtualisation concepts and motivation

Virtualization types:
* hosted
* bare metal

Vagrant:
- portable configuration file across different operating systems
- creation of development environments is automatized
- manage environment dependencies


## Vagrant - 2/3 - Installing and setting up Vagrant on Windows 10/Mac OS X

**E05/my-first-vagrant-vm**

Don't use whitespace characters in the project paths for vagrant.

```
vagrant init bento/ubuntu-16.04
vagrant up
vagrant ssh

uname -a
exit

vagrant halt
```

## Vagrant - 4 - Boxes and the box catalogue

**E04/vagrant-boxes-and-conventions/**

```
vagrant init bento/ubuntu-16.04
```

Vagrantfile

https://vagrantcloud.com/search

bento project:
- trusted by HashiCorp
- follows default vagrant conventions

```
vagrant box --help
vagrant box list
```

```
vagrant box add bento/centos-7.3
vagrant box list
vagrant box remove bento/centos-7.3
vagrant box list
```

## Vagrant - 5 - Exploring the Vagrantfile

**E05/exploring-the-vagrantfile/**

```
vagrant box add bento/ubuntu-16.04
vagrant status
```

### Vagrantfile

Syntax highlighting:
```
# -*- mode: ruby -*-
# vi: set ft=ruby :
```

Vagrant version and block
```
Vagrant.configure("2") do |config|
...
end
```

Box:
```
config.vm.box = "bento/ubuntu-16.04"
```

Box update settings:
```
config.vm.box_check_update = false
```

Mapped ports (with IP restriction):
```
config.vm.network "forwarded_port", guest: 80, host: 8080
config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"
```

Synchronized folder:
```
config.vm.synced_folder "../data", "/vagrant_data"
```

VirtualBox specific settings:
```
config.vm.provider "virtualbox" do |vb|
  vb.gui = false
  vb.memory = "2048"
end
```
Provisioning with inline script:
* commands run with root privileges
* can have multiple provisioning blocks
* they run at creation time or if they are forced by "run: always"

```
config.vm.provision "shell", inline: <<-SHELL
  apt-get update
  apt-get install -y apache2
SHELL

config.vm.provision "shell", run: "always", inline: <<-SHELL
  echo "Hello from the Vagrantfile"
SHELL
```

Customization:
```
config.vm.define "web-server"
config.vm.hostname = "web-server"

config.vm.provider "virtualbox" do |vb|
  vb.name = "web-server"
  ...
end
```

### Running the Webserver and checking the settings

```
vagrant up
vagrant status
```
Browser: http://localhost:8080/
```
vagrant ssh

cd /var/www/html/
ls -la
cd /
cd vagrant
ls
cat Vagrantfile
exit

vagrant halt
vagrant destroy
```

## Vagrant - 6 - Multiple VMs and Private Networks

**E06/multiple-vms-and-private-network/**

Test ports before running the VMs:
```
ping 192.168.33.10
ping 192.168.33.20
```

Run vagrant images:
```
vagrant up
ping 192.168.33.10
ping 192.168.33.20
vagrant status
```

Qualify commands by the defined VM name:
```
vagrant halt ubuntu-vm
vagrant status
vagrant up ubuntu-vm
```

Command fails without the qualifier:
```
vagrant ssh
```

Command affects the whole environment:
```
vagrant halt
vagrant destroy
vagrant up
```

## Vagrant - 7 - Connecting to a Vagrant virtual machine using PuTTY

**E07/connect-to-vagrant-vm-with-putty/**

http://putty.org

```
vagrant init bento/ubuntu-16.04
vagrant status
vagrant up
vagrant status
```

**.vagrant/machines/&lt;name_of_the_vm&gt;/&lt;provider&gt;/public_key**
* convert the file to PEM with PuTTY-Gen (RSA, 2048 bit)
* save as PPK file

```
vagrant ssh-config
```
Enter the details into PuTTY
* IP address, Port number, SSH connection type
* in Data menu enter the "vagrant" username
* in Connection/SSH/Auth select the generated PPK file

## Vagrant - 8 - Workflows and conventions

```
vagrant box add <box-name>
vagrant box remove <box-name>
vagrant box list
vagrant box prune
```

```
vagrant global-status
vagrant ssh-config
```

HashiCorp's and bento user's conventions and recommendations:
* the name of the `Vagrantfile` is always with capital letter
* the root user/password in images: `vagrant`/`vagrant`
* passwordless SSH
* hostname is `vagrant`
* the project directory from guest machine is synced on `/vagrant` path inside the VM

The folder structure in `.vagrant` directory is `machines/<name_of_the_vm>/<provider>` and contains text files:
* action_provision
* action_set_name
* box_meta
* creator_uid
* id
* index_uuid
* private_key
* synced_folders
* vagrant_cwd

## Vagrant - 9 - Windows boxes with Vagrant and Packer

**win10-vm**

https://www.packer.io/downloads.html

https://github.com/joefitzgerald/packer-windows

**windows_10.json**
* ISO URL
* autounattend

```
packer build windows_10.json
vagrant box add win-10 windows_10_virtualbox.box
vagrant init win-10
vagrant up
vagrant halt
```

## Vagrant - 10 - Conclusion and next steps

**Providers:**
* VirtualBox
* VMWare
* Hyper-V
* etc

**Provisioners:**
* Shell
* Chef
* Puppet
* Docker
* etc

**Vagrant plugins**
