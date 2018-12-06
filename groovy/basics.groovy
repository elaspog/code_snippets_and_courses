
// docker run -v ${PWD}:/home/groovy/scripts -w /home/groovy/scripts -it groovy:3.0 groovy basics.groovy
// groovysh
//	:exit
//	:quit


println ("Hello World");
println "Hello World"


// Variables

String message = 'Hello World'
String processor = "Intel"
String multiLine = '''This text is on line one
line 2 and
line 3'''
String escapedExample = 'Bob\'s Burgers'


// String interpolation

String name = 'Luke'
String message1 = "Hello ${name}"
println message1// This will print Hello Luke

String message2 = "Hello $name"

String count = "${name.length()}"
println count
println "${name.toLowerCase()}"


// No primitive types

8.toString()
4.times {
	// Run a task
}
7.next()


// Object types

println ""
println 90.class // Prints class java.lang.Integer
println 9999999999999999999.class //Prints class java.math.BigInteger
println 9.0.class //Prints class java.math.BigDecimal
println 90l.class // Prints class java.lang.Long
float foo = 9.0
println foo.class // Prints class java.lang.Float


// Objects

def obj1 = 'a'
println obj1.class // Prints class java.lang.String
obj1 = 1.4
println obj1.class // Prints class java.math.BigDecimal

obj2 = 'a'
println obj2.class // Prints class java.lang.String
obj2 = 1.4
println obj2.class // Prints class java.math.BigDecimal


// Lists

list = [1, 2, 3, 4]
listWithDiffItems = [1, 3, 'String Item', 3.4]

println list.get(1) // Prints 2
println list.getAt(-1) // Prints 4, the first element from last

list.add 5
list.remove 0 // 0 is the index of the element to be removed
list.each { println it }


// Maps

map = [ "red" : 1 , "yellow" : 2, "green" : 3 ]

println map.red //Prints 1
println map["yellow"] // Prints 2
println map.get("green") // Prints 3

map.put "blue", 4
map.each { println "Key: ${it.key} and Value: ${it.value}" }


// Range

def intRange = 0..9
println intRange.size() // Prints 10
intRange.each {print it} // Prints 0123456789


// Closures

// { list of arguments -> closure body }
// { -> } // Empty Closure
// { a, b -> a + b } // Closure with two untyped arguments
// {int a, int b -> a + b} // Closure with two arguments of type int

def greet1 = {String name_param -> println "Hello ${name_param}" }
greet1 "Joe"
greet1.call "Joe"

def greet2a = {"Hello"}
println greet2a()

def greet2b = {println "Hello"}
greet2b()

def greet3 = {"Hello $it"}
println (greet3 "World")
greeting = greet3 "World" // Prints Hello World
println greeting
println greet3() // Prints Hello null

