
# How to Automate Docker on Vagrant?

https://www.tothenew.com/blog/how-to-automate-docker-on-vagrant/

## Goals

1. Install all Vagrant plugin dependencies
2. Install Docker on guest OS
3. Login into Docker hub to pull private images
4. Execute Docker-compose to run all container on startup

## Plugins

1. **vagrant-gatling-rsync**: It is only required to sync the mounted resources from host to guest machine.
2. **vagrant-docker-compose**: It installs Docker Compose in guest machine and runs container defined in docker-compose.yml
3. **vagrant-vbguest**: It is required to check VirtualBox guest version on the box and if required will update it to the current version of host machine VirtualBox.
4. **vagrant-docker-login**: Provide capability to login into Docker repository.

## Define Vagrant Plugins

```
# List plugins dependencies
plugins_dependencies = %w( vagrant-gatling-rsync vagrant-docker-compose vagrant-vbguest vagrant-docker-login )
plugin_status = false
plugins_dependencies.each do |plugin_name|
  unless Vagrant.has_plugin? plugin_name
    system("vagrant plugin install #{plugin_name}")
    plugin_status = true
    puts " #{plugin_name}  Dependencies installed"
  end
end

# Restart Vagrant if any new plugin installed
if plugin_status === true
  exec "vagrant #{ARGV.join' '}"
else
  puts "All Plugin Dependencies already installed"
end
```

## Setup Guest Machine

```
Vagrant.configure("2") do |config|
  config.vm.hostname = "docker"
  config.vm.box = "bento/ubuntu-14.04"
  config.vm.network "private_network", ip: "192.168.1.100"

  config.vm.provider "virtualbox" do |v|
    v.name = "docker"
    v.memory = 4096
    v.cpus = 2
  end
```

## Define Docker Provisioner

```
config.vm.provision :shell, inline: "apt-get update"
config.vm.provision :docker
config.vm.provision :docker_login, username: "<username>", email: "<em>", password: "<password>"
config.vm.provision :docker_compose, yml: ["/vagrant/docker-compose.yml"]
```

## Start Docker VM

```
vagrant up
```
