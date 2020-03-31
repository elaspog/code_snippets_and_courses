
# Plugins

* **vagrant-reload**: reboots the VM
* **vagrant-scp**: copy files into VM
* **vagrant-vbguest**: checks VirtualBox guest version on the box and if required will update it to the current version of host machine VirtualBox
* **vagrant-disksize**: provides capability to set VM disk size
* **vagrant-proxyconf**: proxy settings for Vagrant
* **vagrant-gatling-rsync**: syncs the mounted resources from host to guest machine
* **vagrant-docker-compose**: installs Docker Compose in guest machine and runs container defined in docker-compose.yml
* **vagrant-docker-login**: provides capability to login into Docker repository

## Check Vagrant Plugins

```
unless Vagrant.has_plugin?("vagrant-docker-compose")
  raise 'vagrant docker-compose plugin is not installed! Please install with: vagrant plugin install vagrant-docker-compose'
end
```

## Install Vagrant Plugins Manually

```
vagrant plugin install plugin_name
```

## Install Vagrant Plugins Automatically

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

## Plugin settings

### vagrant-scp

```
vagrant plugin install vagrant-scp

vagrant scp host_os/path/to/file :~/file
vagrant scp host_os/path/to/file :guest_os/path/to/file
```

### vagrant-reload

```
config.vm.provision :shell, path: "prescript.sh"
config.vm.provision :reload
config.vm.provision :shell, path: "postscript.sh"
```

### vagrant-disksize

```
config.disksize.size = '50GB'
```

### vagrant-docker-login

```
config.vm.provision :docker_login, username: "<username>", email: "<em>", password: "<password>"
```

### vagrant-docker-compose

```
# set up Docker in the new VM:
config.vm.provision :docker

# install docker-compose into the VM and run the docker-compose.yml file - if it exists)
config.vm.provision :docker_compose, yml: ["/vagrant/docker-compose.yml"]
config.vm.provision :docker_compose, yml: "/vagrant/docker-compose.yml", run:"always"
```

### vagrant-proxyconf

```
config.proxy.http = "http://10.10.10.10:8080"
config.proxy.https = "http://10.10.10.10:8080"
config.proxy.no_proxy = "localhost,127.0.0.1,mydomain"
```
