
# cPanel installation

[How to install cPanel in your server](https://www.youtube.com/watch?v=ffxgv5qt8_k)

channel: [Copahost Webhosting](https://www.youtube.com/channel/UCl4oFYm6RyZswsTH3Wm0TRw "Copahost Webhosting")

```
yum upgrade
yum install wget -y

wget https://securedownloads.cpanel.net/latest

# in web browser:
<IP_ADDRESS>:2087
# server_root/server_root_password

/usr/local/cpanel/cpkeyclt
```

if error happens while installing:

> NetworkManager is installed and running, or configured to startup.
> cPanel does not support NetworkManager enabled systems.  The installation cannot proceed.
```
systemctl stop NetworkManager.service
systemctl disable NetworkManager.service
```

if error happens while installing:

    yum groupinstall base -y
