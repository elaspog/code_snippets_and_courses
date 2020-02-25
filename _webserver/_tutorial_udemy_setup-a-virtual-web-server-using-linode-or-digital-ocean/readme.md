
# Setup a Virtual Web Server using Linode or Digital Ocean

https://www.udemy.com/course/setup-a-virtual-web-server-using-linode-or-digital-ocean

## S01 Production Server Setup using Linode

### S01/E01 Introduction & Overview

### S01/E02 Cloud Hosting Registration

https://www.linode.com/

### S01/E03 Creating a Virtual Server

- add the cheapest Linode
- select the closest location to the users

https://www.linode.com/backups

### S01/E04 Linode Settings and Configuration

- Linodes / Dashboard / Settings
  - change Linode label
  - shutdown watchdog
    - automatically restarts Linode if unexpectedly powers off
  - set email alerts

### S01/E05 Deploying an Image - Ubuntu Latest LTS Version

- Linodes / Dashboard / Dashboard
  - Configuration Profiles - servers operating system and configuration
    - create customized configuration profiles or use prebuilt packages
  - Deploy an Image link
    - Ubuntu 14.04 LTS
    - default size settings
    - root password

### S01/E06 Linode Dashboard

- Linodes / Dashboard / Dashboard
  - Boot the configuration profile
  - Add storage if needed (Storage panel)
  - Check the used bandwidth (Network panel)
  - Activity monitoring

### S01/E07 Remote Access

- Linodes / Dashboard / Remote Access
  - SSH access
  - public IPv4 address, IPv6 address, Default Gateway, DNS Resolvers
  - Private network using multiple Linodes
    - transfer data between Linodes that are in same data center
      - fast and cost effective
    - practical uses: database replication and backups
  - web based console access

### S01/E08 Download PuTTY and PuTTYgen - Windows

https://www.putty.org

- putty.exe
- puttygen.exe

### S01/E09 Launch Terminal - MAC

- Finder / Applications / Utilities / Terminal

### S01/E10 Intro to Command Console

### S01/E11 Connecting with PuTTY - Windows

- IP address from Linode
- in putty
  - enter IP address
    - save the connection
    - open the connection
  - root username
  - enter password configured on Linode control panel

### S01/E12 Connecting with Terminal - MAC

```
ssh root@<SERVER_IP>
# enter password configured on Linode control panel
```

### S01/E13 Maintenance Commands

```
apt-get update
apt-get upgrade
```

### S01/E14 File and Directory Commands

```
pwd
ls
cd ..
ls
cd var
cd /
ls
reset
```

### S01/E15 Installing LAMP Stack

Lamp = Linux - Apache - MySQL - PHP

```
apt-get install lamp server^
# enter password for mysql root user

apt-get install apache-utils

apt-get install phpmyadmin
# select apache2
# configure database with db-config
# enter password for database's adminstrative user
# enter mysql password for phpmyadmin

# link phpmyadmin to apache server
ln -s /etc/phpmyadmin/apache.conf /etc/apache2/conf-enabled/phpmyadmin.conf

# restart apache service
/etc/init.d/apache2 reload
```
in browser:
```
<SERVER_IP>
<SERVER_IP>/phpmyadmin
```

### S01/E16 Server Host Name and Date

```
echo "saturn" > /etc/hostname
hostname -F /etc/hostname
nano /etc/hosts
# enter:
# <SERVER_IP>\tsaturn

dpkg-reconfigure tzdata
date
```

### S01/E17 Creating a User - Ubuntu

- sudo

```
adduser bob
# enter a password for new user

# add user to soudo group
adduser bob sudo
```

- log back in as `bob`

### S01/E18 Ubuntu SSH Authentication - Windows

- puttygen.exe
  - rsa
  - number of bits: 2048
  - copy the key into file: `public.txt`
  - in puttygen enter a key passphrase
  - click Save private key
    - save as `private.ppk`
- putty.exe
  - log in as `bob` with password

```
mkdir ~/.ssh; touch ~/.ssh/authorized_keys; chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
# copy the public key into this file
```

- putty.exe
  - load the Linode session
  - expand: Connection/SSH/Auth
  - click: Browse
  - load `private.ppk`
  - go to: Session/Open
  - save the Linode session
  - log in as `bob` with SSH key
  - enter passphrase

### S01/E19 Ubuntu SSH Authentication - MAC

```
ssh-keygen
# enter passphrase for the key

ssh bob@<SERVER_IP>
# login
ls -la
mkdir ~/.ssh
exit

scp ~/.ssh/id_rsa.pub bob@<SERVER_IP>:/home/bob/.ssh/uploaded_key.pub

ssh bob@<SERVER_IP>
cd .ssh
echo `cat ~/.ssh/uploaded_key.pub` >> ~/.ssh/authorized_keys
ls -al
exit

# login to server using ssh key
ssh bob@<SERVER_IP>
# enter passphrase
```

### S01/E20 Web Root Permissions

- Add `bob` user upload rights

```
cd /var/www/html
ls
# index.html

cd /
ls -la /var/www

sudo chown -R bob /var/www
```

### S01/E21 Remote Desktop Connection

- XFCE
- VNC Server

```
sudo reboot

# login as: bob

sudo apt-get update
sudo apt-get upgrade

sudo apt-get install xfce4 xfce4-goodies tightvncserver
vncserver
# enter password and verify it
# not necessary to make view-only password

vncserver -kill :1
mv ~/.vnc/xstartup ~/.vnc/xstartup.bak
nano ~/.vnc/xstartup
```

~/.vnc/xstartup:
```
#!/bin/bash
xrdb $HOME/.Xresources
startxfce4 &
```

```
sudo chmod +x ~/.vnc/xstartup
sudo nano /etc/init.d/vncserver
```

/etc/init.d/vncserver:
```
#!/bin/bash
PATH="$PATH:/usr/bin"
export USER="bob"
DISPLAY="1"
DEPTH="16"
GEOMETRY="1024x768"
OPTIONS="-depth ${DEPTH} -geometry ${GEOMETRY} :${DISPLAY} -localhost"
. /lib/lsb/init-functions

case "$1" in
start)
log_action_begin_msg "Starting vncserver for user '${USER}' on localhost:${DISPLAY}"
su ${USER} -c "/usr/bin/vncserver ${OPTIONS}"
;;

stop)
log_action_begin_msg "Stopping vncserver for user '${USER}' on localhost:${DISPLAY}"
su ${USER} -c "/usr/bin/vncserver -kill ${DISPLAY}"
;;

restart)
$0 stop
$0 start
;;
esac
exit 0
```

```
# make it executable
sudo chmod +x /etc/init.d/vncserver

# test the vnc server service by creating a new vnc server instance
sudo service vncserver start

sudo reboot
```

### S01/E22 Installing Tight VNC Viewer - Windows

www.tightvnc.com

- TightVNC Java Viewer
  - unzip


- putty:
```
vncserver
```


- tightvnc
  - \<SERVER_IP\>:5901
  - \<VNC_SERVER_PASSWORD\>

### S01/E23 Installing RealVNC Viewer - MAC

www.realvnc.vom

```
ssh bob@<SERVER_IP>
vncserver
```

- vncviewer
  - \<SERVER_IP\>::5901
  - \<VNC_SERVER_PASSWORD\>

### S01/E24 Ubuntu Desktop Basics

### S01/E25 Disable Root and Password Access

```
sudo nano /etc/ssh/sshd_config
```
- Change the configuration from:
```
PermitRootLogin yes
# PasswordAuthentication yes
```
- Change the configuration to:
```
PermitRootLogin no
PasswordAuthentication no
```

```
sudo reboot
```

- after trying to login
  - the `root` user is not allowed
  - the password based authentication does not work, only the SSH key based

### S01/E26 Re-sizing a Linode Server

- Linodes / Dashboard / Resize
- The system shuts down the Linode in order to do the migration

### S01/E27 Creating Backups on Linode

- Linodes / Add a Linode
  - same plan
  - same datacenter
    - otherwise the backup process takes much longer
  - select the Dashboard at existing Linode
    - Clone tab
    - check and select the Configuration Profile
    - select the destination Linode
  - select the Dashboard / Settings at new Linode
    - rename the Linode

### S01/E28 Changing Root Password through Linode

- Linodes / Dashboard / Rescue / Reset Root Password
- reboot the server

### S01/E29 Linode DNS Manager

- A record = IPv4 address the domain name resolves to
- AAAA record = IPv6 address the domain name resolves to
- MX rcord = mailserver responible for emails sent to a domain name
- SOA = Start of Authority
  - DNS name server is the best source of data specified for domain name (primary DNS)
- NS records = nameservers
- CNAME records are used for subdomains
  - if `mywebdevcourse.com` is the domain name, valid subdomain examples are:
    - `blog.mywebdevcourse.com`
    - `support.mywebdevcourse.com`
- TXT = any arbitrary text data
  - max length: 1024 characters
  - might be required to fill for third party service
    - e.g.: verify for google apps the ownership of the domain name
- SRV records


- Google Apps for Work
  - apps.google.com
  - offers personalized email domain names


- DNS Manager
  - Add a domain zone
    - add the registered domain name
    - add server administrator email address
    - select the server
  - Remove MX records (there is no mail server configured yet)
  - Remove mail servers from A/AAAA records
  - Add a new CNAME record
    - hostname: blog
    - aliases to: `mywebdevcourse.com`

### S01/E30 Amending GoDaddy Name Servers

www.godaddy.com

- Linode
  - boot the webserver: Dashboard / selected linode / Boot
  - confirm the apache is running

in browser:
```
<SERVER_IP>
```

- GoDaddy
  - Domains menu
  - Manage DNS
  - Manage button under Nameservers
  - Change from Standard to Custom
  - Add Nameserver
    - add all the nameservers from Linode / DNS Manager / selected zone file
- wait 24-48 hours

in browser:
```
<DOMAIN_NAME>
```

## S02 Deploying a Virtual Server on Digital Ocean

> This section is already processed from another course.

### S02/E31 Deploying a Virtual Server on Digital Ocean

### S02/E32 Creating and Attaching a Floating IP

### S02/E33 Intro to Terminal and Root User Authentication

### S02/E34 Apache Installation and Testing

### S02/E35 Installing MySQL Database Management System

### S02/E36 Installing and Testing PHP

### S02/E37 Installing PhpMyAdmin for Database Administration
