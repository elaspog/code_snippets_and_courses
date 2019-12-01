# TypeScript

https://www.udemy.com/course/typescript-the-complete-developers-guide

## S01 Getting Started with TypeScript

### S01/E02 Typescript Overview

Playground: http://www.typescriptlang.org/play/

### S01/E03 Environment Setup

```
(sudo) npm install -g typescript ts-node
tsc --help  # typescript compiler
```
VS Code extension: **Prettier - Code formatter (Esben Petersen)**

```
code .  # this should work from PATH
```

### S01/E04 First App

Fake JSON API: http://jsonplaceholder.typicode.com/

```
mkdir fetchjson
cd fetchjson
npm init -y
npm install axios
code .
```
### S01/E05 Executing Typescript Code

**fetchjson/index.ts**: fetchjson/index.v1.ts

```
# create and edit the index.ts file
```
Compile and run
```
tsc index.ts
# index.js is created
node index.js
```
Compile and run (single command)
```
ts-node index.ts
```

### S01/E06 One Quick Change

**fetchjson/index.ts**: fetchjson/index.v2.ts

(Making error)

### S01/E07 Catching Errors with Typescript

**fetchjson/index.ts**: fetchjson/index.v3.ts

(Preventing error with typescript)

```
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
```

## S01/E08 Catching More Errors!

**fetchjson/index.ts**: fetchjson/index.v4.ts

```
const logTodo = (id: number, title: string, completed: boolean) => { ... }
```
instead of
```
const logTodo = (id, title, completed) => { ... }
```

## S02 What is a Type System?

**features/types.ts**

* Syntax + Features
* Design Patterns with TS

Types:
* Primitive types
  * number
  * boolean
  * void
  * undefined
  * string
  * symbol
  * null
* Object Types
  * functions
  * arrays
  * classes
  * objects

## S03 Type Annotations in Action

**annotations/variables.ts**

* Type annotations
* Type inference
  * Variable Declaration
  * Variable Initialization

## S04 Annotations With Functions and Objects

**annotations/functions.ts**  
**annotations/objects.ts**

## S05 Mastering Typed Arrays

**annotations/arrays.ts**

## S06 Tuples in Typescript

**annotations/tuples.ts**

## S07 The All-Important Interface

### S07/E37 Long Type Annotations

**annotations/interfaces1.ts**

Types need to be duplicated.

### S07/E38 Fixing Long Annotations with Interfaces

**annotations/interfaces2.ts**

### S07/E39 Syntax Around Interfaces

**annotations/interfaces3.ts**

### S07/E40 Functions in Interfaces

**annotations/interfaces4.ts**

### S07/E41 Code Reuse with Interfaces

**annotations/interfaces5.ts**

## S08 Building Functionality with Classes

### S08/E44 Basic Interface

**annotations/classes1.ts**

### S08/E45 Instance Method Modifiers

**annotations/classes2.ts**

Modifiers:
* public
* private
* protected

### S08/E46 Fields in Classes

**annotations/classes3.ts**

### S08/E47 Fields with Inheritance

**annotations/classes4.ts**
