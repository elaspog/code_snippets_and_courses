
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

creating a new user accounts and enabling sudo access control

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
