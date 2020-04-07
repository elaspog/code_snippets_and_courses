
# Cheatsheet

## Users

```
sudo adduser username
sudo passwd username
sudo usermod -aG wheel username
sudo userdel username
sudo userdel -r username
```

### adduser

Creates `/home/username` directory.
Copies files from `/etc/skel` to the user’s home directory.

### userdel

If the user was granted sudo privileges it will be removed from the `wheel` group, as well as from any other groups the user was a member of.


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
