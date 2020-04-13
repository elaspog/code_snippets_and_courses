
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

## S04 Getting Started with NginX

### S04/L18 Installing Nginx on Docker (new)

```
docker --version
docker images
docker run -dit 80:80 centos:6 /bin/bash
docker ps
docker exec -it <container_id> bash
```
container:
```
npm -qa | grep nginx
yum -y install epel-release
yum -y install nginx

service nginx status
service nginx start
cd /etc/nginx
vi nginx.conf
# exit
service nginx status
netstat -ntlp
# running on port 80
CTRL+P and Q  # exit container
docker ps
```
browser:
```
127.0.0.1
# default nginx page
```

**Modify host file:**

`c:\Windows\System32\Drivers\etc\hosts`:
```
127.0.0.1 example.com
```

### S04/L19 Understanding NGINX Architecture (New)

- NginX Configuration File
- Master Process
  - Reads the configuration file
  - Launches Worker processes
- Worker Processes
  - Responsible for interaction with the clients

#### worker_processes

`/etc/nginx/nginx.conf`:
```
worker_processes auto;    # the amount of worker processes, depends on CPU core number
```
console:
```
ps -ef --forest | grep nginx
nginx: master process /usr/sbin/nginx -c /etc/nginx/nginx.conf
\_ nginx: worker process
\_ nginx: worker process

cat /proc/cpuinfo
# number of processors
```

`/etc/nginx/nginx.conf`:
```
worker_processes 4;
```
console:
```
service nginx reload
ps -ef --forest | grep nginx
# 4 worker processes
```

#### user

- not related with the master process
- defines which user of worker processes start with

`/etc/nginx/nginx.conf`:
```
user nginx;               # will be inherited by worker processes
```

Master process will start with the user that starts the service (e.g. `root` user in this case).

console:
```
ps -ef --forest | grep nginx
root  ... nginx: master process /usr/sbin/nginx -c /etc/nginx/nginx.conf
nginx ... \_ nginx: worker process
nginx ... \_ nginx: worker process
```

#### error_log

`/var/log/nginx/error.log` - contains information related to nginx

`/etc/nginx/nginx.conf`:
```
error_log /var/log/nginx/error.log;
```

console:
```
cat var/log/nginx/error.log
# empty if no error in nginx
# bad configuration will result errors in this file
```

#### access_log

`/var/log/nginx/access.log` - contains information related to clients which are connecting to the webserver.

#### pid

process id of the master process

`/etc/nginx/nginx.conf`:
```
pid /var/run/nginx/pid;   # process id of the master process
```
console:
```
cat /var/run/nginx/pid
ps -ef --forest | grep nginx
root  ... nginx: master process /usr/sbin/nginx -c /etc/nginx/nginx.conf
nginx ... \_ nginx: worker process
nginx ... \_ nginx: worker process
```

### S04/L20 NGINX Configuration - Events and HTTP (New)

#### events

`/etc/nginx/nginx.conf`:
```
events {
  worker_connections 1024;  # how many connections a worker can have
}
```

#### http

- **access_log** - The format is defined by `log_format`
  - IP address
  - timestamp
  - request type
  - response code
  - user agent
- **log_format** - uses variables e.g.:
  - $remote_add - IP of the client
  - etc.

```
# put error into file
service nginx restart
# error_log file changes

# test configuration file
nginx -t
```

### S04/L21 NGINX Configuration - Include directive (New)

#### include

Includes all the contents. Makes easier to read and debug the configuration.

`/etc/nginx/nginx.conf`:
```
include /etc/nginx/mime.types;
```

### S04/L22 Creating Virtual Hosts in NGINX (New)

`/usr/share/nginx/html/index.html` is the default page NginX shows.

`/etc/nginx/nginx.conf`:
```
include /etc/nginx/conf.d/*.conf;
```

`/etc/nginx/conf.d/default.conf`:
```
# change the port from 80 to 8080
# listen 80 default_server;
listen 8080 default_server;
# ...
root /usr/share/nginx/html;   # path of the index.html
```

console:
```
netstat -nltp
nginx -t
service nginx restart
# nginx listening on 8080

# change back to default configuration
```

`virtual.conf`:
```
server {
  listen        8080;                           # defines port where nginx listens on
  listen        somename:8080;
  server_name   somename alias another.alias;   # will be present in the hostname header of the client

  location / {
    root        html;                           # directory in which the website is stored
    index       index.html index.htm;           # first file found will be laded by default
  }
}
```

console:
```
cp virtual.conf kplabs.conf

# modify the file names to avoid loading them by the pattern
mv default.conf default.conf.bak
mv ssl.conf ssl.conf.bak
mv virtual.conf virtual.conf.bak

mkdir -p /var/www/websites
cd /var/www/websites
touch index.html

cd /etc/nginx/conf.d
nginx -t
service nginx restart
```

`kplabs.conf`:
```
server {
  listen        80;
  server_name   example.com;

  location / {
    root        /var/www/websites/;
    index       index.html index.htm;
  }
}
```

`/var/www/websites/index.html`:
```
Welcome to our first website based on nginx :)
```

- multiple server block can be defined in a configuration file

### S04/L23 MIME Types (New)

- **MIME** - Multi-Purpose Internet Mail Extensions
  - Images
  - HTML files
  - Video files
  - Audio files
  - Documents
  - etc.
- Web Server also sends the MIME filetype when sends a file to a client
- Web browser might have certain type of extensions for MIME filetypes installed

```
curl -I https://www.sans.org/media/score/checklist/FirewallChecklist.pdf
# Content-Type: application/pdf

curl -I http://example.com/seed.jpg
# Content-Type: image/jpeg
```

- Content-Type header indicated the media type of a specific resource
  - application/pdf
  - text/html

`/etc/nginx/nginx.conf`:
```
include /etc/nginx/mime.types;
default_type application/octet-stream;    # for files that don't meet the extensions from the included MIME types
```

**default_type application/octet-stream** - tells the browser to directly download it and not process it

`include /etc/nginx/mime.types`:
```
types {
  text/html   html htm shtml;
  image/jpeg  jpeg jpg;
  ...
  video/mp4   mp4;
  ...
}
```

console:
```
cat /etc/nginx/mime.types | grep octet-stream
# file types specific to operating systems

wget ftp://distro.ibiblio.com/pub/linux/distributions/damnsmall/current/pcmciafloppy.img
mv pcmciafloppy.img test.img

curl -I http://example.com/test.img
# Content-Type: applicatiom/octet-stream
```

- Common MIME types (main_type/sub_type):
  - application/*
  - audio/*
  - image/*
  - text/*
  - video/*
