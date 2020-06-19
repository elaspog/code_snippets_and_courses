
# Deno: The Complete Guide Zero to Mastery

https://www.udemy.com/course/deno-the-complete-guide-zero-to-mastery

## S1 Introduction

### S1/L1 Course Outline

- Deno Foundations
- Deno vs Node
- Mdules + Tooling
- File I/O
- Backends and APIs
- NASA Project
  - Performance
  - Testing
  - Security
  - Debugging
  - Docker
  - Production + Deployment
- How JavaScript Works
- TypeScript

### S1/L2 Join Our Online Classroom!

https://discord.gg/kDsZfGc

https://discord.com/invite/kDsZfGc

### S1/L3 Exercise: Meet The Community

## S2 Deno Foundations

### S2/L4 Why Deno?

https://deno.land/std

- Runtime for JavaScript and TypeScript that uses V8 and is built in Rust
- Secure by default
- Ships a single executable file
- Has built-in utilities, like dependency inspector (deno info), code formatter (deno fmt)
- Has set of reviewed (audited) standard modules that are guaranteed to work with Deno

### S2/L5 Deno Runtime And V8 Engine

- **V8 engine**:
  - written in C++
  - turns JavaScript code into machine code, instructions understood by browser
- **Deno** and **Node** are **runtimes** built on V8 engine
  - they allow to run JavaScript (or TypeScript) to run outside the browser

### S2/L6 Deno Installation

test installation:
```sh
which deno
# outputs path for deno

#open /usr/local/bin/deno
```

### S2/L7 Quick Note: Installing Deno

https://repl.it/languages/deno#index.ts

### S2/L8 MAC/LINUX Installation Tips

- Add Deno to PATH (via bash profile)
  - Necessary if Deno was installed with script

In the example fish shell is used: `~/.config/fish/config.fish`
```sh
export DENO_INSTALL="/Users/<USERNAME>/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"
```

### S2/L9 WINDOWS Installation Tips

### S2/L10 Setting Up Our Developer Environment

deno1.js:
```js
function a() {
  console.log(42)
}

a()
```

```sh
deno run deno1.js
```

deno2.ts:
```js
const a: string = 'Andrei'
console.log(a)
```

```sh
deno run deno2.ts
# deno compiles the file, TypeScript is converted to JavaScript
```

- For Node to use TypeScript modules need to be installed
- Deno has built-in TypeScript compiler
  - compiles TypeScript into JavaScript without additional modules installed

### S2/L11 Quick Note: Official VS Code Plugin

https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno

the recommended is **denoland** instead of **justjavac**

### S2/L12 Our First Deno App

**deno.js**

deno.js:
```js
const food = Deno.args[0]

if (food === 'love'){
    console.log('🦕...Deno is born!')
} else {
    console.log('🥚...this egg needs some love')
}
```

```sh
deno run deno.js "love"
```

### S2/L13 Exercise: Our First Deno App

### S2/L14 The Most Important Video

### S2/L15 Deno Internals And Architecture

- Deno Process
  - program in execution
  - sandbox
- **rusty_v8**
  - allows the **V8 engine** to communicate with the rust code that deno has when other than JavaScript needs to be executed
    - e.g. file access
  - the 'frontend' of the deno runtime
  - written in C++ because V8 is written in C++
- rust code
  - the 'backend' of the deno runtime
  - can access files
- **deno core**
  - send - send information to rust
  - recv - receive message from rust
- asynchronous I/O
  - e.g. `setTimeout`
  - multitple operations at the same time
  - event loop, thread pool, workers
  - **tokio** library (rust library)
- rust
  - multi-paradigm language
  - very good safety especially with memory
  - extremely performant
- node
  - is written c++
  - libuv library for asynchronous I/O
- browser
  - has web workerss

### S2/L16 Recommended Path: JavaScript Runtimes

### S2/L17 Deno Metrics

- `Deno.metrics()`
  - gives back low level information about the communication between the Deno JavaScript and Deno Rust sides
- `setTimeout()`
  - not part of the JavaScript language, therefore not part of the V8 engine
  - Deno implements that

```sh
deno run deno.js "love"
```

```js
// previous demo.js
console.table(Deno.metrics())
// opsDispatched: 1
// opsDispatchedSync: 1
// opsDispatchedAsync: 0
// opsCompleted: 1
// opsCompletedSync: 1
// opsCompletedAsync: 0
```

```js
// previous demo.js
setTimeout(()=>{
  console.log("check")
}, 1000)
console.table(Deno.metrics())
// opsDispatched: 2
// opsDispatchedSync: 1
// opsDispatchedAsync: 1
// opsCompleted: 1
// opsCompletedSync: 1
// opsCompletedAsync: 0
```

```js
// previous demo.js
setTimeout(()=>{
  console.log("check")
  console.table(Deno.metrics())
}, 1000)
// opsDispatched: 3
// opsDispatchedSync: 2
// opsDispatchedAsync: 1
// opsCompleted: 3
// opsCompletedSync: 2
// opsCompletedAsync: 1
```

### S2/L18 Exercise: Deno Architecture

- Deno Rust is called when the `Deno` or `window` namespaces are used

deno.js:
```js
console.log(window)
```

```sh
deno run deno.js
# window object
```

node.js:
```js
console.log(global)
```

```sh
node node.js
# global object
```

- `window` object
  - this is not JavaScript
  - contains extra tools and APIs provided by deno  what can be used
- `global` object
  - node version of the deno's `window` object
- some property and function names are common between `global` and `window` objects, but some not
  - node is missing the compatibility with the browser
  - deno tries to have browser-compatible API

### S2/L19 Web Developer Monthly

https://zerotomastery.io/blog/?tag=WDM

https://zerotomastery.io/blog/

## S3 Deno vs Node

### S3/L20 Deno Game Changers

- First class TypeScript
  - Deno does not need any module to run TypeScript
  - Node need a module, like `ts-node`
- ES modules
  - Node uses **CommonJS**
  ```sh
  npm install bcrypt
  ```
  ```js
  const bcrypt = require("bcrypt");
  ```
    - non standard way to include code
  - ES6 modules
  ```js
  import "https://deno.land/std/examples/welcome.ts"
  ```
  ```
  deno run deno.js
  ```
    - standard javascript way to import
- Security first
  - with Node the installed package can do anything
  - Deno creates a sandbox
  ```js
  import "https://deno.land/std/examples/chat/server.ts"
  ```
  ```sh
  deno run deno.js
  # Permission Denied
  deno run --allow-net deno.js
  # OK
  ```
  ```
  localhost:8080
  # chat application running
  ```
- "Decentralized" modules
  - NPM is owned by Microsoft
  - with deno any code can be imported via it's HTTP url
- Standard Library
  - approved/developed/tested by the creators of deno

### S3/L21 Deno Game Changers 2

- Built In Tooling
  - Professional setup for Node: e.g. `ts-node` to run TypeScript, `jest` as testing library, `prettier` to format code, `nodemon` to check file changes
  - Deno has these built-in
- Browser Compatible API
  - unless Deno namespace is used, the program should run in the browser as well without changing anything
  - great for frontend developers
  - deno implements web standards
- Single Executable
  - portable
- Async returns Promises
  - Node was created before introducing Promise syntax in JavaScript
    - sometimes needs wrapping: Promisify
    - new JS features are followed by workarounds
  - Deno
    - cleaner version of JavaScript
    - JavaScript Promise is translated to Rust Future
- Opinionated Modules
  - Deno Manual / Style Guide

### S3/L22 Will Deno Kill NodeJS?

### S3/L23 Single Executable To Rule Them All

https://github.com/denoland/deno/issues/986

- Deno = Runtime + Package Manager
  - the runtime executes the JavaScript files given as a parameter
- Single Executable = run and deploy program without external dependencies
  - the executable code is packed with the runtime
  - language like go has this feature `go build main.go`

### S3/L24 Deno Security

https://github.com/denoland/deno

- General rule: don't trust in anybody
  - if not writing your own code
  - if accepting user input
  - if using third party modules
- (Node) Projects can be hackeds
- SandBox examples:
  - Virtual Machine, Docker Container, Browser sandbox, Mobile Apps

### S3/L25 Deno Permissions

```
# PowerShell
echo $env:USERNAME

# Command Prompt
echo %USERNAME%

# Bash
echo $USER
```

main.ts:
```js
console.log("Hello", Deno.env.get("USER"));
```

```
deno run main.ts
# Permission error

deno run --allow-env main.ts
# Permission given for accessing enviroment variables
```

Not recommended to give all permissions:
```
deno run --allow-all main.ts
deno run -A main.ts
```

### S3/L26 Deno Permissions 2

- to the program from command line a shell script can be used to define the security parameters, but
  - different versions of the scripts (testing, running, caching the program) are needed
  - multiple platforms/shells/terminals require different scripts
- to avoid maintaining several versions of the scripts, the program can be installed with permissions

working directory `deno-example`:
```
# deno install
deno install --allow-env main.ts
# deno-example can be run from anywhere

deno-example
```

```
deno help example
```
- install can be done with explicit naming, with `-n/--name`
- otherwise parent path is used

### S3/L27 Deno Permissions 3

https://github.com/srackham/drake

- Task Runner - to help development process with custom set of commands/tasks
  - Build Automation Tools: Make, Ant, Rake, MSBuild, etc.
  - Deno's variant of Make is Drake

Drakefile.ts:
```js
import { desc, run, task, sh } from "https://deno.land/x/drake@v1.2.3/mod.ts";

desc("Minimal Drake task");
task("hello", [], async function() {
  console.log("Hello from Drake!");
  await sh("deno run --allow-env main.ts");
});

run()
```

```sh
# give all permissions do Drakefile, because it's just a messenger
# give the task name
deno run -A Drakefile.ts hello
# downloading latest files from Drake
# starting task
# message from Drakefile
# message form program
# execution time
```

- Drake
  - provides a full API for scripting tasks
  - Drakefiles are fully featured Deno typescript programs, they can do anything
    - that NPM scripts do in Node and more
    - that deno does

## S4 Deno Modules And Tooling

### S45/L28 How Modules Work In Deno

**deno.js**  
**deno2.js**  
**deno3.js**  

modules = JS and TS files
ES6 import syntax


`deno.js`:
```js
const food = Deno.args[0]
fetch
if (food === 'love'){
    console.log('🦕...Deno is born!')
} else {
    console.log('🥚...this egg needs some love')
}
```

```sh
deno --help
deno info 'deno.js'
# type
# dependencies
# file location
```

`deno2.js`:
```js
export function denode(input){
  if (input.toLowerCase() === 'node'){
    return input.split("").sort().join("");
  }
  return input;
}
```

`deno3.js`:
```js
import { denode } from './denode.js'

console.log(denode('NODE'))
```

```sh
deno run deno3.js
# output: DENO
```

- in `import` statement the file extension is not assumed to be JS, the filetype has to be explicitly defined

### S4/L29 URL Modules

- Deno recommends the modules to be written in TypeScript

`deno3.js`:
```js
import { denode } from './deno2.js'
import "https://deno.land/std/examples/welcome.ts"

console.log(denode('NODE'))
```

```sh
deno info 'deno2.js'
# no dependency

deno info 'deno3.js'
# downloads the dependency from the internet
# compiles because it's a typescript file
# http dependency is lited
# local file dependency 'deno2.js' is listed
```

- any ES module can be used with Deno, even if the package itself is not using deno
- the remote file is: https://deno.land/std/examples/welcome.ts
  - if opened from web browser a HTML page is rendered around the file
  - if referenced from deno package the content of the file is downloaded

### S4/L30 Standard Library

- First version of the Deno was written in Go language
  - many concepts originate from Go language
- Later versions of the Deno were based on Rust
- JavaScript never had a standard library
  - no need to reinvent the wheel again
  - is and will be actively maintained by Deno team

### S4/L31 3rd Party Modules

- deno doesn't understand CommonJS pattern
- Deno requires file extension
- Node now supports ES6 syntax for importing modules
- NPM packages wouldn't work with Deno
  - unless the imports are not rewritten by module developers

### S4/L32 Deno Caching

- Deno caches the downloaded files, e.g.: https://deno.land/std/examples/welcome.ts
  - no need to download the file again
  - if hte cache is deleted it automatically downloads the dependencies again
- cache directory: `$DENO_DIR` - the defaults can be changed it this environment variable is set
  - Linux/Redox: `$XDG_CACHE_HOME/deno` or `$HOME/.cache/deno`
  - Windows: `%LOCALAPPDATA%/deno` (`%LOCALAPPDATA%` = `FOLDERID_LocalAppData`)
  - MacOS: $`HOME/Library/Caches/deno`
  - if something fails, it falls back to `$HOME/.deno`

```
deno run deno3.js

deno run --reload deno3.js
```

### S4/L33 Deno Caching 2

- if the server storing the dependencies goes down:
  - node downloads packages into `node_modules` folder
  - deno caches into `$DENO_DIR` location
- in production

```
git clone git@github.com:odziem/planet-csv-deno.git
cd planet-csv-deno
```

open and check the content of the dependency:
```
open .
code mod.ts
```

run the file:
```
deno run mod.ts
```

set cache directory:
```
mkdir deno_dir

set DENO_DIR=deno_dir     # windwos cmd
set DENO_DIR ./deno_dir   # fish
export DENO_DIR=deno_dir  # bash

deno cache mod.ts
```

- deno cache directory can be added to source control

```sh
# Download the dependencies.
DENO_DIR=./deno_dir deno cache src/deps.ts

# Make sure the variable is set for any command which invokes the cache.
DENO_DIR=./deno_dir deno test src

# Check the directory into source control.
git add -u deno_dir
git commit
```

```sh
deno run mod.ts
# not downloading dependencies

ls
# deno_dir
```

### S4/L34 NPM for Deno

- third party packages: https://deno.land/x
- https://pika.dev/cdn
  - any package available on NPM is available on Pika
  - automatically converts npm modules to work with ES6 imports
  - even Deno can load NPM packages

### S4/L35 Managing Module Versions

```js
import { Application } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts";
```

- go language convention: ends with `mod.ts`
- file must me referenced with extension for JS or TS

```js
import { Application } from "https://deno.land/x/oak/mod.ts"
import { Application } from "https://deno.land/x/oak@v3.7.0/mod.ts"
```

- if `@version_number` is not specified in the name of the file, deno downloads the latest version

### S4/L36 Where the Bleep is package.json?

- `microsoft/TypeScript-Node-Starter`
  - TypeScript compiler and JavaScript runtume

```sh
git clone https://github.com/microsoft/TypeScript-Node-Starter.git
# or
git clone git@github.com:microsoft/TypeScript-Node-Starter.git

npm install
# installs all the dependencies and creates node_modules folder
```

- `package.json`
  - all the dependencies for the node project
  - is not a JavaScript standard
  - was created for Node
  - not all `package.json` functionalities is currently implemented in deno
- `node_module` folder is not needed in deno
  - all packages live in one cache directory
    - all projects can reuse the cache directory
    - no need to download again for each project

### S4/L37 Deps.ts

- dependencies are handled by a single file: `deps.ts `
  - no need to change every single URL in each file what uses the dependency
- there is a way to lock the version of pacakages and dependencie like `package-lock.json` does
  - to not to break the code if a package is updated

### S4/L38 Locking Dependencies

https://github.com/odziem/nasa-deno

- to avoid possible tampering with the server the referenced file originate from a lock-file can be used (like `package-lock.json`)
- the versions are stored in file with hash
- the lock-file can be version controlled to ensure that the same version is used what the coworker/instructor used

```
deno cache --lock=lock.json --lock-write src/deps.ts
```

### S4/L39 Deno Upgrade

```
deno -V
deno upgrade
```

### S4/L40 Reviewing Deno Modules

- `deps.ts`
- `mod.ts`
  - entrypoint of the file, rust conventions
  - like `index.js` or `index.ts` in node
- cached dependencies
  - can be version controlled
- lockfiles
- alternative for npm scripts

### S4/L41 Deno Tooling

- there is very good tooling around JavaScript
- deno offers:
  - bundler `deno bundle`
  - debugger `--inspect`, `--inspect-brk`
  - dependency inspector `deno info`
  - documentation generator `deno doc`
  - formatter `deno fmt`
  - test runner `deno test`
  - linter `deno lint`

```sh
# good:
deno bundle 'deno3.js' 'deno.bundle.js'
# bundles deno3.js file with all it's dependencies (deno2.js and welcome.js) into deno.bundle.js

# wrong:
deno bundle 'deno2.js' 'deno3.js'
# bundles deno2.js into deno3.js
# overwrites deno3.js
```

```sh
# run deno.bundle.js
deno run deno.bundle.js
# produces the same results ad deno3.js
# it's self contained
```

- bundle command = functionality what `webpack` provides

### S4/L42 Deno Tooling 2

```sh
deno info 'https://deno.land/std/examples/welcome.ts'
# shows all the dependencies

deno info deno3.js
# shows all the dependencies

deno doc --help
# generated documentation from comments

deno fmt deno3.js
deno fmt deno3.js deno2.js
# formats the code
```

- `deno fmt` uses prettier
  - standard way to format

## S5 TypeScript?

### S5/L43 Recommended Path: TypeScript

## S6 Deno File I/O - Planets Project

### S6/L44 Code Along

https://github.com/odziem/planet-csv-deno

### S6/L45 Reading Files With Deno

**heeelo.txt**  
**mod.ts**  

`heeelo.txt`:
```txt
heeelo world!
```

`mod.ts`:
```js
async function readFile() {
  const data = await Deno.readTextFile("heeelo.txt");
  console.log(data);
}

await readFile();
```

```sh
deno run --allow-read mod.ts
```

### S6/L46 Async vs Sync File I/O

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

- Synchronous version: `readTextFileSync()`
  - waits until completes
- Asynchronous version: `readTextFile()`
  - runs some other code if available until completes
- Top level `async`/`await`
  - no need to wrap `await readFile();` inside a function or promise

### S6/L47 Exercise: Async vs Sync File IO

https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts

```
for await (const dirEntry of Deno.readDir(".")) {
  console.log(dirEntry.name);
}
```

- the path to the current working directory
  - `Deno.cwd()` or `"."`
- `AsyncIterable` is returned by `Deno.readDir`
- `Deno.readDir` returns an `AsyncIterable` which is why we use the `for await ... of` statement
- The synchronous version `Deno.readDirSync` can be used with a regular `for ... of` statement

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of

```sh
deno run --allow-read main.ts
```

### S6/L48 Importing The Path Module

**text_files/heeelo.txt**  
**mod.ts**  

`mod.ts`:
```typescript
import { join } from "https://deno.land/std/path/mod.ts";

async function readFile() {
  const path = join("text_files", "heeelo.txt");
  const data = await Deno.readTextFile(path);
  console.log(data);
}

await readFile();
```

- `join()` supports different operating systems

```sh
deno run --allow-read mod.ts
```

### S6/L49 Downloading Our Planets Data

https://exoplanetarchive.ipac.caltech.edu/docs/data.html

- NASA Exoplanet Archive

### S6/L50 Reading Our CSV Data

*kepler_exoplanets_nasa.csv* (needs to be downloaded, file too big)  
**mod.ts**  

https://doc.deno.land/https/deno.land/std/io/bufio.ts  
https://doc.deno.land/https/deno.land/std/encoding/csv.ts  

```typescript
import { join } from "https://deno.land/std/path/mod.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";

async function loadPlanetsData() {

  const path = join(".", "kepler_exoplanets_nasa.csv");
  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, {
    header: true,
    comment: "#",
  });
  Deno.close(file.rid);
  console.log(result);
}

await loadPlanetsData();
```

```sh
deno run --allow-read mod.ts
```

### S6/L51 Exercise: Resource Leaks

If the file is not closed:

`mod.ts`:
```typescript
const files = [];

while (true) {
  const file = await Deno.open("main.ts");
  const fileCount = files.push(file);
  console.log(`Pushing... file #${fileCount}`);
}
```

Then The Deno runtime eventually terminates:

```
Pushing... file #12787
Pushing... file #12788
Pushing... file #12789
Pushing... file #12790
Pushing... file #12791
thread 'main' panicked at 'called `Result::unwrap()` on an `Err` value: Os { code: 24, kind: Other, message: "Too many open files" }', cli/fs.rs:87:15
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
fatal runtime error: failed to initiate panic, error 5
Abort trap: 6
```

The operating system has reached a maximum amount of open files and won't let us open anymore.

### S6/L52 Finding Habitable Planets

*kepler_exoplanets_nasa.csv* (needs to be downloaded, file too big)  
**mod.ts**  

- Type safety by Interface `interface Planet ...`
- TypeAssertion: `(result as Array<Planet>)`
- Type casting: `Number(planet["..."]);`

```typescript
import { join } from "https://deno.land/std/path/mod.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";

interface Planet {
  [ key : string ] : string
}

async function loadPlanetsData() {

  const path = join(".", "kepler_exoplanets_nasa.csv");
  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, {
    header: true,
    comment: "#",
  });
  Deno.close(file.rid);

  const planets = (result as Array<Planet>).filter((planet) => {
    const planetaryRadius = Number(planet["koi_prad"]);
    const stellarMass = Number(planet["koi_smass"]);
    const stellarRadius = Number(planet["koi_srad"]);

    return planet["koi_disposition"] === "CONFIRMED"
      && planetaryRadius > 0.5 && planetaryRadius < 1.5
      && stellarMass > 0.78 && stellarMass < 1.04
      && stellarRadius > 0.99 && stellarRadius < 1.01;
  });
  return planets;
}

const newEarths = await loadPlanetsData();
console.log(`${newEarths.length} habitable planets found!`);
```

```sh
deno run --allow-read mod.ts
```

### S6/L53 Exploring Planets With 3rd Party Modules

*kepler_exoplanets_nasa.csv* (needs to be downloaded, file too big)  
**mod.ts**  

https://github.com/lodash/lodash

```typescript
// ...
//import * as _ from "https://raw.githubusercontent.com/lodash/lodash/4.17.15-es/lodash.js";
import { pick } from "https://deno.land/x/lodash@4.17.15-es/lodash.js";
// ...
async function loadPlanetsData() {
  // ...
  return planets.map((planet) => {
    //return _.pick(planet, [
    return pick(planet, [
      "koi_prad",
      "koi_smass",
      "koi_srad",
      "kepler_name",
      "koi_count",
      "koi_steff"
    ]);
  });
}
// ...
for (const planet of newEarths) {
  console.log(planet);
}
// ...
```

### S6/L54 Exercise: Exploring Earth-like Planets

https://github.com/odziem/planet-csv-deno

## S7 Exercise: SpaceX Launch Data

### S7/L55 Code Along

https://github.com/odziem/fetch-deno

### S7/L56 Recommended Path: APIs

- API for HTTP, AJAX, JSON: `fetch()`

### S7/L57 fetch()

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch  
https://github.com/r-spacex/SpaceX-API  

### S7/L58 Fetching SpaceX Launch Data

**mod.ts**

`mod.ts`:
```typescript
async function downloadLaunchData(){
  const response = await fetch("https://api.spacexdata.com/v3/launches", {
    method: "GET",
  });

  const launchData = await response.json();
  console.log(launchData);
}

await downloadLaunchData();
```

```sh
deno run --allow-net=api.spacexdata.com mod.ts
```

### S7/L59 Exercise: Making a POST Request

**mod.ts**

- POST request data:
```
{
  name: "Elon Musk",
  job: "billionaire"
}
```
- POST request header:
```
"Content-Type": "application/json; charset=UTF-8"
```

```typescript
const response = await fetch("https://reqres.in/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=UTF-8"
  },
  body: JSON.stringify({
    name: "Elon Musk",
    job: "billionaire"
  })
});

const body = await response.json();

console.log(body);
```

```sh
deno run --allow-net mod.ts
```

### S7/L60 Logging

**mod.ts**

https://deno.land/std/log

- in NodeJS a possible logger solution: `winston`
  - can log to: terminal, log file, external service (e.g. log aggregation service)
- Deno
  - the built-in log module can do the same as the above NodeJS module
  - has 5 different log levels (`log.debug()`, `log.info`(), `log.warning()`, `log.error()`, `log.critical()`)
  - `log.setup()` - to configure logger
    - minimum log level
    - file handler, console logger
    - color code input
    - log rotation

```typescript
import * as log from "https://deno.land/std/log/mod.ts";

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG"),
  },
  loggers: {
    // configure default logger available via short-hand methods above
    default: {
      level: "DEBUG",
      handlers: ["console"],
    },
  }
});

async function downloadLaunchData(){
  log.info("Downloading launch data...");
  log.warning("This is a warning.");
  const response = await fetch("https://api.spacexdata.com/v3/launches", {
    method: "GET",
  });

  if (!response.ok) {
    log.warning("Problem downloading launch data.");
    throw new Error("Launch data download failed.");
  }

  const launchData = await response.json();
  // console.log(launchData);
}

await downloadLaunchData();
```

### S7/L61 --reload Cache For Troubleshooting

```sh
deno run --allow-net=api.spacexdata.com mod.ts
```

### S7/L62 Exploring SpaceX Launch Data

**mod.ts**

`--reload` flag ensure downloading the dependencies before running:

```sh
deno run --reload --allow-net=api.spacexdata.com mod.ts
```

```typescript
// ...
interface Launch {
  flightNumber: number;
  mission: string;
}

const launches = new Map<number, Launch>();

// ...
async function downloadLaunchData(){
  // ...
  const launchData = await response.json();

  for (const launch of launchData){
    const flightData = {
      flightNumber : launch["flight_number"],
      mission: launch["mission_name"],
    };

    launches.set(flightData.flightNumber, flightData);
    log.info(JSON.stringify(flightData));
  }
}
```

### S7/L63 Postman and Insomnia

https://www.postman.com/  
https://insomnia.rest/  

- Postman - Collaborative API testing tool
  - create HTTP requests, organize into collections, share with teammates
  - API client: REST, SOAP, GraphQL
  - Automated testing
  - Design and Mock
  - Documentation
  - Monitors
  - Wokspaces
- Insomnia - helps design and debug APIs
  - competitor of Postman

### S7/L64 Quick Note: Rainbow Editor

### S7/L65 SpaceX Customers Data

**mod.ts**

```typescript
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";
// ...
interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  customers: Array<string>;
}
// ...
async function downloadLaunchData(){
  // ...
  for (const launch of launchData){

    const payloads = launch["rocket"]["second_stage"]["payloads"];
    const customers = _.flatMap(payloads, (payload : any) => {
      return payload["customers"];
    });

    const flightData = {
      flightNumber : launch["flight_number"],
      mission: launch["mission_name"],
      rocket: launch["rocket"]["rocket_name"],
      customers: customers
    };
    // ...
  }
}

await downloadLaunchData();
```

### S7/L66 import.meta

**mod.ts**

- a code can be imported by another module (via `export`) or can run directly
- `import.meta` - object defined in modules that provides metadata
  - `import.meta.main` - context how the code being executed
    - `true` - code runs as a standalone program
    - `false` - code is being imported by another module
  - `import.meta.url` - full absolute path to the file
    - the folder where the module is executed from can be detected
  - meta object is available when runned by deno or imported by another module
  - when executed from **deno repl**
    - `import.meta` is only available inside of modules
  - from browser only `url` property is available

```typescript
export async function downloadLaunchData(){
  // ...
}

if (import.meta.main) {
  await downloadLaunchData();
  log.info(JSON.stringify(import.meta));
  log.info(`Downloaded data for ${launches.size} SpaceX launches.`);
}
```

### S7/L67 Exercise: import.meta

https://github.com/odziem/github-fetcher-exercise

Uses the GitHub API to fetch the descriptions of some big name organizations:

```sh
git clone git@github.com:odziem/github-fetcher-exercise.git
# or
git clone https://github.com/odziem/github-fetcher-exercise.git

deno run --allow-net main.ts
deno run --allow-net mod.ts
```

## S8 NASA Project: Deno For Backend Development

### S8/L68 Introduction To Backend

### S8/L69 Deno Backend Frameworks And Libraries

### S8/L70 Code Along

### S8/L71 Oak

### S8/L72 What Is Middleware?

### S8/L73 Working With Middleware

### S8/L74 Reviewing Our Front End Code

### S8/L75 Exercise: Reviewing Our Front End Code

### S8/L76 Serving Static Files

### S8/L77 Exercise: Fixing A Security Issue

### S8/L78 Fixing Our Security Vulnerability

### S8/L79 Oak Router

### S8/L80 Method Not Allowed and OPTIONS

### S8/L81 /planets

### S8/L82 Exercise: Populating The Dropdown Menu

### S8/L83 Planets Data To The Frontend

### S8/L84 Testing With Deno

### S8/L85 Testing With Deno 2

### S8/L86 Testing With Deno 3

### S8/L87 Quick Note: Replace in Files

### S8/L88 Logging In Our API

### S8/L89 Error Handling

### S8/L90 JavaScript Maps

### S8/L91 /launches

### S8/L92 POST /launches

### S8/L93 DELETE /launches

### S8/L94 Adding Some Polish

### S8/L95 Managing Dependencies

### S8/L96 Managing Dependencies 2

### S8/L97 Heads UP! Videos Uploaded by June 30th!

## S9 Where To Go From Here?

### S9/L98 Learning Guideline

### S9/L99 LinkedIn Endorsements

### S9/L100 Become An Alumni

### S9/L101 Coding Challenges

## S10 Bonus: How JavaScript Works

### S10/L102 Quick Note: Upcoming Videos

JavaScript: The Advanced Concepts https://zerotomastery.io/promotions/

### S10/L103 JavaScript Engine

https://en.wikipedia.org/wiki/List_of_ECMAScript_engines

- JavaScript Engine translates between JavaScript and Machine Language
- There are lots of JavaScript Engines
  - V8 - JavaScript runs faster for Google Maps in Chrome

```js
// Javascript Engine
const isHappy = true;
```

### S10/L104 Exercise: Javascript Engine

- Brendan Eich
  - created the language
  - working at Netscape - created the first commercially available JavaScript Engine
    - created SpiderMonkey what FireFox uses as it's JavaScript Engine

### S10/L105 Inside the Engine

https://astexplorer.net

- V8 Engine
  - written in C++
  - used by Chrome and NodeJS
  - components:
    - Parser, AST - Abstract Syntax Tree, Interpreter, Profiler, Compiler
    - Bytecode, Optimized code
    - Call stack, Memory Heap

```js
// Javascript engine
function jsengine(code) {
  return code.split(/\s+/);
}

jsengine('var a = 5')
```

### S10/L106 Exercise: JS Engine For All

- **ECMAScript**
  - standard for JavaScript
  - tells engine developers how JavaScript should work

### S10/L107 Interpreters and Compilers

- there are two ways to run JavaScript:
  - Interpreter - translation happens line by line on thy fly
    - outputs Bytecode
  - Compiler - does not translate on the fly
    - outputs Machine code
      - CPU can run the code

### S10/L108 Inside the V8 Engine

- Interpreter
  - Pro: quick to get up and running, no compilation step requires time
  - Con: does not do any optimization, therefore sometimes can run very slow
- Compiler
  - Pro: can optimise the code which runs faster
  - Con: takes longer to start
- **JIT compiler** = Interpreter + Compiler (TurboFan)
  - Ignition (V8) = Code gets sent to Interpreter, results Bytecode
  - Profiler/Monitor watches the code as it runs
  - Compiles only the slow code when necessary
    - Replaces the sections of Bytecode with optimized Machine Code
  - Execution speed will gradually improve
  - Previous versions of V8 used two JIT compilers
  - If the compiler makes a mistake then deoptimization should happen which takes time to revert

### S10/L109 Comparing Other Languages

- C++
  - compiles (e.g.: to `.exe` file)
- Java
  - uses JVM - Java Virtual Machine
  - compiles and iterpretes the code to ByteCode which is understood by the JVM
- Bytecode is not native Machine Code
  - software is required to execute it
- JavaScript is not purely interpreted language
  - depends on the implementation
  - compiler implementation can also be developed
- Python
  - can be interpreted and compiled

### S10/L110 Writing Optimized Code

https://richardartoul.github.io/jekyll/update/2015/04/26/hidden-classes.html  
https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments  

- can be bad for optimization:
  - eval()
  - arguments
  - for in
  - with
  - delete
  - Hidden Classes
  - Inline Caching

- the more predictable the code is the better is

### S10/L111 WebAssembly

- when JavaScript was created there was no standard binary executable format
  - compiling the code was not feasible (browser wars)
- **WebAssembly**
  - standard binary executable format
  - runs fast on the browser instead having to go through entire JavaScript engine process

### S10/L112 Call Stack and Memory Heap

- **Memory Heap** - stores variables, objects, data
  - free store, large region in memory, where any type of arbitrary data can be stored in unordered fashion
  - engine takes care of allocation, using and freeing up memory
- **Call Stack** - keeps track what's happening line by line in the code
  - **Stack Frame** keeps track where the code is in execution
    - operates in **First in Last out (FILO)** mode
    - the base is: **Global Execution Context**
  - stores functions and variables as the code executes
  - Chrome / Sources / Snippets / Call stack
    - stop the code with `debugger` command placed into the source code
- due to various JavaScript implementations where the variables are allocates is not sure, but usually:
  - variables are usually stored on the stack
  - objects, complex data structures, arrays, functions are usually stored on the memory heaps

### S10/L113 Stack Overflow

- occurs at recursion or lots of function nested inside each other
  - can easily exceed maximum stack size
- in case of error stack trace is printed

### S10/L114 Garbage Collection

- JavaScript is a garbage collected language, does it automatically
- **Garbage Collector** frees memory on the heap and prevents memory leaks
  - uses **Mark and Sweep** algorithm

### S10/L115 Memory Leaks

https://developers.soundcloud.com/blog/garbage-collection-in-redux-applications  
https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval  

Example (from browser):
```js
let array = [];
for (let i = 5; i > 1; i++) {
  array.push(i-1);
}
```

- common Memory Leaks:
  - Global variables
  - Event Listeners
  - functions set in setInterval functions as argument

### S10/L116 Single Threaded

- JavaScript is Single Threaded
  - one set of instructions is executed at the time, not doing multiple things
  - there is only one Call Stack, never running functions in parallel
- JavaScript is Synchronous (due to single thread)
  - only one thing can happen at the time

### S10/L117 Exercise: Issue With Single Thread

- Problem with Single Threaded, Synchronous code: long running tasks block any other execution
- not just the JavaScript Engine, but the JavaScript Runtime is running the code

### S10/L118 Javascript Runtime

http://latentflip.com/loupe/?code=ZnVuY3Rpb24gcHJpbnRIZWxsbygpIHsNCiAgICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBiYXonKTsNCn0NCg0KZnVuY3Rpb24gYmF6KCkgew0KICAgIHNldFRpbWVvdXQocHJpbnRIZWxsbywgMzAwMCk7DQp9DQoNCmZ1bmN0aW9uIGJhcigpIHsNCiAgICBiYXooKTsNCn0NCg0KZnVuY3Rpb24gZm9vKCkgew0KICAgIGJhcigpOw0KfQ0KDQpmb28oKTs%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D

- JavaScript is a Single Threaded programming language, has only one stack and one heap
  - if any other program wants to execute something it has to wait until previous program is completely executed
- JavaScript Runtime
  - Web Browser running in the background asynchronous calls, while the synchronous JavaScript code is running
  - Web Browser provides WEB API for long running asynchronous tasks
    - These async calls are not native to JavaScript, e.g.:
      - Listening to DOM events
      - fetch() - make HTTP calls
      - setTimeout(), setInterval()
      - IndexedDB() - Little database in browser: Chrome / Application / IndexedDB
    - Callback Queue is where the asynchronously executed puts the callback to process the result
    - Event Loop pops the next callback from the Callback Queue and pushes the callback onto the Call Stack once it's free
  - WEB API is accessible via `window` object what JavaScript Engine can use
  - WEB API is implemented with low level programming languages (C++)

```js
console.log(1);
setTimeout(() => {console.log(2)}, 1000); // processed by the WEB API
console.log(3);

# output:
# 1
# 3
# 2
```

```js
console.log(1);
setTimeout(() => {console.log(2)}, 0); // processed by the WEB API
console.log(3);

# output:
# 1
# 3
# 2
```

- the result is the same, because the `console.log(2)` still gets sent to WEB API which takes time

```js
function printHello() {
    console.log('Hello from baz');
}

function baz() {
    setTimeout(printHello, 3000);
}

function bar() {
    baz();
}

function foo() {
    bar();
}

foo();
```

### S10/L119 Node.js

- JavaScript Engine < JavaScript Runtime
- Node is a JavaScript Runtime
  - server side platform based on asynchronous IO that is non-blocking
    - creates environment around JavaScript language
    - provides the same single threaded model
    - any asynchronous task can be non-blocking if passed to WEB API's worker thread
  - runs JavaScript code outside the browser
  - C++ program
  - provides: V8 Engine, Event Loop, Callback Queue
  - LibUV provides asynchronous operations with the V8 engine
  - in Node it's possible to access resources like File System
  - does not have `window` but has `global` instead, which has extra things what can't be don in the browser

### S10/L120 Recommended Path: Back To Deno

## S11 Bonus: Learning TypeScript

### S11/L121 Quick Note: Upcoming Videos

### S11/L122 Introduction To TypeScript

JavaScript - dynamically typed language
TypeScript - statically typed language

### S11/L123 Dynamic vs Static Typing

Statically typed language - have to declare the variable explicitly with type
Dynamically typed language - type check happens during runtime

```
var a = 100;
# vs
int a = 100;
```

```js
function sum(a: number, b: number){
    return a + b;
}
sum('hello', null); // ERROR happens
```

- Static typing
  - pros:
    - self documentation
    - autocomplete
    - less bugs, compile time type check
  - cons:
    - more complex code, harder to read and learn, extra layer of complexity
    - developers don't write enough unit test, they trust in type check only
    - slower development process and release
- Dynamic typing
  - pros:
    - less time debugging syntax and semantic errors, most of the debugging time is spend to debug logic and errors

### S11/L124 Strongly vs Weakly Typed

Type coercion in JavaScript:
```js
var a = "booooya";
a + 17
// booooya17
```

- Weakly typed language tries to figure out how to resolve type mismatches
- Strongly typed language does not allow type coercion

### S11/L125 Static Typing In JavaScript

- Tools making JavaScript a statically typed Language:
  - **Flow**
    - static type checker: `// @flow`
    - comes prebuilt in create-react-app
    - created by facebook
    - uses **Babel** as compiler which changes ES6+ code to ES5 code
  - **Reason ML**
    - created by facebook
    - differs from JavaScript, doens't depend on JavaScript changes
    - based on OCaml language
    - has it's own compiler
  - **Elm**
    - similar to Reason ML
    - differs from JavaScript, doens't depend on JavaScript changes
    - has it's own compiler
  - **TypeScript**
    - superset of JavaScript, tries to mimic JavaScript
    - created by Microsoft
    - has it's own compiler
- **Angular** built with and is using TypeScript
- **React** community starting to use TypeScript instead of Flow

### S11/L126 Quick Note: Upcoming Videos

https://glot.io/new/typescript

### S11/L127 OPTIONAL: Installing TypeScript Compiler

https://www.typescriptlang.org/

TypeScript compiler runs on Node

```sh
node -v
sudo npm install -g typescript

# typescript compiler
tsc
```

### S11/L128 OPTIONAL: Installing Node.js + TypeScript

https://www.npmjs.com/get-npm  
https://nodejs.org/en/download/  

```
node -v
npm -v
```

https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally  
https://stackoverflow.com/questions/9652720/how-to-run-sudo-command-in-windows  

https://www.npmjs.com/package/typescript  
https://stackoverflow.com/questions/39404922/tsc-command-not-found-in-compiling-typescript  

### S11/L129 TypeScript

**L129-141/originals.ts**

https://www.typescriptlang.org/  
https://babeljs.io/repl  

```
mkdir type
cd type
touch typescript.ts
sublime .
```

Sublime: install TypeScript package

`typescript.ts`:
```js
function sum(a, b) {
    return a + b;
}
```

```sh
tsc typescript.ts
# typescript.js file appears, contains the same function
```

---

`typescript.ts`:
```js
const sum = (a, b) => {
    return a + b;
}
```

```sh
tsc typescript.ts
# typescript.js file appears
```

`typescript.js`:
```js
var sum = function (a, b) {
    return a + b;
};
```

- TypeScript compiler is doing the same what Babel does

---

`typescript.ts`:
```js
const sum = (a : number, b : number) => {
    return a + b;
}

// does not compile
var answer = sum(4 + 5);
var answer = sum('hello', 5);

// compiles
var answer = sum(4, 5);

console.log(answer);
```

- in case of errors in code:
  - compiler does not compile the code
  - editor underlines the errors

### S11/L130 TypeScript 2

**L129-141/originals.ts**

```sh
tsc --init
# generates: tsconfig.json
```

`tsconfig.json` - configuration file for TypeScript compiler

```sh
tsc typescript.ts --watch
# watching for changes
```

### S11/L131 TypeScript 3

**L129-141/originals.ts**

```typescript
// boolean
let isCool: boolean = true

// number
let age: number = 56;

// string
let eyeColor: string = 'brown';
let favouriteColor: string = `I'm not old, I'm only ${age}`;

// Array
let pets: string[] = ['cat', 'dog', 'pig']
let pets: Array<string> = ['lion', 'dragon', 'lizard']

// Object
let wizard: object = {
  a: 'John'
}

// null and undefined
let meh: undefined = undefined;
let noo: null = null;
````

### S11/L132 Resources: TypeScript Types

**L129-141/originals.ts**

### S11/L133 TypeScript 4

**L129-141/originals.ts**

```typescript
//Tuple
let basket: [string, number];
basket = ['basketball', 10];

//Enum
enum Size {Small = 1, Medium = 2, Large = 3}
//enum Size {Small = 1, Medium, Large}
let sizeName: string = Size[2];
let sizeNumb: number = Size.Small;
alert(sizeName); // Displays 'Medium' as its value is 2 above
```

### S11/L134 TypeScript 5

**L129-141/originals.ts**

```typescript
//Any
let whatever: any = 'aaaaghhhhhh noooooo!';
whatever = 5
whatever = true
whatever = Size.Small
whatever = basket

//void
let sing = (): void => {
  console.log('Lalalala')
}

//never
let error = (): never => {
  throw Error('blah!');
}
```

- `never` type - for function that never returns and never reaches end point

### S11/L135 TypeScript 6

**L129-141/originals.ts**

```typescript
//Interface
interface RobotArmy {
  count: number,
  type: string,
  magic: string
}

let fightRobotArmy = (robots: RobotArmy) =>{
  console.log('FIGHT!');
}

let fightRobotArmy2 = (robots: {count: number, type: string, magic: string}) => {
  console.log('FIGHT!');
}
```

- React uses interfaces a lot
- Type syntax also works


```typescript
//Interface
type RobotArmy = {
  count: number,
  type: string,
  magic: string
}
```

- Interfaces create a new name what can be used anywhere
- Type aliases don't create a new name

### S11/L136 Resources: Type VS Interface

**L129-141/originals.ts**

https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c  
https://www.briangonzalez.org/post/interface-types-vs-type-aliases-typescript  

### S11/L137 TypeScript 7

**L129-141/originals.ts**

```typescript
// Type Assertion
interface CatArmy {
  count: number,
  type: string,
  magic: string
}

let dog = {}
dog.count
// ERROR

let dog = {} as CatArmy
dog.count
// OK
```


```typescript
//Interface
interface RobotArmy {
  count: number,
  type: string,
  magic?: string  // optional property
}

let fightRobotArmy = (robots: RobotArmy) =>{
  console.log('FIGHT!');
}

fightRobotArmy({count: 1, type: 'dragon', magic: 'spell'})
fightRobotArmy({count: 1, type: 'dragon'})  // works
```

### S11/L138 Resources: Type Assertion

**L129-141/originals.ts**

https://basarat.gitbook.io/typescript/

### S11/L139 TypeScript 8

**L129-141/originals.ts**

```typescript
//Function
let fightRobotArmy3 = (robots: RobotArmy): void => {
  console.log('FIGHT!');
}
let fightRobotArmy4 = (robots: {count: number, type: string, magic?: string}): void => {
  console.log('FIGHT!');
}
let fightRobotArmy5 = (robots: {count: number, type: string, magic?: string}): number => {
  console.log('FIGHT!');
  return 5;
}

// Classes
class Animal {
    // public sing: string = "allalalalal";
    sing: string = "allalalalal";
    // private sing: string;

    constructor(sound: string) {
        this.sing = sound;
    }

    //greet() : string {
    greet() {
        //return "Hello, " + this.sing;
        return "Hello, ${this.sing}`;
    }
}

let lion = new Animal("RAAAWWWR");
lion.greet();
// lion.sing  // Won't work if private
```

### S11/L140 TypeScript 9

**L129-141/originals.ts**

```typescript
//Union Type
let confused: string | number = 'hello'
```

### S11/L141 TypeScript 10

**L129-141/originals.ts**

- Type is infered

```typescript
let x = 3;
// automatimally detexts x is a number.
```

## S12 Bonus: HTTP, AJAX, JSON and APIs

### S12/L142 Quick Note: Upcoming Videos

### S12/L143 HTTP/HTTPS

- HTML, CSS, JavaScript
- HTTP/HTTPS
  - client-server protocol
  - request-response
    - request:
      - Method: GET, POST, PUT, DELETE
      - data: query string, body
    - response:
      - HTTP Status Message (1xx, 2xx, 3xx, 4xx, 5xx)
      - data (e.g.: HTML)
  - HTTPS - Secure HTTP
    - SSL, TLS

### S12/L144 JSON

- JSON - JavaScript Object Notation
  - Syntax for storing and exchanging data
  - is text
- JSON alternative: XML
- `JSON.parse()`, `JSON.stringify()`

### S12/L145 JSON vs Form Data

- submit data to the server:
  - originally: sending `<form>` data with POST or GET
  - now: sending content of `<input>` in JSON format (through **AJAX**)

### S12/L146 AJAX

*JSONView Chrome extension*

- AJAX
  - allows to read from a webserver after the page has loaded and update the webpage without reloading the page and send data in the background
- XHR - XML HTTP Request
  - old way
- jQuery
  - newer way using a library
- fetch
  - supported by browsers

XHR:
```js
var request = new XMLHttpRequest();
request.open('GET', '/my/url', true);

request.onload = function(){
  if (request.status >= 200 && request.status < 400 ) {
    // Success!
    var data = JSON.parse(request.responseText;
  } else {
    // We reached our target server, but it returned an error
  }
};

request.onerror = function(){
  // There was a connection error of some sort
};

request.send();
```

jQuery:
```js
$.getJSON('/my/url', function(data){

});
```

fetch:
```js
fetch('/my/url').then(response => {
  console.log(response);
});
```

- Single Page Application
  - a base HTML is loaded
  - the content is built on the fly based on data fetched from the server
- Promise
  - the result or expected may not be present yet but will be present

```js
fetch('https://jsonplaceholder.typicode.com/users');
fetch('https://jsonplaceholder.typicode.com/users').then(response => console.log(response));
fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json());
fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(data => console.log(data));
```

### S12/L147 APIs

https://jsonplaceholder.typicode.com  
https://jsonplaceholder.typicode.com/users  
https://jsonplaceholder.typicode.com/comments  
https://robohash.org/<NUMBER>  
https://api.github.com/users/<USERNAME>  
https://www.w3schools.com/xml/simple.xml  

- API - Application Programming Interface
  - a way how people and/or machines share information

## S13 Extras

### S13/L148 Bonus: Special Thank You Gift
