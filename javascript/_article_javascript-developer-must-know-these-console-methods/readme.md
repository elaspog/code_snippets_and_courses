
# Javascript Console Methods

https://dev.to/karkranikhil/javascript-developer-must-know-these-console-methods-57oa

## console.table()

* __tabledata__
  * should be either Object or Array
* __tablecolumns__
  * specifies the name of the array property to print in table
  * it's an optional field
  * it's used only with Array of object

```
console.table([{ name : "Nikhil", language : "Javascript" },
               { name : "Karkra", language : "Python" }]);
```

## console.time(label) & console.timeEnd(label)

* __label__
  * parameter gives a name to the timer
  * it's an optional field

```
function callApi(){
  console.time('API TIMMER')
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => {
        console.timeEnd('API TIMMER') //prints time taken by the API
        console.table(json) // prints the response of API
        }
    )
}
callApi();
```

## console.log(message)

```
console.log('Hurray!! We are JS developer');
```

### console.log(message) with colored print

```
console.log("%cWarning message", "font: 2em sans-serif; color: yellow; background-color: red;");
```

## console.warn(message)

```
console.warn('img elements must have an alt prop, either with meaningful text, or an empty string for decorative images');
```

## console.error(message)

```
console.error('Server is not running!!');
```

## console.info(message)

```
console.info('React 17 is available!!');
```

## console.count(label)

```
function test(){
  console.count('TEST FUNCTION');
}

test();
test();
test();
```

## console.clear()

```
console.clear();
```

## console.assert(expression, message)

```
console.assert(2>3, '2 is not greater than 3');
```

## console.group(label) & console.groupEnd(label)

* __label__
  * gives a name to the group
  * it's an optional field

```
//First group
console.group("URL Details");
console.log("Request URL: https://dev.to");
console.log("Request Method: GET");
console.log("Status Code: 200")
console.groupEnd("URL Details");
//Second group
console.group("Author Details");
console.log('Author name: Nikhil karkra')
console.groupEnd("Author Details");
```

## console.groupCollapsed(label)

```
//First collapsed group
console.groupCollapsed("URL Details");
console.log("Request URL: https://dev.to");
console.log("Request Method: GET");
console.log("Status Code: 200")
console.groupEnd("URL Details");
//Second collapsed group
console.groupCollapsed("Author Details");
console.log('Author name: Nikhil karkra')
console.groupEnd("Author Details");
```

## console.dir()

```
a = {x: 1, y: 2};
console.dir(a);
```
