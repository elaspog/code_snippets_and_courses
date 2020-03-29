
# A guide to creating a NodeJS command-line package

https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e

## 1. Create a NodeJS package

```
mkdir my-node-command
cd my-node-command
npm init
```
## 2. Create a NodeJS command-line script

Create a JavaScript file
```
touch cli.js
```
Convert the JavaScript file into a NodeJS command-line script by inserting the following line into the newly created file as the first line:
```
#!/usr/bin/env node
```

Make the JavaScript command-line file executable

```
chmod +x cli.js           # Make the file executable
```

Run the script file

```
node.cmd cli.js
```

## 3. Map a command-line script to a command name

Supply a bin field in __package.json__ which is a map of command name to local file name:
```
"bin": {
  "say-hello": "./cli.js"
}
```

__WARNING__: do not want it to clash with existing popular command names.

## 4. Link your command for development

__npm link__
* is like a NodeJS package installation simulator
* allow to locally ‘symlink a package folder’
* it will locally install any command listed in the bin field of our package.json
* also applies to npm install
* symlink all files specified in the bin field of package.json

```
npm link
say-hello
```

## 5. Publish the applicaiton

Publish into NPM registry: https://registry.npmjs.org/my-node-command

```
npm publish
```
