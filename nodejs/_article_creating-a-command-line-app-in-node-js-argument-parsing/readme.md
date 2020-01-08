
# Creating a command-line app in Node.js: Argument Parsing

https://dev.to/kumar_abhirup/creating-a-command-line-app-in-node-js-argument-parsing-40ph

## console.log(process.argv)

```
cd process.argv
node index.js wow this is an argument
```

## Libraries

* Commander https://www.npmjs.com/package/commander
* Minimist https://www.npmjs.com/package/minimist
* Meow https://github.com/sindresorhus/meow

### Commander

```
npm init -y
npm i commander -s -f
```

### Corrected version of the tutorial example

* __name__ can't be used as the name of the parameter, because there is a private __\_name__ function, which gives back the name of the script when called.

```
node index.js --version
node index.js -V
node index.js --param MyParam
node index.js demo
```
