# Learn and Understand NodeJS

https://www.udemy.com/course/understand-nodejs

## S01 Introduction and Setup

### S01/E01 Introduction and Goal of this Course

### S01/E02 Big Words and NodeJS

### S01/E03 Watching this Course in High Definition

### S01/E04 Conceptual Aside: The Command Line Interface

### S01/E05 Command Line References

http://cli.learncodethehardway.org/book/

## S02 V8: The Javascript Engine

### S02/E06 Conceptual Aside: Processors, Machine Language, and C++

### S02/E07 Javascript Aside: Javascript Engines and The ECMAScript Specification

ECMAScript = the core standard that Javascript is based on  
Javascript = the scripting language, it's built on one of many engines

http://www.ecma-international.org/ecma-262/6.0/

Javascript Engine = program that converts Javascript code

### S02/E08 V8 Under the Hood

https://code.google.com/p/v8

### S02/E09 Adding features to Javascript

V8 can run standalone, or can be embedded into any C++ application.

## S03 The Node Core

### S03/E10 Conceptual Aside: Servers and Clients

### S03/E11 What Does Javascript Need to Manage a Server?

### S03/E12 The C++ Core

https://github.com/nodejs  
https://github.com/nodejs/node  
https://github.com/joynet  

### S03/E13 The Javascript Core

### S03/E14 Downloading Lecture Source Code

### S03/E15 Let's Install and Run Some Javascript in Node

**app.js**

https://nodejs.org

```
node -v
node # node shell opens, CTRL+C
```

* NodeJS
* io.JS

https://code.visualstudio.com

```
node app.js
```

## S04 Modules, Exports, and Require

### S04/E16 Conceptual Aside: Modules

CommonJS modules

### S04/E17 Javascript Aside: First-Class Functions and Function Expressions

**app.js**

* **First-Class Functions**
  * everything can be done to functions what can be done to other objects.
  * i.e. pass them around, set variables equal to them, put them in arrays etc.
* **Function Expressions**
  * results a value

```
node app.js
```

### S04/E18 Let's Build a Module

**app.js**  
**greet.js**

* require()
* module.exports

### S04/E19 Javascript Aside: Objects and Object Literals

**app.js**

Javascript Objects = collection of name/value pairs

### S04/E20 Javascript Aside: Prototypal Inheritance and Function Constructors

**app.js**

* prototype chain

### S04/E21 Javascript Aside: By Reference and By Value

**app.js**

### S04/E22 Javascript Aside: Immediately Invoked Function Expressions (IIFEs)

### S04/E23 How Do Node Modules Really Work?: module.exports and require

### S04/E24 Javascript Aside: JSON

### S04/E25 More on require

### S04/E26 Module Patterns

### S04/E27 exports vs module.exports

### S04/E28 Requiring Native (Core) Modules

### S04/E29 Modules and ES6

### S04/E30 Web Server Checklist
