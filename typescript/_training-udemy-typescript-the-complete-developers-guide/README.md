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

## S09 Design Patterns with Typescript

### S09/E49 Fields with Inheritance

```
(sudo) npm install -g parcel-bundler
```

### S09/E50 Bundling with parcel

**index.html**  
**src/index.ts**

```
mkdir maps
cd maps
code .
```
Create and edit the required files.
```
parcel index.html
```

### S09/E51 Project Structure

**src/User.ts**

Capital case in filename because it exports.

### S09/E52 Generating Random Data

https://www.npmjs.com/  
'faker' package

```
npm install faker
```

### S09/E53 Type Definition files

If type definitions are not packaged with the module: *@Types/{library name}*
```
npm install @types/faker
```

### S09/E54 Using Type Definition Files

Type definition file extension: __*.d.ts__  
It's also an alternative documentation of the module.

### S09/E55 Export Statement in Typescript

__export__ and __import__ keyword:

* Typescript convention:
  * in Typescript the __default__ keyword is not used while exporting
    * except while importing 3rd party libraries
  * using __{}__ while importing

```
// User.ts
export const red = 'red';
export class User {...}

// index.ts
import { User, red } from "./User";
```

* React convention:
  * using default export

```
// User.ts
export default 'red';

// index.ts
import userColor from "./User";
```

### S09/E56 Defining a Company

**src/Company.ts**

### S09/E58 Adding Google Maps Support

https://console.developers.google.command

```
<script src="https://maps.googleapis.com/maps/api/js?key=[REGISTERED_KEY]"></script>
```

### S09/E59 Google Maps Integration

The __google__ variable can be used from Developer Console.  
Global variable (which was added by the &lt;script&gt; tag) in typescript code

```
npm install @types/googlemaps
```

### S09/E60 Exploring Type Definition Files

Adding Google Maps to the HTML and Typescript files.

### S09/E61 Hiding Functionality

Useful to prevent other engineers to call methods of the google maps API what can break the application.

### S09/E62 Why Use Private Modifiers? Here's Why

### S09/E65

Only common fields can be used if types are given by OR, e.g.: `User | Company`.  
This solution is hard to extend. When new types need to be used then the existing code should be modified.
