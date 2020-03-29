
# Rapidly spinning up a VM with Ubuntu and Docker–on my Windows machine using Vagrant and VirtualBox

https://technology.amis.nl/2018/05/21/rapidly-spinning-up-a-vm-with-ubuntu-and-docker-on-my-windows-machine-using-vagrant-and-virtualbox/

in colsole:
```
vagrant plugin install vagrant-disksize

vagrant up
```

in Vagrantfile:
```
# set up Docker in the new VM:
config.vm.provision :docker

# install docker-compose into the VM and run the docker-compose.yml file - if it exists -  whenever the  VM starts (https://github.com/leighmcculloch/vagrant-docker-compose)
config.vm.provision :docker_compose, yml: "/vagrant/docker-compose.yml", run:"always"
```

* if there is a docker-compose.yml file in the current directory, it will be run by docker compose inside the VM
* if there is none, an error message is shown – but the VM will still be created and end up running

in console:
```
vagrant ssh
```

in virtual machine console:
```
docker ps

docker version

docker run busybox echo “hello from busybox”

ls /vagrant

exit
```

in console:
```
vagrant halt

vagrant destroy
```
