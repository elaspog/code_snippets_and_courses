# TypeScript

https://www.udemy.com/course/typescript-the-complete-developers-guide

## S01/E02 Typescript Overview

Playground: http://www.typescriptlang.org/play/

## S01/E03 Environment Setup

```
(sudo) npm install -g typescript ts-node
tsc --help  # typescript compiler
```
VS Code extension: **Prettier - Code formatter (Esben Petersen)**

```
code .  # this should work from PATH
```

## S01/E04 First App

Fake JSON API: http://jsonplaceholder.typicode.com/

```
mkdir fetchjson
cd fetchjson
npm init -y
npm install axios
code .
```
## S01/E05 Executing Typescript Code

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

## S01/E06 One Quick Change

**fetchjson/index.ts**: fetchjson/index.v2.ts

(Making error)

## S01/E07 Catching Errors with Typescript

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
