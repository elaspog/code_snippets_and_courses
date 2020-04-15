
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

## S05 Reverse Proxy

### S05/L24 Introduction to Reverse Proxy (New)

Reverse Proxy is type of proxy server which retrieves resources on behalf of a client from one or more servers

- NginX server is sitting between the client and application server
- The application server is not directly exposed to the client
- DDoS protection
- Web Application Firewall
- Caching


- Hides the existence of the original backend server
- Can protect the back-end servers from web-based attacks, DOS and many more
- Can provide great caching functionality
- Can optimize the content by compressing it
- Can act as a SSL Termination proxy
- Request Routing and many more


both on `172.17.0.2` (reverse proxy) and `172.17.0.3` (application server):
```
ifconfig
tail -f /var/log/nginx/access.log
```
browser `172.17.0.1`:
```
example.com
```
both on `172.17.0.2` (reverse proxy) and `172.17.0.3` (application server):
```
# both /var/log/nginx/access.log files ha a new entry
```

### S05/L25 Configuring NGINX as a Reverse Proxy (New)

**proxy_pass** directive forwards the request to the proxied servers specified along with the directive

```
location / {
  proxy_pass http://192.168.10.50;  # any request comes to / gets forwarded to the proxied server
}
```

request based routing:

```
location /admin {
  proxy_pass http://192.168.10.50;
}
location /login {
  proxy_pass http://10.50.30.20;
}
```

```
docker ps
# docker container running the application
docker images
docker commit <container_id> centos-nginx
docker images
# new image is present

docker run -dit -p 8080:80 centos-nginx:latest /bin/bash
docker ps

docker exec -it <container_id_of_application> bash
service nginx status
service nginx restart
service nginx restart
```

`/var/www/websites/index.html` in container:
```
<html>
<h3>This is our backend server</h3>
</html>
```

browser:
```
example.com:8080
```
console:
```
docker exec -it <container_id_of_revproxy> bash
```

`/etc/nginx/conf.d/kplabs.conf` in reverse proxy container:
```
server {
  listen        80;
  server_name   example.com;

  location / {
    proxy_pass http://172.17.0.3;
  }
}
```
in both `172.17.0.2` (reverse proxy) and `172.17.0.3` (application server) containers:
```
nginx -t
service nginx restart
tail -f /var/log/nginx/access.log
```
browser:
```
example.com
```

### S05/L26 Need for X-Real-IP (New)

- Must be done when running as Reverse Proxy or as Load Balancer
- Ensures that the Web server gets the IP address of the client and not the reverse proxy
  - e.g.: whitelisting based on IP addresses

`/etc/nginx/conf.d/kplabs.conf` in container:
```
server {
  listen        80;
  server_name   example.com;

  location / {
    proxy_pass       http://172.17.0.3;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```
in `172.17.0.2` (reverse proxy) container:
```
nginx -t
service nginx restart
```

In `/etc/nginx/nginx.conf` the value of the `log_format` can be replaced from `$remote_addr` to `$http_x_real_ip`.

### S05/L27 Proxy Host Header (New)

The reverse proxy NginX will keep the `GET` and remove the `Host` from the Request which might be a problem if multiple websites are hosted.

backend docker container:
```
yum -y install tcpdump

# listens at interface eth0 for port 80 traffic then copies the traffic to the file
tcpdump -A -vvvv -s 9999 -i eth0 port 80 > /tmp/headers
```
in host:
```
curl http://example.com
```
backend docker container:
```
nano /tmp/headers
# no Host in header
```

`/etc/nginx/conf.d/kplabs.conf` in reverse proxy container:
```
server {
  listen        80;
  server_name   example.com;

  location / {
    proxy_pass       http://172.17.0.3;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
  }
}
```
in `172.17.0.2` (reverse proxy) container:
```
nginx -t
service nginx restart
```
in `172.17.0.3` (backend server) container:
```
echo > /tmp/headers
tcpdump -A -vvvv -s 9999 -i eth0 port 80 > /tmp/headers
```
in host:
```
curl http://example.com
```
backend docker container:
```
# Stop tcpdump

nano /tmp/headers
# Host in header: example.com
```

## S06 Load Balancers

### S06/L28 Introduction to Load Balancers

- case 1: All-in-One Box
  - Web Server (NGINX)
  - Web Application (Wordpress)
  - Database (MySQL)
  - if one component has issues, everything goes down
- case 2: Load Balancer
  - Backend Servers
  - load is distributed across multiple backend instances

### S06/L29 Simple Load Balancer with NGINX Docker - Practical

Load Balancers: HAProxy, AWS Elastic Load Balancer, NginX

```
docker ps
# 2 containers running
# a backend (centos:-nginx:latest)
# an nginx (centos:6) used as reverse proxy in the previous section

docker images

docker run -dit -p 8081:80 centos-nginx:latest /bin/bash
# new backend is running

docker exec -it <new_backend_container_id> bash
```
`/var/www/websites/index.html` from container:
```
This is our container 3
```
container:
```
service nginx restart
ifconfig
# eth0: inet addr: 172.17.0.4
```
browser:
```
example.com:8081
```

```
docker exec -it <reverse_proxy_container_id> bash
```
`/etc/nginx/conf.d/kplabs.conf` from container:
```
upstream backend {
  server 172.17.0.3;
  server 172.17.0.4;
}

server {
  listen        80;
  server_name   example.com;

  location / {
    proxy_pass       http://backend;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
  }
}
```
container:
```
nginx -t
service nginx restart
```
in host:
```
curl http://example.com
# request from backend 1

curl http://example.com
# request from backend 2
```

### S06/L30 Health Checks in Load Balancer (New)

host:
```
curl http://example.com
# request from backend 1

curl http://example.com
# request from backend 2

# ... this repeats
# Round Robin is experienced

docker exec -it <a_backend_container_id> bash
```
container:
```
service stop nginx
# one of the backend container stops working
```
host:
```
curl http://example.com
# request from backend 1

curl http://example.com
# request from backend 1

# all requests are served by a single container
```
container:
```
service start nginx
```
host:
```
curl http://example.com
# request from backend 1

curl http://example.com
# request from backend 1

# nginx will wait a certain amount of time before trying to use again the bad backed even the backend is fixed

curl http://example.com
# request from backend 2 (again after the waiting time)
```

- Types of health checks
  - Active Health Check (available only in NginX Plus)
  - Passive Health Check

### S06/L31 Understanding Passive Health Monitoring (New)

- Passsive Health Check
  - the communication between client and the upstream server is monitored by nginx
  - if the upstream server is not responding or rejecting connections, the passive health check will consider the server to be unhealthy
  - there is timeout for the response from the backend server
  - there is waiting time for retry after the backend server was identified broken

### S06/L32 Parameter Configurations in Passive Health Checks (New)

host:
```
docker exec -it <load_balancer_container_id> bash
```
`/etc/nginx/conf.d/kplabs.conf` from container:
```
upstream backend {
  server 172.17.0.3;
  server 172.17.0.4 max_fails=2 fail_timeout=30s;
}

server {
  listen        80;
  server_name   example.com;

  location / {
    proxy_pass       http://backend;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
  }
}
```
container:
```
nginx -t
service nginx restart
```

`max_fails=2 fail_timeout=30s` - if backend fails to respond or gives connection timeout 2 times within 30 seconds then the load balancer stops sending any traffic to the server for the next 30 seconds

### S06/L33 Active vs Passive Health Monitoring

- **Passive Health Monitoring**
  - checks the responds from the backend
  - tries to figure out the status of the server from the timeouts and missing responses
  - retries to send request after time
- **Active  Health Monitoring**
  - tries to contact the backend in every N seconds
    - if gets response it assumes the server is up
      - HTTP response code: 200, 300
    - if does not get response or gets bad HTTP response codes it assumes the server is down
      - HTTP response code (other than 2XX or 3XX): 404, 500
  - never send request to the server which is down

### S06/L34 Understanding Active Health Monitoring (New)

- Active Health Check in NginX Plus only
- sends special Health Check GET request
- 2XX and 3XX HTTP response code indicate healthy state

`/etc/nginx/conf.d/kplabs.conf` from load balancer container:
```
upstream backend {
  server        127.0.0.1:8080;
  zone backend  64k;
}

server {
  listen        80 default_server;
  server_name   _;

  location / {
    proxy_pass  http://backend;
    health_check;   # indicates active health check
  }
}
```
host:
```
docker exec -it <load_balancer> bash
service nginx status
tail -f /var/log/nginx/access.log
# every 5 seconds a new GET request is sent to check the health status
```
- NginX GUI shows the good status
```
service nginx stop
```
- NginX GUI shows the bad status
```
service nginx stop
```
- NginX GUI shows the good status

`/etc/nginx/conf.d/kplabs.conf` from container:
```
server {
  location / {
    proxy_pass  http://backend;
    health_check interval=10;   # indicates active health check
  }
}
```
host:
```
docker exec -it <load_balancer> bash
service nginx restart
tail -f /var/log/nginx/access.log
# every 10 seconds a new GET request is sent to check the health status
```

### S06/L35 Match Condition (New)

#### Simple file check

`/etc/nginx/conf.d/kplabs.conf` from load balancer container:
```
upstream backend {
  server        127.0.0.1:8080;
  zone backend  64k;
}

server {
  listen        80 default_server;
  server_name   _;

  location / {
    proxy_pass  http://backend;
    health_check interval=10 uri=/test.txt;   # set endpoint
  }
}
```
load balancer container:
```
nginx -t
service nginx restart
tail -f /var/log/nginx/access.log
# the GET request is sent to /test.txt
# but 404 error happend, because there is no such file

touch /usr/share/nginx/html/test.txt
echo Hi > /usr/share/nginx/html/test.txt
tail -f /var/log/nginx/access.log
# the GET request is sent to /test.txt
# server identified as good
```

#### Healthcheck string - non match

`/etc/nginx/conf.d/kplabs.conf` from load balancer container:
```
...
match server_test {
  status 200-399;
  body !~ maintenence;  # if the content is not "maintenence" then consider the status good
}
server {
  listen        80 default_server;
  server_name   _;

  location / {
    proxy_pass  http://backend;
    health_check interval=10 uri=/test.txt match=server_test;
  }
}
```
load balancer container:
```
nginx -t
service nginx restart
tail -f /var/log/nginx/access.log
# server identified as good

echo maintenence > /usr/share/nginx/html/test.txt
# server identified as bad
```

#### Healthcheck string - exact match

`/etc/nginx/conf.d/kplabs.conf` from load balancer container:
```
...
match server_test {
  status 200-399;
  body ~ "Welcome to nginx";  # if the content is "maintenence" then consider the status good
}
...
```
load balancer container:
```
nginx -t
service nginx restart
tail -f /var/log/nginx/access.log
# server identified as good
```

### S06/L36 Shared Memory & Active Health Monitoring

- Every worker process has different Zone file maintaining the state table
  - one worker can consider an upstream server down, but another one may consider it up
- **Shared Memory based architecture**
  - there is only one Zone file
  - the Zone file is read and written by all worker processes

In Active Health Monitoring a common Zone file can be used.

`/etc/nginx/conf.d/web.conf` from load balancer container:
```
upstream backend {
  server 52.4.121.83;
  server 52.3.20.56;
  zone backend 64k;   # the shared memory
}

server {
  server_name example.com;
  listen 80;

  location / {
    proxy_pass  http://backend;
    health_check;
  }
}
```

### S06/L37 Load Balancer - Server Weights (New)

- It's possible to distribute traffic unequal between servers to match the physical properties of the system, e.g.:
  - 20% of the traffic goes to the server with 1 GB RAM
  - 80% of the traffic goes to the server with 4 GB RAM

`/etc/nginx/conf.d/web.conf` from load balancer container:
```
upstream backend {
  server 172.17.0.3;
  server 172.17.0.4 weight=2;
}

server {
  listen 80;
  server_name example.com;

  location / {
    proxy_pass  http://backend;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
  }
}
```
load balancer container:
```
nginx -t
service nginx restart
```
host:
```
curl http://example.com
# request from backend 1

curl http://example.com
# request from backend 2

curl http://example.com
# request from backend 2
```

### S06/L38 Least Connect Method

- Setup
  - Different execution time / resource consumption on:
    - `big.php` as `b.php` - 20 sec
    - `small.php` as `s.php` - 1 sec
  - Two servers with the same configuration
  - Client Requests:
    - A (`b.php`): runs on Server 1 for 20 sec
    - B (`s.php`): runs on Server 2 for 1 sec
    - C
      - running it with Round Robin strategy on Server 1 is not
      - better to run on Server 2
- **Least Connect** - forward the request to the server which has least number of active connections
  - this routes request C to Server 2

`/etc/nginx/conf.d/web.conf` from load balancer container:
```
upstream backend {
  least_conn;       # specify load balancing algorithm (Round Robin is the default)
  server 52.4.121.83;
  server 52.3.20.56 weight=2;
}

server {
  server_name example.com;
  listen 80;
  location / {
    proxy_pass  http://backend/test.php;
  }
}
```
load balancer container:
```
nginx -t
service nginx restart
```
Server 1 (`big.php`):
```
tailf /var/log/nginx/*
```
Server 2 (`small.php`):
```
tailf /var/log/nginx/*
```
run **Apache Bench**:
```
# ab -n 20 -c <reverse_proxy_ip>/
ab -n 20 -c 10 52.6.237.228/
```
Server 1 (`big.php`):
```
# 5 requests
```
Server 2 (`small.php`):
```
# 15 requests
```

## S07 The Caching Subsystem

### S07/L39 Introduction to HTTP Caching (New

- "Local copy is better"
- Middleware cache server is responsible for caching
  - can be a software or a dedicated server
  - cache server has it's own storage
    - can be memory or hard disk based
  - if the resource was cached it's served from the middleware's storage

Firefox browser:
```
about:cache
```

- Caching:
  - reduces the overhead of server's resources
  - decreases the network bandwidth
  - pages are loaded much faster

### S07/L40 Understanding the HTTP Cache Control Headers (New)

- problem:
  - a newer version of the cached file might exists at the webserver
  - the older cached version is served instead of the newer version
- **Cache-Control headers**
  - specifies directives for caching mechanisms
  - are used to define caching policies, e.g.:
    - don't store any kind of cache at all
    - store the cache, but verify with webserver whether file is modified
    - store the cache for a given time

```
curl -I http://dexter.kplabs.in/myseed.jpg
# no cache-control header
# will be stored in the cache

curl -I http://dexter.kplabs.in/nostore.jpg
# Cache-Control: no-store
# will not be stored in the cache
```

- Cache-Control
  - e.g.:
    - `no-store`
    - `no-cache`
    - `must-revalidate`
    - `public`
    - `private`
  - can be combined e.g.:: `no-store`, `no-cache`, `must-revalidate`

### S07/L41 Cache Control Headers no-store (New)

Chrome browser:
```
http://dexter.kplabs.in/myseed.jpg
about:cache
# file can be seen as cached

http://dexter.kplabs.in/nostore.jpg
about:cache
# file can't be seen as cached
```

### S07/L42 Adding no-store response header in Nginx (New)

in nginx container:
```
cd /var/www/websites
wget http://dexter.kplabs.in/myseed.jpg
wget http://dexter.kplabs.in/nostore.png

# rename to avoid confusion
mv myseed.jpg dockerseed.jpg
mv nostore.jpg dockernostore.png
```
host:
```
curl -I http://dexter.kplabs.in/dockerseed.jpg
# no Cache-Control header

curl -I http://dexter.kplabs.in/dockernostore.png
# no Cache-Control header
```
`/etc/nginx/conf.d/kplabs.conf` from nginx container:
```
server {
  listen       80;
  server_name  example.com;

  location / {
    root       /var/www/websites/;
    index      index.html index.htm;
  }
  location ~ \.(png) {
    root       /var/www/websites/;
    add_header Cache-Control no-store;
  }
}
```
in nginx container:
```
nginx -t
service nginx restart
```
host/browser:
```
curl -I http://dexter.kplabs.in/dockerseed.jpg
# no Cache-Control header
# cached by browser

curl -I http://dexter.kplabs.in/dockernostore.png
# Cache-Control header is present
# not cached by browser
```

### S07/L43 If-Modified-Since Header (New)

1. Cache Server gets a **GET** request for a file
2. Cache Server asks the Web Server if the file was modified
  - while sending the timestamp of the cached version in `If-Modified-Since` header
3. if the file on the Web Server
  - was not modified:
    4. Web Server sends back to Cache Server: **304 Not Modified** without the file
    5. Cache Server serves the request from it's cache to the Client
  - was modified:
    4. Web Server sends back to Cache Server: **200 OK** and the file
    5. Cache Server caches the file and serves it to the Client

```
curl -I dexter.kplabs.in/dockerseed.jpg
# has Last-Modified header with timestamp
```
container:
```
tail -f /var/log/nginx/access.log
```
browser:
```
dexter.kplabs.in/dockerseed.jpg
# cached by web browser
# the last modified date is stored with the file
```
container:
```
# HTTP 304 - because there was no modification since
# CTRL+C

tcpdump -A -i eth0 'port 80'
```
browser:
```
dexter.kplabs.in/dockerseed.jpg
```
container:
```
# If-Modified-Since: ...
...
# 304 Not Modified
```

### S07/L44 Introduction to Cache-Control Headers

- a response can be cached in
  - Browser (Client side caching)
  - Cache Server (Intermediate proxy)
- Expires header can't specify where to cache
- a modern browsers will read the `Cache-Control` and ignore `Expires` headers
  - `Expires` is used for HTTP/1.0 compatibility

`/etc/nginx/conf.d/web.conf`:
```
server {
  server_name   example.com;

  location / {
    root    /var/www/websites/example;
    index   index.html index.html;
  }

  location ~ \.(png) {
    root    /var/www/websites/example;
    expires 1h;
  }

  location ~ \.(txt) {
    root    /var/www/websites/example;
    expires -1;
  }
}
```

```
curl -I http://example.com/logo.png
# Expires: Fri, 20 Nov 2015 01:02:49 GMT
# Cache-Control: max-age=3600
```

#### Date and Expires Header

```
Date:      Wed, 14 Apr 2015 20:00:00 GMT
Expires:   Thu, 15 Apr 2015 20:00:00 GMT
# expiration: 24 hours
```

#### Cache-Control Headers

```
Cache-Control: no-store         # do not cache anywhere
Cache-Control: no-cache         # can be cached, but must be revalidated first with the origin server
Cache-Control: max-age=0        # maximum age in seconds for the document is considered valid
Cache-Control: s-maxage=0       # for intermediate proxy node and not for the client

Cache-Control: must-revalidate  # similar to no-cache, but cache must revalidate the document after expired
Pragma: no-cache                # similar to no-cache, but for HTTP/1.0 applications for browsers
```

### S07/L45 The Q Factor

- **Content Negotiation**
  - when a video needs to be streamed:
    - for mobile client the lowest quality is best
    - for desktop browsers the highest quality is best
  - the client defines which version it needs the most
- **Q Parameter Scale**
  - 1 Most preferred
  - 0 Least Preferred

```
Accept-Languate: de,en-gb;q=0.8,en;q=0.7
Accept: text/html,application/xhtml+xml,application/xml;q=0.8,*/*;q=0.8
```

- if no `q` parameter is associated, then the `q=1`
- `*/*` means *any other*

```
# start the Wireshark
# in browser open: example.com/mywebsite.html
# stop the packet capture in Wireshark
# in Wireshark follow the stream: GET /mywebsite.html HTTP/1.1

GET /MYKPZ.PNG HTTP/1.1
Accept: image/png, image/svg+xml, image/*;q=0.8, */*;q=0.5
```

### S07/L46 Cache Control no-cache and must-re validate

- `no-store` - file can't be stored either in the public cache or the private cache
- `no-cache` - free to store the file, but needs revalidation from the origin server before serving, whether the file is fresh or not

`/etc/nginx/conf.d/web.conf`:
```
server {
  server_name   example.com;

  location / {
    root    /var/www/websites/example;
    index   index.html index.html;
  }

  location ~ \.(png) {
    root    /var/www/websites/example;
  }

  location ~ \.(html) {
    root    /var/www/websites/example;
    add_header Cache-Control no-store;
  }
}
```
host:
```
curl -I example.com/web.html
# Cache-Control: no-store
```
browser:
```
example.com/web.html
about:cache
# CTRL+F: web.html
# no cached version
```
`/etc/nginx/conf.d/web.conf`:
```
  ...
  location ~ \.(html) {
    root    /var/www/websites/example;
    add_header Cache-Control no-cache;
  }
  ...
```
host:
```
service nginx reload
curl -I example.com/web.html
# Cache-Control: no-cache
```
browser:
```
example.com/web.html
about:cache
# CTRL+F: web.html
# there is cached version
```
- when opening `web.html` the browser will have to revalidate with the server to make sure it has the latest version of this file due to `no-cache`
- `must-revalidate` forces the revalidation of the cached file at the origin server
  - cache should not serve the cached document until revalidated
  - 503 error is thrown if the cache can't revalidate, e.g.: origin server is down
  - if `must-revalidate` is not present, lot of webservers will serve the file when the origin server is down

`/etc/nginx/conf.d/web.conf`:
```
  ...
  location ~ \.(html) {
    root    /var/www/websites/example;
    add_header Cache-Control no-cache;
    add_header Cache-Control must-revalidate;
  }
  ...
```

`/etc/nginx/conf.d/web.conf`:
```
  ...
  location ~ \.(html) {
    root    /var/www/websites/example;
    add_header Cache-Control private max-age=200;   # private cache control
    add_header Cache-Control public s-maxage=500;   # public cache control
    add_header Cache-Control must-revalidate;
  }
  ...
```

### S07/L47 Cache Control Headers max-age & s-max-age

- browser is considered as private cache
- organisation's cache server is considered as public cache server

```
curl -I https://example.com/web.html
# no Cache-Control or Expire header
```
`/etc/nginx/conf.d/web.conf`:
```
server {
  server_name   example.com;

  location / {
    root    /var/www/websites/example;
    index   index.html index.html;
  }

  location ~ \.(png) {
    root    /var/www/websites/example;
  }

  location ~ \.(html) {
    root    /var/www/websites/example;
    add_header Cache-Control private max-age=120;
  }
}
```
host:
```
service nginx reload
curl -I example.com/web.html
# Cache-Control: max-age=120
```
`/etc/nginx/conf.d/web.conf`:
```
...
  location ~ \.(html) {
    root    /var/www/websites/example;
    add_header Cache-Control no-store;
  }
...
```
host:
```
service nginx reload
curl -I example.com/web.html
# Cache-Control: no-store
```
browser:
```
https://example.com/web.html
```
- the file is not in browser cache either

`/etc/nginx/conf.d/web.conf`:
```
...
  location ~ \.(html) {
    root    /var/www/websites/example;
    add_header Cache-Control max-age=120;
    add_header Cache-Control no-store;
    add_header Cache-Control s-maxage=200;
  }
...
```
host:
```
service nginx reload
curl -I example.com/web.html
# Cache-Control: max-age=120
# Cache-Control: no-store
# Cache-Control: s-maxage=200
```
- private cache server will store the document for `max-age=120` seconds
- public cache server will store the document for `s-maxage=200` seconds
- if `s-maxage` is not present but `max-age` is present
  - both the private and private brower cache will store the document for `max-age=120` seconds
- HTTP/1.0 had just the `Expires` header and did not have this flexibility

### S07/L48 Cache Time & Browser Analysis

`/etc/nginx/conf.d/web.conf`:
```
server {
  server_name   example.com;

  location / {
    root    /var/www/websites/example;
    index   index.html index.html;
  }

  location ~ \.(png) {
    root    /var/www/websites/example;
    expires 1h;
  }

  location ~ \.(txt) {
    root    /var/www/websites/example;
    expires -1;
  }
}
```
host:
```
curl -I http://example.com/logo.png
# Cache-Control: max-age=3600
```
browser:
```
about:cache
# number of entries
http://example.com/img1.png
# number of entries was increased by 1
```

### S07/L49 Expires Header

host:
```
curl -I http://example.com/logo.png
# no Expires header

curl -I http://example.com/sample.txt
# no Expires header
```
`/etc/nginx/conf.d/web.conf`:
```
server {
  server_name   example.com;

  location / {
    root    /var/www/websites/example;
    index   index.html index.html;
  }

  location ~ \.(png) {
    root    /var/www/websites/example;
    expires 48h;
  }
}
```
host:
```
service nginx reload

curl -I http://example.com/logo.png
# Expires header (in 48 hours)                  # HTTP/1.0
# Cache-Control: max-age=172800 (in 48 hours)   # HTTP/1.1

curl -I http://example.com/sample.txt
# no Expires header
```

`/etc/nginx/conf.d/web.conf`:
```
...
  location ~ \.(txt) {
    root    /var/www/websites/example;
    expires 1h;
  }
...
```
host:
```
service nginx reload

curl -I http://example.com/sample.txt
# Expires header (in 48 hours)                  # HTTP/1.0
# Cache-Control: max-age=172800 (in 48 hours)   # HTTP/1.1
```

`/etc/nginx/conf.d/web.conf`:
```
...
  location ~ \.(txt) {
    root    /var/www/websites/example;
    expires -1;     # do not cache
  }
...
```
host:
```
service nginx restart

curl -I http://example.com/sample.txt
# Expires has the same value as Data
# Cache-Control: no-cache
```

### S07/L50 Understanding the Keep Alive connections

- HTTP works based on TCP protocol
- in TCP  before any data can be sent a handshake must happen to open the connection, then close it
- a browser can send a lot of HTTP requests to a single server
  - multiple connection
    - TCP handshake is a CPU consuming process
    - multiple handshakes can delay the process
  - persistent connection
    - handshake happens only once
    - `Keep-Alive` header
      - HTTP/1.0 - optional
      - HTTP/1.1 - mandatory

```
# Header
Connection: Keep-Alive
```

`/etc/nginx/nginx.conf`:
```
http {

  ...

  sendfile            on;
  # tcp_nopush        on;

  keepalive_timeout   0;
  # keepalive_timeout 65;
}
```

#### Without Keep-Alive

`/etc/nginx/nginx.conf`:
```
http {
  ...
  keepalive_timeout   0;
}
```
host:
```
service nginx restart
```

1. Wireshark
  - start the packet capture
2. Firefox browser:
  ```
  # open the inspector mode
  example.com/mindex.html
  # 2 HTTP requests were made
  ```
3. Wireshark
  - close the packet capture
  - Filter: `tcp.stream eq 0`
    - Follow TCP stream on HTTP GET /mindex.html
  - Filter: `tcp.stream eq 1`
    - Follow TCP stream on HTTP GET /mindex.png
  - 2 tcp streams with TCP handshakes

#### With Keep-Alive

`/etc/nginx/nginx.conf`:
```
http {
  ...
  keepalive_timeout   65;
}
```
host:
```
service nginx restart
```

1. Wireshark
  - start the packet capture
2. Firefox browser:
  ```
  # open the inspector mode
  example.com/mindex.html
  # 2 HTTP requests were made
  ```
3. Wireshark
  - close the packet capture
  - Filter: `tcp.stream eq 0`
    - Follow TCP stream
      - HTTP GET /mindex.html
      - HTTP GET /mindex.png
  - 1 tcp streams with TCP handshakes

```
# the same package capture on klowledgeportal.in
# 104 requests were sent
```

### S07/L51 Date & Expires Header

- Expire Header defines how long the resource should be stored in cache memory
```
Expires: Thu, 18 Nov 2015 23:53:39 GMT
```
- Date Header tells about the current GMT date according to the Server
```
Date: Thu, 17 Nov 2015 23:53:39 GMT
```
- The date is in GMT not in local date of the server
  - if the server time is out of sync, the client can calculate with a simple subtraction from `Expires` and `Date` headers how long to store the resource in the cache

```
curl -I http://example.com/logo.png

# HTTP/1.0
Date: Thu, 17 Nov 2015 23:53:39 GMT
Expires: Thu, 18 Nov 2015 23:53:39 GMT

# HTTP/1.1
Cache-Control: max-age=172800

curl -I http://example.com/sample.txt
Date: Thu, 17 Nov 2015 23:53:39 GMT
Expires: Thu, 18 Nov 2015 01:53:39 GMT
Cache-Control: max-age=3600
```

- the maximum amount of time the RFC recomends is 1 year
