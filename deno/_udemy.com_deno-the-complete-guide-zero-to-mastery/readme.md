
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
```
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
```
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

### S4/L29 URL Modules

### S4/L30 Standard Library

### S4/L31 3rd Party Modules

### S4/L32 Deno Caching

### S4/L33 Deno Caching 2

### S4/L34 NPM for Deno

### S4/L35 Managing Module Versions

### S4/L36 Where the Bleep is package.json?

### S4/L37 Deps.ts

### S4/L38 Locking Dependencies

### S4/L39 Deno Upgrade

### S4/L40 Reviewing Deno Modules

### S4/L41 Deno Tooling

### S4/L42 Deno Tooling 2

## S5 TypeScript?

### S5/L43 Recommended Path: TypeScript

## S6 Deno File I/O - Planets Project

### S6/L44 Code Along

### S6/L45 Reading Files With Deno

### S6/L46 Async vs Sync File I/O

### S6/L47 Exercise: Async vs Sync File IO

### S6/L48 Importing The Path Module

### S6/L49 Downloading Our Planets Data

### S6/L50 Reading Our CSV Data

### S6/L51 Exercise: Resource Leaks

### S6/L52 Finding Habitable Planets

### S6/L53 Exploring Planets With 3rd Party Modules

### S6/L54 Exercise: Exploring Earth-like Planets

## S7 Exercise: SpaceX Launch Data

### S7/L55 Code Along

### S7/L56 Recommended Path: APIs

### S7/L57 fetch()

### S7/L58 Fetching SpaceX Launch Data

### S7/L59 Exercise: Making a POST Request

### S7/L60 Logging

### S7/L61 --reload Cache For Troubleshooting

### S7/L62 Exploring SpaceX Launch Data

### S7/L63 Postman and Insomnia

### S7/L64 Quick Note: Rainbow Editor

### S7/L65 SpaceX Customers Data

### S7/L66 import.meta

### S7/L67 Exercise: import.meta

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

### S10/L103 JavaScript Engine

### S10/L104 Exercise: Javascript Engine

### S10/L105 Inside the Engine

### S10/L106 Exercise: JS Engine For All

### S10/L107 Interpreters and Compilers

### S10/L108 Inside the V8 Engine

### S10/L109 Comparing Other Languages

### S10/L110 Writing Optimized Code

### S10/L111 WebAssembly

### S10/L112 Call Stack and Memory Heap

### S10/L113 Stack Overflow

### S10/L114 Garbage Collection

### S10/L115 Memory Leaks

### S10/L116 Single Threaded

### S10/L117 Exercise: Issue With Single Thread

### S10/L118 Javascript Runtime

### S10/L119 Node.js

### S10/L120 Recommended Path: Back To Deno

## S11 Bonus: Learning TypeScript

### S11/L121 Quick Note: Upcoming Videos

### S11/L122 Introduction To TypeScript

### S11/L123 Dynamic vs Static Typing

### S11/L124 Strongly vs Weakly Typed

### S11/L125 Static Typing In JavaScript

### S11/L126 Quick Note: Upcoming Videos

### S11/L127 OPTIONAL: Installing TypeScript Compiler

### S11/L128 OPTIONAL: Installing Node.js + TypeScript

### S11/L129 TypeScript

### S11/L130 TypeScript 2

### S11/L131 TypeScript 3

### S11/L132 Resources: TypeScript Types

### S11/L133 TypeScript 4

### S11/L134 TypeScript 5

### S11/L135 TypeScript 6

### S11/L136 Resources: Type VS Interface

### S11/L137 TypeScript 7

### S11/L138 Resources: Type Assertion

### S11/L139 TypeScript 8

### S11/L140 TypeScript 9

### S11/L141 TypeScript 10

## S12 Bonus: HTTP, AJAX, JSON and APIs

### S12/L142 Quick Note: Upcoming Videos

### S12/L143 HTTP/HTTPS

### S12/L144 JSON

### S12/L145 JSON vs Form Data

### S12/L146 AJAX

### S12/L147 APIs

## S13 Extras

### S13/L148 Bonus: Special Thank You Gift
