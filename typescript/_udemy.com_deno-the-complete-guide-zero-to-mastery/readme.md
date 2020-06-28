
# Deno: The Complete Guide Zero to Mastery

https://www.udemy.com/course/deno-the-complete-guide-zero-to-mastery

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
