
# How to secure your Linux cloud server

https://upcloud.com/community/tutorials/secure-linux-cloud-server/

## Encrypt communications

* avoid using any unencrypted transfer protocols
  * Telnet
  * FTP
  * anything that would send passwords or other sensitive information as plain text
* use
  * SSH (Secure Shell)
  * SCP (Secure Copy)
  * SFTP (SSH File Transfer Protocol)
  * rsync

### SSH

https://www.upcloud.com/support/connecting-to-your-server/

* OpenSSH
* PuTTY SSH Client

### SCP
```
# Copy the file "foo.txt" from the local host to a remote host
scp foo.txt <username>@<remotehost>:/some/remote/directory

# Copy the file "foo.txt" from a remote host to the local host
scp <username>@<remotehost>:foo.txt /some/local/directory
```

### SFTP

* WinSCP

### rsync

The program uses SSH to make the initial connection between the two systems and then invokes rsync on the remote host to determine which parts of the file being synced need to be copied over.

## User account security policies

https://www.upcloud.com/support/managing-linux-user-account-security/

- creating a new user accounts and enabling sudo access control
- avoid using the root account for day to day operations

### Adding a new user

```
# create a new user
adduser <username>

# unlock the new account by setting the password on CentOS and other Red Hat variants
passwd <username>

# sudo access control system might not be installed by default on Debian
apt-get install sudo

# give sudo execution privileges on Ubuntu or Debian servers
adduser <username> sudo

# adding sudo permissions to users on CentOS
gpasswd -a <username> wheel
```

### Disable root login

```
# on Debian or Ubuntu
sudo nano /etc/ssh/sshd_config

# on CentOS and other Red Hat variants
sudo vi /etc/ssh/sshd_config
```
**sshd_config**:
```
PermitRootLogin no
```

```
# CentOS
sudo systemctl restart sshd

# Ubuntu or Debian
sudo service ssh restart
```

### Password policies

```
# CentOS and other Red Hat variants already have it installed by default

# Ubuntu or Debian
sudo apt-get install libpam-cracklib
```

```
# Ubuntu or Debian
sudo nano /etc/pam.d/common-password

CentOS and other Red Hat variants
sudo vi /etc/pam.d/system-auth
```
**common-password** or **system-auth**:
```
password required pam_cracklib.so retry=3 minlen=8 difok=3 dcredit=1 ucredit=1 lcredit=1
```

- **retry** defines how many times the user gets to attempt again
- **minlen** marks the minimum length of the password
- **difok** checks the maximum number of reused characters compared to the user’s old password
- password complexity:
  - **dcredit** is a number of numerals
  - **ucredit** for upper case characters
  - **lcredit** the number of lower case characters

### Restrict SSH to specific user group

OpenSSH server can limit user connections by cross-checking that they belong to the allowed group. Useful if:
- there are multiple users of which some should not need to remote with SSH
- want the added security
  - for example when running web service or database with separate users to the own user

```
# create a new user group
sudo groupadd sshusers

# add username to the same new group
sudo gpasswd -a <username> sshusers

# check that your username was added to the group successfully
groups <username>
# user : user sudo sshusers
```

```
sudo nano /etc/ssh/sshd_config
sudo vi /etc/ssh/sshd_config
```
**sshd_config**:
```
AllowGroups sshusers
```

```
sudo service ssh restart

sudo systemctl restart sshd
```

- any user that does not belong to the allowed group will simply be denied access over SSH, even if their password was entered correctly
- greatly reduces the chance of having a user password brute-forced or guessed with dictionary lists

## Monitoring login authentication

View the authentication logs:
```
# on Ubuntu and other Debian based servers
cat /var/log/auth.log | grep 'ssh.*Invalid'

# on CentOS and other Red Hat variants based servers
cat /var/log/secure | grep 'ssh.*Invalid'
```

View the successful log in times:
```
last
```

### Fail2ban

https://www.upcloud.com/support/installing-fail2ban-on-centos-7/  
https://www.upcloud.com/support/installing-fail2ban-on-debian-8-0/  
https://www.upcloud.com/support/installing-fail2ban-on-ubuntu-14-04/  

  - intrusion prevention framework
  - works together with a packet-control system or firewall
  - it is commonly used to block connection attempts after a certain number of failed tries, effectively giving the user a time-out before their are allowed to try again

#### Installation

```
# Debian
sudo aptitude install fail2ban

# Ubuntu
sudo apt-get install fail2ban

# CentOs
sudo yum install epel-release
sudo yum install fail2ban
```

#### Configuration

Jails are the rules which fail2ban applies to any given application or log file.

```
# make a local configuration
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

sudo nano /etc/fail2ban/jail.local
sudo vi /etc/fail2ban/jail.local
```

jail configuration:
```
[DEFAULT]
ignoreip = 127.0.0.1/8 ::1
bantime  = 10m
findtime = 10m
maxretry = 5

# ...

[sshd]
enabled = true
```

- **ignoreip** - allows you to exclude certain IP addresses from being banned
- **bantime** - determines how long an offending host will remain blocked until automatically unblocked
- **findtime** and **maxretry** - counts of which the find time sets the time window for the max retry attempts before the host IP attempting to connect is the blocked

If there is a sendmail service configured on the server, the email notifications can be anabled from Fail2ban by entering email address to the parameter `destemail` and changing the `action = %(action_)s` to `action = %(action_mw)s`.

#### Apply rules or manually modify

```
# restart the monitor
sudo systemctl restart fail2ban

sudo iptables -L
# any banned IP addresses will appear in the specific chains that the failed login attempts occurred at

# Manually ban and unban IP addresses from the services that have defined jails
# sudo fail2ban-client set <jail> banip/unbanip <ip address>
sudo fail2ban-client set sshd unbanip 83.136.253.43
```

## Use SSH-keys instead of passwords

https://www.upcloud.com/support/using-ssh-keys-for-authentication/

Use SSH-keys for authentication by generating a pair of long key codes:
* **public key** can be safely passed on to the server, can only be used to identify the user who has the private part of the pair
* **private key** keeping securely on private computer, must be kept safe, ensuring that only the user has access to it

## Setup a firewall

https://www.upcloud.com/support/configuring-iptables-on-centos-6-5  
https://www.upcloud.com/support/configuring-iptables-on-debian-8-0/  
https://www.upcloud.com/support/configuring-iptables-on-ubuntu-14-04/  

* set limitations to which connections are allowed using a firewall
* a network security system, that monitors and controls the incoming and outgoing network traffic based on predetermined security rules
* **iptables** - firewall solution in Linux servers
  * On CentOS and other Red Hat variants iptables often comes with some preconfigured rules
  * Ubuntu and Debian servers don’t implement any restrictions by default

## Update your system

```
# upgrade on Ubuntu
sudo apt-get update && sudo apt-get upgrade
# it’s not allowed to add or remove packages even if they’ve become obsolete

# smart upgrade on Ubuntu
sudo apt-get update && sudo apt-get dist-upgrade
# checks package relations and aims to upgrade the most important packages at the expense of less important ones if necessary

# upgrade on Debian
sudo aptitude update && sudo aptitude full-upgrade

# safe upgrade on CentOS
sudo yum update

# unsafe upgrade on CentOS
sudo yum upgrade
# might also remove some packages it deems obsolete even if they are still in use
```

Remember to update other software outside the package manager as well (e.g.: WordPress, Joomla, etc.).

## Minimize vulnerabilities

Not leave open any unnecessary network services that are listening for incoming connections. The server can be tested by scanning for open ports using network tool named **Nmap**.

```
sudo apt-get install nmap
sudo yum install nmap

nmap -v -sT localhost
# lists port numbers and services associated with them that are currently open for local connections

nmap -v -sT <public IP>
# lists port numbers and services associated with them that are currently open for the server’s public IP
# this can be performed from any computer with internet access and Nmap installed
```

## Scan for malware regularly

https://www.upcloud.com/support/scanning-centos-server-for-malware/  
https://www.upcloud.com/support/scanning-debian-8-0-server-for-malware/  
https://www.upcloud.com/support/scanning-ubuntu-14-04-server-for-malware/  

* Linux systems are generally less likely to be infected by malicious software
* harmful program could be running unnoticed for a long time before causing alarming traffic or system damage

## Implement Intrusion Detection System

https://www.upcloud.com/support/installing-snort-on-centos/  
https://www.upcloud.com/support/installing-snort-on-debian/  
https://www.upcloud.com/support/installing-snort-on-ubuntu/  

* **Intrusion Detection System (IDS)** - constantly keeps an eye on server and its network traffic, does not give time to any malware between scans to go about their business unnoticed.
* **Network Based Intrusion Detection System (NIDS)**
  * **Snort**
    * light weight enough to be installed on even the smallest of cloud servers
* **Host Base Intrusion Detection System (HIDS)** - analyses system behaviour and configuration status to detect potential security breaches, compromises, modifications to critical system files, common rootkits, and malicious processes
  * **OSSEC**
    * performs log analysis, file integrity checking, policy monitoring, rootkit detection, real-time alerting and active response
    * it's intended to be configured to on server-client basis, where very light clients are installed on the critical systems, that then send their reports to the OSSEC server for analysis
    * it's ideal for users with multiple cloud servers for centralized security monitoring

### Snort

- monitors the package data sent and received through a specific network interface
- NIDS
  - can catch threats targeting system vulnerabilities using signature-based detection and protocol analysis technologies
  - can identify the latest attacks, malware infections, compromised systems, and network policy violations
- lightweight, open source, available on a multitude of platforms
- can be comfortably installed even on the smallest of cloud server instances
- capable of much more than just network monitoring

#### Installation

- RPM packages for CentOS7
- install from source

##### Preparing your server

```
# Ubuntu 16
sudo apt install -y gcc libpcre3-dev zlib1g-dev libluajit-5.1-dev libpcap-dev openssl libssl-dev libnghttp2-dev libdumbnet-dev bison flex libdnet

# Debian 9
sudo apt-get install -y gcc make libpcre3-dev zlib1g-dev libluajit-5.1-dev libpcap-dev openssl libssl-dev libnghttp2-dev libdumbnet-dev bison flex libdnet

# CentOS7
sudo yum install -y gcc flex bison zlib libpcap pcre libdnet tcpdump
sudo yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
sudo yum install -y libnghttp2
# Development packages
sudo yum install -y zlib-devel libpcap-devel pcre-devel libdnet-devel openssl-devel libnghttp2-devel luajit-devel
```

##### Installation from RPM packages

Snort uses **Data Acquisition library (DAQ)** to make abstract calls to packet capture libraries.

```
sudo yum install https://www.snort.org/downloads/snort/daq-2.0.6-1.centos7.x86_64.rpm
sudo yum install https://www.snort.org/downloads/snort/snort-2.9.12-1.centos7.x86_64.rpm
```

##### Installation from source

```
# temporary download folder
mkdir ~/snort_src && cd ~/snort_src

wget https://www.snort.org/downloads/snort/daq-2.0.6.tar.gz

tar -xvzf daq-2.0.6.tar.gz
cd daq-2.0.6

./configure && make && sudo make install

cd ~/snort_src

wget https://www.snort.org/downloads/snort/snort-2.9.12.tar.gz

tar -xvzf snort-2.9.12.tar.gz
cd snort-2.9.12

./configure --enable-sourcefire && make && sudo make install
```

#### Configuring Snort to run in NIDS mode

```
# updating the shared libraries
sudo ldconfig

# good practice to create a symbolic
sudo ln -s /usr/local/bin/snort /usr/sbin/snort
```

#### Setting up username and folder structure

```
sudo groupadd snort
sudo useradd snort -r -s /sbin/nologin -c SNORT_IDS -g snort

# if installed Snort using yum these directories should have already been added at install
sudo mkdir -p /etc/snort/rules
sudo mkdir /var/log/snort
sudo mkdir /usr/local/lib/snort_dynamicrules

sudo chmod -R 5775 /etc/snort
sudo chmod -R 5775 /var/log/snort
sudo chmod -R 5775 /usr/local/lib/snort_dynamicrules
sudo chown -R snort:snort /etc/snort
sudo chown -R snort:snort /var/log/snort
sudo chown -R snort:snort /usr/local/lib/snort_dynamicrules

sudo touch /etc/snort/rules/white_list.rules
sudo touch /etc/snort/rules/black_list.rules
sudo touch /etc/snort/rules/local.rules

# Skip if installed with yum
sudo cp ~/snort_src/snort-2.9.12/etc/*.conf* /etc/snort
sudo cp ~/snort_src/snort-2.9.12/etc/*.map /etc/snort
```

Download the detection rules Snort will follow to identify potential threats. Snort provides three tiers of rule sets:
- **community** - are freely available though slightly limited
- **registered** - access to your Oink code, which lets the download of the registered users rule sets by registering for free on the website
- **subscriber** - available to users with an active subscription to Snort services

#### Option 1. Using community rules

```
wget https://www.snort.org/rules/community -O ~/community.tar.gz
sudo tar -xvf ~/community.tar.gz -C ~/
sudo cp ~/community-rules/* /etc/snort/rules

```
Snort on Ubuntu expects to find a number of different rule files which are not included in the community rules.
```
# comment out the unnecessary lines
sudo sed -i 's/include \$RULE\_PATH/#include \$RULE\_PATH/' /etc/snort/snort.conf
sudo sed -i 's/include \$RULE\_PATH/#include \$RULE\_PATH/' /etc/snort/snort.conf
sudo sed -i 's/include \$RULE\_PATH/#include \$RULE\_PATH/' /etc/snort/snort.conf
```

#### Option 2. Obtaining registered user rules

```
# replace the oinkcode with personal code
wget https://www.snort.org/rules/snortrules-snapshot-29120.tar.gz?oinkcode=oinkcode -O ~/registered.tar.gz

# extract the rules over to configuration directory
sudo tar -xvf ~/registered.tar.gz -C /etc/snort
```

enabling additional rules can be by uncommenting inclusions at the end of the snort.conf file

#### Configuring the network and rule sets

edit **/etc/snort/snort.conf**:
```
# ...

# Setup the network addresses you are protecting
ipvar HOME_NET server_public_IP/32

# Set up the external network addresses. Leave as "any" in most situations
ipvar EXTERNAL_NET !$HOME_NET

# Path to your rules files (this can be a relative path)
var RULE_PATH /etc/snort/rules
var SO_RULE_PATH /etc/snort/so_rules
var PREPROC_RULE_PATH /etc/snort/preproc_rules

# Set the absolute path appropriately
var WHITE_LIST_PATH /etc/snort/rules
var BLACK_LIST_PATH /etc/snort/rules

# ...

# unified2
# Recommended for most installs
output unified2: filename snort.log, limit 128

# ...

# allow to load any custom rules
include $RULE_PATH/local.rules

# allow community rules
include $RULE_PATH/community.rules
```

#### Validating settings

```
sudo snort -T -c /etc/snort/snort.conf
# -T enables test mode
```

Typical problems are missing files or folders can resolved by either:
  - adding any missed step in the above setup above
  - by commenting out unnecessary inclusion lines in the snort.conf file

#### Testing the configuration

add the content into the file **etc/snort/rules/local.rules**:
```
alert icmp any any -> $HOME_NET any (msg:"ICMP test"; sid:10000001; rev:001;)
```
The rule consists of the following parts:
- action for traffic matching the rule, `alert` in this case
- traffic protocol like `TCP`, `UDP` or `ICMP`
- the **source address** and **port**, simply marked as any to include all addresses and ports
- the **destination address** and **port**, `$HOME_NET` as declared in the configuration and any for port
- some additional bits
  - **log message**
  - **unique rule identifier** (`sid`) which for local rules needs to be 1000001 or higher
  - **rule version number**

```
sudo snort -A console -i eth0 -u snort -g snort -c /etc/snort/snort.conf
```
- `-A` console options to print the alerts to stdout
- select **network interface** with the **public IP address** of your server
  - e.g.: `eth0`

```
# lists all of your currently configured network interfaces
ip addr
```

With Snort up and running ping the server from any other computer. A notice for each ICMP call should appear in the terminal running Snort.

Snort records the alerts to a log: `/var/log/snort/snort.log.timestamp`.

```
snort -r /var/log/snort/snort.log.    # complete your command by pressing TAB
```

#### Running Snort in the background

To run Snort on CentOS as a service in the background a startup script should be downloaded from Snort documentation. If Snort was installed using yum, the startup script should be already configured.

```
# get the startup script
wget https://www.snort.org/documents/snort-startup-script-for-centos -O ~/snortd
sudo chmod 755 ~/snortd && sudo mv ~/snortd /etc/init.d/

# reload the system daemon
sudo systemctl daemon-reload

# start the service (usual systemctl commands: start, stop, restart, status)
sudo systemctl start snortd
sudo systemctl status snortd
```
