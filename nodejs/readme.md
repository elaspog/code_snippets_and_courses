# Creating a simple HTTP server by using NodeJS

## Install NodeJS and the important modules
Important packages: `http`  
Additional packages: `url`, `request`, `net`

You can find further information regarding to install on site: https://nodejs.org/  
After installing NodeJS you can install modules by using 

```
# Global installation
npm install -g <package_name> 
```

or

```
npm install <package_name>
```
command in the console

## Create a NodeJS file
Create a new file named `my_simple_http_server.js`, then add the following content:

```
var http = require("http")
var port = process.argv[2]
var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"})
  response.write('<!DOCTYPE "html">\n<html>\n<head>\n\t<title>Hello World Page</title>\n</head>\n<body>\n\t<div>Hello World!</div>\n</body>\n</html>')
  response.end()
})
server.listen(port)
console.log("Server is listening on port: " + port)
```

## Test your simple server
Enter the following command to your console:

```
YOUR_WORKING_DIRECTORY> node my_simple_http_server.js 8080
```
Choose another port if 8080 is being used.

Open an internet browser and enter the following address to the address bar:

```
http://localhost:8080
```

## Basics of creating HTTP Server
	
To create a HTTP server at first you have to include the "http" module:

```
var http = require('http');
```
	
Create a server by using `createServer()` function from the module:
	
```
function yourCallbackFunction (request, response){ ... }
var server = http.createServer( yourCallbackFunction );
```

or

```
var server = http.createServer( function (request, response){ ... });
```
	
The `createServer()` function requires a callback function with two parameters which are Stream objects.

## Parameters

### Request parameter
 
- contains the request, sent by the client

- you can read it's properties (e.g.: it's header or the payload of the HTTP message etc.)

e.g.: 

Validating the request recieved from the client

```
if(request.method != 'POST') 
  return 
response.end('Send me a POST message\n');
```

### Response parameter

In which you have to set the details of the response you want to send back to the client (e.g.: status code, payload etc.)

## Event handling
	
To define events to react (if you get a message from the client) enter the following lines inside your callback function:

```
request.on('data', function (chunk) { ... })
request.on('end', function () { ... })	
request.on('error', function () { ... })
```

### Data event handler
		
`Data` event handler will be triggered when:

- the server recieves a POST/PUT/PATCH/DELETE/HEAD/OPTIONS message and the message has a payload
	
### End event handler

`End` event will be fired when:

- the server recieves a GET message 

- the last part of a POST/PUT/PATCH/DELETE/HEAD/OPTIONS message arrives (no matter if it has a payload or not)
	
### Error event handler
	
`Error` event handler will run when something bad happens...

## Skeleton

Start the server using the:

```
server.listen(port);
```
		
From this point your server will listen on the given port, if it's not used by another application.

Skeleton code for a server:
		
```
var http = require('http')
var portnum = process.argv[2]

var server = http.createServer( function (request, response){		
			
  request.on('data', function (chunk) { ... })			
  request.on('end', function () { ... })			
  request.on('error', function () { ... })			
})

server.on('error', function(error){
  console.log('The port (' + portnum + ') is used by somebody else.\n' + error)
})

server.listen(portnum)
console.log("HTTP Server listening on port: " + portnum + "\n")
```

### Routing

The server can check the properties of the client's request, e.g.:
Checking the method type:

```
if(request.method != 'POST') 
  return response.end('Send me a POST message\n');
```
	
**Warning**: sometimes reading the properties may be hard due to the Javascript's syntax, e.g.: if there is a variable separated by '-' character, like "content-type"
		
```
var value = request.headers.content-type	// this is an invalid operation
```

In that case you can use the following syntax

```
var value = request['headers']['content-type']	// this works
```

### Reading payload

The server can "collect" the string contents of the incoming requests (if multiple HTTP requests embody a single message):

```
var body		
request.on('data', function (chunk) {	
  body += chunk		
})
```
		
and use it when the whole message has arrived:

```
request.on('end', function () {
  console.log(body)
})
```

### Header
		
The server can assemble the response by filling the header and body properties, e.g.:
Giving the response's status code and content type:

```
response.writeHead(200, {'content-type' : 'text/plain'})
response.writeHead(200, {'Content-Type' : 'application/json'});
response.writeHead(404)
```

### Payload

Giving the payload of the response:

```
response.write("Print this message with the following JSON: " )
response.write(JSON.stringify(["some", "content"]) )
response.end("... this will be sent either")
var contentType = response.getHeader('content-type');
response.setHeader("Content-Type", "text/html");
```
		
The request and response objects are Stream objects. 

#### Streaming response
		
The request's input stream can be directed into the response's output stream by applying modifications:

```
var map = require('through2-map')
request.pipe( map( function(chunk) {
  return chunk.toString().toUpperCase()
})).pipe(response)
```

#### File content response

A file can be written into the payload of the response:

```
var fs = require('fs')
var readStream = fs.createReadStream(filename)
readStream.on('open', function () {
  readStream.pipe(response)
})
```

### Parsing request

The 'url' module can be used to parse the URL's properties. e.g.:
	
test it from console:

```
node -pe "require('url').parse('http://localhost:8080/api/parsetime?iso=2015-07-22T08:55:592329Z', true)"
```
		
or test it from a script:

```
var url = require('url');
url.parse('http://localhost:8080/api/parsetime?iso=2015-07-22T08:55:592329Z', true)
```
		
the result:

```
{ 
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'localhost:8080',
  port: '8080',
  hostname: 'localhost',
  hash: null,
  search: '?iso=2015-07-22T08:55:592329Z',
  query: { iso: '2015-07-22T08:55:592329Z' },
  pathname: '/api/parsetime',
  path: '/api/parsetime?iso=2015-07-22T08:55:592329Z',
  href: 'http://localhost:8080/api/parsetime?iso=2015-07-22T08:55:592329Z' 
}
```

### Helpful functions

```
var str = JSON.stringify(["some", "content"])
var str = JSON.parse(json_content)
```

# HTTP Client

To create a HTTP client at first you have to include the "http" module:

```
var http = require('http');
```

## General method for GET/POST/PUT/OPTION requests

You can send messages to a server in form (the URL is given directly):
	
```
myCallbackFunction = function(response) {...}
var request = http.request("http://localhost:8080/foo.html", myCallbackFunction)
request.end()
```
		
or by creating an option object:

```
myCallbackFunction = function(response) {...}
var options = {
  method: 'POST', 
  host: 'localhost',
  port: 8080,
  path: '/foo.html'
}
var request = http.request(options, myCallbackFunction)
request.end()
```
		
Where the `end()` sends the request to the server

## Simple GET requests

If you want to send a GET message, there is a simpler version of sending requests:

```
http.get(options_structure_or_just_url, myCallbackFunction);
```

or

```
http.get(options_structure_or_just_url, function callback(response) { ... });
```

the specialization of the more powerful `request()` is the `get()` function, which includes the `end()` functionality

## Response from server

The response from the server is a Stream object and it is possible to subscribe to it's events: 
	
### Skeleton withouth payload, GET request

Skeleton code for a client (simpler GET message, without error handling and payload):
	
```
var http = require('http');
http.get(url, myCallbackFunction);

function myCallbackFunction(response) {	
		
  response.on("data", function(data) { ... });			
  response.on("error", function(error) { ... });			
  response.on("end", function(end) { ... });
			
  response.setEncoding("utf8");
}
```
	
### Skeleton with payload, POST request

Skeleton for a client request with payload (more complex POST message with error handling and payload):
	
```
var http = require('http');
var data = 'silly_kitty'

var post_options = {
  host: 'localhost',
  port: '9901',
  path: '/compile',
  method: 'POST',
  headers: {
    'Content-Type': 'application/text',
    'Content-Length': data.length
  }
}

var post_req = http.request(post_options, function(res) {

  res.setEncoding('utf8');
			
  res.on('data', function (chunk) { console.log('Response: ' + chunk);})	
    res.on('error', function (error) {	console.log('Error: ' + error);	})		
    res.on('end', function () {	console.log('End');	
  })			
})

post_req.on('error', function(error){
  console.log('Something went wrong.')
})

post_req.write(data);
post_req.end();
```

#### The 'request' module

An easier method for sending payload is by using request module: `request.post(url, form, callback)`

```
var request = require('request');
request.post(
  'http://localhost:8080/application',
  { form: { key: 'value' } },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    }
  }
)
```

# Testing your HTTP server

Testing the server is possible by using a Chrome extension named `Advanced Rest Client Application`

**Warning**: You can test your HTTP sending requests using your internet browser, but in that case be prepared to receive hidden requests from your browser. The reason of this is that the modern browsers (Chrome, Firefox etc.) want to load parts of the website before sendig the actual requests because of increasing the user experience.
That's the reason of frequently sending requests for downloading the `favicon.ico`. To handle these requests you can use the following scheme:
	
```
var server = http.createServer(function(request, response) {

  if (request.url === '/favicon.ico') {
    response.writeHead(200, {'Content-Type': 'image/x-icon'} );
    response.end();
    console.log('favicon requested');
    return;
  }

  request.on('data', function (chunk) { ... })
  request.on('end', function () {	... })
  request.on('error', function () { ...})
})
```

# TCP server

After creating a HTTP server example the creation of a TCP server is easy. There are only minor differences:
	
## Include

```
var net = require('net');
```
	
## Creating a server
		
```
function callback (socket){ ... }
var server = net.createServer( callback );
```
		
or

```
var server = net.createServer( function (socket){...} );
```
		
Listening on port:
		
```
server.listen(portnum);
```
		
The socket object is a Node duplex stream, can be read and written. It contains a lot of metadata regarding to the connection.
		
```
socket.write()
socket.end()
```

## Skeleton

A skeleton example for TCP:
		
```
var portnum = process.argv[2];
var net = require('net');

var server = net.createServer( function (socket){

  if (socket == null)
    return "";	
  socket.write(data+"\n");
  socket.end();	
  //socket.end(data);
});

server.listen(portnum);
```
