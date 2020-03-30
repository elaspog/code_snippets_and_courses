
# Cheatsheet

## Simple commands

```
ls
cd
pwd
find
echo
cat
```
```
date
```
```
df
du
dd
```
```
id
whoami
chown
chgrp
```
```
wget
curl
```
```
export
alias
```
```
exit
shutdown
reboot
```

## Inline command execution

```
xargs
```

```
NAME=John
echo "Hello $NAME. Current date and time is $(date)"
```

## Background process

```
# execute long running job
# CTRL + Z
jobs
bg
fg
disown -h %1
nohup <command>
<command> &
```

## OS Release

```
cat /etc/os-release
lsb_release -a
hostnamectl
uname -r

cat /proc/version
cat /etc/issue
```

## Programs to install

```
mc
moc
vlc
screen
tmux
```
