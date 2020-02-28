# Git

## Configure repository

```
git config --global user.name "My Name"
git config --global user.email "my@myaddress.com"
git config --global push.default matching
git config --global alias.co checkout

git remote add origin git@github.com:myusername/myreponame.git
git push -u origin master

git init
git add .
git commit -am "Initial Commit"
```

## LFS configuration

```
# install git-lfs executable

# in repository:
git lfs install

git lfs track "*.jpg"
git add .gitattributes
git add file.jpg

git commit -m "Add binary file"
git push origin master

git lfs ls-files
```

## Useful commands

```
# count all commit
git rev-list --all --count

# count all commit for a revision (HEAD, master, <commit_hash> etc.)
git rev-list --count <revision>
```
