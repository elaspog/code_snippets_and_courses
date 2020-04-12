
# Nginx 2019 - Beginner to Advanced

https://www.learningcrux.com/course/nginx-2019-beginner-to-advanced

## S01 Introduction to the Course

### S01/L01 Introduction to the Course

## S02 Setting Up Labs

### S02/L02 Introduction to Dockers

console:
```
docker pull nginx

docker run -p 8080:80 -dt nginx

docker ps
```

web browser:
````
127.0.0.1:8080
# NginX front page
````

### S02/L03 Setting up MobaXterm

https://mobaxterm.mobatek.

```
telnet
curl
ssh

curl -I dexter.kplabs.in
telnet dexter.kplabs.in 80
```

### S02/L04 Setting up Docker Environment

```
yum install -y docker-io

systemctl status docker
systemctl start docker
systemctl status

docker ps
docker ps -a
```

https://hub.docker.com/_/centos/

```
docker pull centos:6
docker images

docker run -dt <image_id>
docker ps

docker exec -it <container_id> bash
docker exec -it <container_name> bash

docker start <container_id>
docker exec -ti <container_name> bash
```

```
docker commit <container_id> first-commit
codker run -df first-commit
docker exec -it <container_id> bash
```

### S02/L05 Introduction to Nginx Plus Offering

- paid offering
- offers additional features
- **NginX Plus**
  - Web Application Firewall
  - Advance HTTP, TCP, UDP Load Balancing
  - Clustering
  - GUI for live activity monitoring and many more
  - NginX Inc Support

### S02/L06 Subscribing to NGINX Plus Subscription (New)

https://www.nginx.com/products

- Products
  - NginX Plus
    - register with Business email


- AWS NginX Plus EC2 instance
  - Free trial for 30 days

## S03 HTTP Protocol

### S03/L07 Introduction to Protocols (New)

- FTP - File Transfer Protocol
- DNS - Domain Name System Protocol
- TCP - Transmission Control Protocol
- SFTP - Secure File Transfer Protocol
- HTTP - Hyper Text Transfer Protocol
- IP - Internet Protocol

### S03/L08 HTTP - Protocol (New)

```
GET /documentary.mp4
HTTP/1.1  200 OK
Content-Type: video/mp4
```

- WireShark
- RFC: HTTP Protocol

### S03/L09 HTTP - GET (New)

- GET method is used to fetch information which is specified in the request URI

```
GET Request-URI
```

#### GET

```
GET /admin HTTP/1.1
Host: dexter.kplabs.in
```

```
dexter.kplabs.in/sample.html
dexter.kplabs.in/index.html
dexter.kplabs.in/video.mp4
```

#### Conditional GET

```
GET /sample.html HTTP/1.1
Host: dexter.kplabs.in
If-Modified-Since: Sat, 29 Oct 2017 19:43:31 GMT
```

#### Partial GET

```
GET /movie.mp4 HTTP/1.1
Host: dexter.kplabs.in
Range: bytes=0-1024
```

#### GET with Telnet

```
telnet dexter.kplabs.in 80

GET /sample.html HTTP/1.1
Host: Dexter.kplabs.in

# HTTP Response
```

### S03/L10 HTTP - Partial GET (New)

```
HTTP/1.1  206 Partial Content
```

Not working with HTTP/1.0.0.9

`dexter.kplabs.in/partial.txt`:
```
1
2
...
99
100
```

#### curl

```
curl dexter.kplabs.in/partial.txt
# gives back the content of the file

curl -I dexter.kplabs.in/partial.txt
# prints the response headers only
# e.g.: Content-Length, Accept-Ranges etc.

curl --header "Range: bytes=0-20" dexter.kplabs.in/partial.txt
# Request Header: new column: Range
# Response Header: 206, Content-Length, Content-Range
```

### S03/L11 HTTP - Conditional GET (New)

```
GET /sample.html HTTP/1.1
Host: dexter.kplabs.in
If-Modified-Since: Sat, 18 Oct 2017 05:19:43 GMT
```

```
curl -I dexter.kplabs.in/sample.html
# Response Header: Last-Modified

curl dexter.kplabs.in/sample.html

curl --header "If-Modified-Since Wed, 18 Oct 2017 05:19:43 GMT" dexter.kplabs.in/sample.html
# no response, the file was not modified since
curl -I --header "If-Modified-Since Wed, 18 Oct 2017 05:19:43 GMT" dexter.kplabs.in/sample.html
# 304 Not Modified

curl --header "If-Modified-Since Wed, 18 Oct 2017 05:18:43 GMT" dexter.kplabs.in/sample.html
# response, the file was modified since
curl -I --header "If-Modified-Since Wed, 18 Oct 2017 05:18:43 GMT" dexter.kplabs.in/sample.html
# 200 OK
```

Important in caching processes of browsers.

### S03/L12 HTTP POST

- useful at Login Forms
- POST is used to send some data to the server to be processed in some way

```
POST /login.php HTTP/1.1
Content-Type: ...
Content-Length: ...

Payload
```

### S03/L13 HTTP - Head (New)

- HTTP Response
  - Header Fields
  - Message Body
- HEAD Method - the server must not send body in the response

```
curl -I dexter.kplabs.in
curl -I http://dexter.kplabs.in/sample.html
# No message body in Wireshark
```

### S03/L14 HTTP Trace

Data can relay via multiple proxies

```
curl -X "TRACE" example.com
# Debug purposes: what's sent and what's received
```

Start **BurpSuite** (Free Edition) - interception proxy, then:
```
curl -X "TRACE" --proxy 127.0.0.1:8080 example.com

in BurpSuite add header:
via: theevil.com
```

Trace is disabled in NginX based webservers. Works with Apache based webservers.

### S03/L15 HTTP - OPTIONS Header (New)

OPTION method is used to describe the communication option for the target resource.

```
OPTIONS /index HTTP/1.1

curl -X OPTIONS http://example.org -i
```

```
curl -X "OPTIONS" http://139.162.60.216 -i
# in response:
Server: Apache/2.4.6
POST,OPTIONS,GET,HEAD,TRACE

curl -X "OPTIONS" https://dexter.kplabs.in -i
HTTP/1.1  405 Not Allowed
```

Not allowed in NginX by default

### S03/L16 HTTP - Request Methods (New)

- **GET** - to retrieve data from the server
- **POST** - send input data to the server
- **HEAD** - exactly like GET, but server only responds with Headers
- **PUT** - write documents to the server
- **DELETE** - deletes resource from the server
- **OPTIONS** - asks server on which methods it supports
- **TRACE** - ECHOS the Receive Request from the Web Server

Webserver Administrator can choose to allow or deny a request method

### S03/L17 HTTP - Response Status Code (New)

- **100-199** - Informational Status Code
- **200-299** – Success Status Code
  - received, understood, accepted, processed
  - 200 OK
  - 206 Partial Content
- **300-399** - Redirectional Status Code
  - client must take additional steps to complete the requests
  - generally used in URL redirection
  - 301 Moved Permanently
  - 304 Not Modified
- **400-499** - Client Error Status Code
  - client seem to have sent some request which is not an ideal one or error some
  - 401 Unathorized
  - 403 Forbidden
  - 404 Page Not Found
- **500-599** - Server Error Status Code
  - issue on the server side ant it has failed to fulfill the request
  - 500 Internal Server Error
  - 503 Service Unavailable
  - 504 Gateway TimeOut
