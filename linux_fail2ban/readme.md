
# Cheatsheet

service fail2ban restart
fail2ban-client status sshd

tail -f /var/log/auth.log
tail -f /var/log/secure


iptables -L INPUT -v -n
iptables -L f2b-sshd -v -n
iptables -L fail2ban-ssh -v -n


ll -h /var/log/fail2ban.log*


sudo zgrep 'Ban' /var/log/fail2ban.log* | wc -l



sudo iptables -L -n | awk '$1=="REJECT" && $4!="0.0.0.0/0"'
sudo iptables -L -n | awk '$1=="REJECT" && $4!="0.0.0.0/0" {print $4}'

sudo iptables -L -n | awk '$1=="DROP" && $4!="0.0.0.0/0"'
sudo iptables -L -n | awk '$1=="DROP" && $4!="0.0.0.0/0" {print $4}'


route -n
