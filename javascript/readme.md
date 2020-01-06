# Javascript

## Functions

### Function Statements and Function Expressions

```
// function statement
function funcStatement() { console.log('Function Statement'); }
funcStatement();

// function expression
var funcExpression = function() { console.log('Function Expression'); }
funcExpression();


function exetuteFunction(fn) {
	fn();
}

// functions are first-class
exetuteFunction(funcStatement);
exetuteFunction(funcExpression);

// use a function expression to create a function on the fly
exetuteFunction(function() {
	console.log('Anonymous Fuction');
});
```

### Immediately Invoked Function Expressions (IIFEs)

* the value is scoped to the function, there is no unintentional effect

```
var firstname = 'Jane';

(function (lastname) {

	var firstname = 'John';
	console.log(firstname);
	console.log(lastname);

}('Doe'));

console.log(firstname);
```

## Modules

myModule.js:
```
console.log('MyModule loaded');

var myFunction = function(){
	console.log('MyFunction called');
}

module.exports = myFunction;
```

app.js:
```
var moduleRef1 = require('./myModule.js');
var moduleRef2 = require('./myModule');

moduleRef1.myFunction():
```

## Objects

__Javascript Objects__ = collection of name/value pairs

* values:
	* primitive property
	* object property
	* function methods (function attached to method)

__Object Literals__ = name/value pairs separated by commas and surrounded by curly braces

```
var person = {
	firstname: 'John',
	lastname: 'Doe',
	printFullname: function() {
		console.log(this.firstname + ' ' + this.lastname);
	}
};

person.printFullname();

console.log(person.firstname);
console.log(person['firstname']);
```
