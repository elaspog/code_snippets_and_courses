
# Deno: The Complete Guide Zero to Mastery

https://www.udemy.com/course/deno-the-complete-guide-zero-to-mastery

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
