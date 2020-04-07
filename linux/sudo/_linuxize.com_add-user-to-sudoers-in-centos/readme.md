
# How to Add User to Sudoers in CentOS

https://linuxize.com/post/how-to-add-user-to-sudoers-in-centos/


- Options:
  - Add the user to the `sudoers` file
  - Add the user to the sudo group defined in the `sudoers`
    - Members of the `wheel` group are granted with sudo privileges
      - Works on **RedHat** based distributions like **CentOS** and **Fedora**


- `/etc/sudoers`
  - users’ and groups’ sudo privileges are configured in  
- `/etc/sudoers.d`
  - files inside this directory are included in the `sudoers` file  
- `visudo`
  - the command checks the `/etc/sudoers` file for syntax errors when it's saved
  - if there are any errors, the file is not saved
  - if you open the file with a text editor, a syntax error may result in losing the sudo access
  - typically uses `vim` to open the `/etc/sudoers`
  - to change editor set `EDITOR` variable:
  ```
  EDITOR=nano visudo
  ```

## Adding User to the wheel Group

Members of `wheel` group are **able to run all commands** via `sudo` and **prompted to authenticate** themselves with their password when using `sudo`.

Set:
```
usermod -aG wheel username
```
Tets:
```
sudo whoami
# root

whoami
# username
```

## Adding User to the sudoers File

Allows you to grant customized access to the commands and configure custom security policies for the user

```
visudo
```
Editing `/etc/sudoers` or `/etc/sudoers.d`:
```
# allow the user to run all commands via sudo
username ALL=(ALL) NOPASSWD:ALL

# allow the user to run only specific commands via sudo
username ALL=(ALL) NOPASSWD:/usr/bin/du,/usr/bin/ping
```

Instead of editing the `sudoers` file, the same can be achieved by creating a new file with the authorization rules in the `/etc/sudoers.d` directory:
```
echo "username  ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/username
```
