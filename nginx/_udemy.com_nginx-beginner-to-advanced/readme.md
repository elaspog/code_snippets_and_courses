
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

## S08 Static Assets

### S08/L52 Understanding Static Assets

- Reverse proxy don't have to forward the requests for non dynamically generated contents to upstream server
  - static assets e.g.: `jpeg`, `css`, `js`, (`html`)
- Nginx is efficient in serving static assets

### S08/L53 Configure Reverse Proxy with Static Assets

#### Serve static assets with upstream server (bad pattern)

reverse proxy `/etc/nginx/conf.d/kp.conf`:
```
server {
  server_name kp.in;

  location / {
    proxy_pass http://192.168.189.139;
    proxy_set_header Host $host;
  }
}
```
upstream server `/etc/nginx/conf.d/kp.conf`:
```
server {
  server_name kp.in;

  location / {
    root /var/www/websites/kp;
  }
}
```
upstream server:
```
ls /var/www/websites/kp
# files: php, html, js, css, images

tail -f /var/log/nginx/*
```
browser:
```
http://kp.in
```
upstream server:
```
# lot of GET request in log for a single page load
```

#### Serve static assets with reverse proxy (good pattern)

- copy all static files to reverse proxy under `/var/www/assets` folder

reverse proxy `/etc/nginx/conf.d/kp.conf`:
```
server {
  server_name kp.in;

  location / {
    proxy_pass http://192.168.189.139;
    proxy_set_header Host $host;
  }
  location ~* \.(css|js|jpe?g|JPG|png){
    root /var/www/assets;
    try_files $uri $uri/;
  }
}
```
reverse proxy:
```
nginx -t
service nginx reload
```

- delete the static assets from the upstream server

upstream server:
```
tail -f /var/log/nginx/*
```
browser:
```
http://kp.in
```
upstream server:
```
# much less GET requests in log for a single page load then previously
```

## S09 Access Control

### S09/L53 White Listing

- useful when only one IP address is allowed to access a resource
  - e.g.: the admin page

Example:
```
location /admin {
  allow 172.18.10.5;
  deny all;
}
```

#### Simple solution

`/etc/nginx/conf.d/web.conf`:
```
server {
  server_name example.com;

  location / {
    root /var/www/websites/example;
  }
  location /admin {
    root /var/www/websites/example;
    index index.html;
    allow 127.0.0.1;
    allow 192.168.189.137;
    deny all;
  }
}
```
host:
```
nginx -f
service nginx reload;
curl example.com/admin/
# Secret admin page
```

#### Better way (with include)

`/etc/nginx/conf.d/web.conf`:
```
  ...
  location /admin {
    root /var/www/websites/example;
    index index.html;
    include /etc/nginx/conf.d/WhiteList;
    deny all;
  }
  ...
```
`/etc/nginx/conf.d/WhiteList`:
```
allow 127.0.0.1;
allow 192.168.189.137;
```
host:
```
nginx -f
service nginx reload;
curl example.com/admin/
# Secret admin page
```

### S09/L54 limit_connection module

- useful for servers which are providing download related content
  - **bandwidth based restrictions** can be set on the server
- users with high download speed might use all the bandwidth of the server and other users will be unable to download

#### Without bandwith control

host `/etc/nginx/conf.d/example.conf`:
```
server {
  listen 80;

  location / {
    root /var/www/websites/example;
    index index.html index.htm;
  }

  location /downloads {
    root /var/www/websites/example;
  }
}
```
host:
```
nginx -f
mkdir /var/www/websites/example/downloads
cp /tmp/100mbt.test /var/www/websites/example/downloads/
service nginx reload
```
client:
```
wget servera.com/downloads/100mb.test
# full speed download
```

#### With bandwith control

host `/etc/nginx/conf.d/example.conf`:
```
  ...
  location /downloads {
    root /var/www/websites/example;
    limit_rate 50k;
  }
  ...
```
host:
```
nginx -f
service nginx reload
```
client:
```
wget servera.com/downloads/100mb.test
# download speed is limited
```

- the download limit is not restricted to an IP
- if another download process is started from the client, the download speeds of the two downloads add up

#### With bandwith control limited to IP

host `/etc/nginx/conf.d/example.conf`:
```
limit_conn_zone $binary_remote_addr zone=addr:10m;

server {
  ...
  location /downloads {
    root /var/www/websites/example;
    limit_rate 50k;
    limit_conn addr 1;
  }
  ...
}
```

- a new zone needs to be created for workers (to share information)
- `binary_remote_addr` - IP address of the client who will be downloading the file
- a particular IP address can only have one connection


host:
```
nginx -f
service nginx reload
```

- the download limit is restricted to an IP
- when trying to download from the server from the client while another download is in progress:

```
ERROR 503: Service Temporarily Unavailable
```

#### Limit the bandwidth after a downloaded amount

host `/etc/nginx/conf.d/example.conf`:
```
  ...
  location /downloads {
    root /var/www/websites/example;
    limit_rate_after 50m;
    limit_rate 50k;
    limit_conn addr 1;
  }
  ...
}
```

- first 50MB will be downloaded at full speed
- after 50MB the download speed will be limited in 50 kbps
  - e.g.: bandwidth restriction for non premium users

### S09/L55 Basic Authentication

- authentication for any endpoint, e.g.: for the admin page
- Authentication types
  - Basic
  - Digest
  - NTLM (not much used)

```
# Client->Server:
GET /admin HTTP/1.1

# Server->Client:
HTTP/1.1 401 Authorization Required
WWW-Authenticate: Basic realm="Family"

# Client->Server:
GET /admin HTTP/1.1
Authorization: Basic Ynjwel34ljh3fdl
```

- Encoding and not Encryption is used while authenticating
- **Base64** endocing


- in Wireshark start the packet capture
- in browser open `example.com/admin`
- follow the tcp stream: `GET /admin HTTP/1.1`

```
Client: GET /admin HTTP/1.1
Server: HTTP/1.1 401 Unathorized
        WWW-Authenticate: Basic realm="Basic Authentication"
Client: GET /admin HTTP/1.1
        Authorization: Basic YWRtaW46cGFzc3dvcmQ=
Server: HTTP/1.1 200 OK
```

- The base64 decoded value of `YWRtaW46cGFzc3dvcmQ=` is `admin:password`.
- The intercepted packets can be easily reverse engineered
- That's the reason why **Basic Authentication is not preferred to use without SSL encryption**

### S09/L56 Basic Authentication Practical

```
rpm -qa | grep httpd-tools
yum -y install httpd-tools
```
host `/etc/nginx/conf.d/web.conf`:
```
server {
  server_name example.com;

  location / {
    root /var/www/websites/example;
    index index.html index.htm;
  }

  location /admin {
    root /var/www/websites/example;
    index index.html;
  }
}
```
browser:
```
http://example.com/admin/
# not protected
```
host `/etc/nginx/conf.d/web.conf`:
```
  ...
  location /admin {
    root /var/www/websites/example;
    index index.html;
    auth_basic = " Basic Authentication ";
    auth_basic_user_file "/etc/nginx/.htpasswd"
  }
  ...
```
host:
```
htpasswd -c /etc/nginx/.htpasswd    # `-c` is for creat a new file
# enter password

cat .htpasswd
# admin:ZmsSnfjBzNT3A

nginx -t
service nginx reload
```
browser:
```
http://example.com/admin/
# asking for username and password
```

**Warning**: use this method with HTTPS or SSL, otherwise it's a security vulnerability.

### S09/L57 Understanding Hashing ( IHT )

#### MD5 checksum

- hashing is one way function, the original value can't be recovered

original file:
```
echo "secret text" > document
cat document

md5sum document
md5 document
# a9e9c2735a250c38ea0a12a1a0f42624
```
modify file:
```
echo "secret text." > document
cat document

md5sum document
md5 document
# 97fd4c3548668695be13106b83b22e1
```

- uses of hashing:
  - identify unintentionally changed programs, check system files if they have been changed by someone else
  - no need to store the raw passwords for authentication just their hashed values
  - verify integrity of a downloaded software

```
nano /etc/shadow
```

#### Encryption

- encryption is a two way function

### S09/L58 Understanding Digest Authentication

#### Basic Authentication

```
Client: GET /admin HTTP/1.1
Server: HTTP/1.1 401 Authorization Required
        WWW-Authenticate: Basic realm="Family"
Client: GET /admin HTTP/1.1
        Authorization: Basic YWRtaW46cGFzc3dvcmQ=
Server: HTTP/1.1 200 OK
```

- Response
  - **Base64** encoding
    - two way function
  - original value can be computed if intercepted

#### Digest Authentication

```
Client: GET /admin HTTP/1.1
Server: HTTP/1.1 401 Authorization Required
        WWW-Authenticate: Digest realm="Family"
        nonce = 66c4534Fe34Fwee45bb43
        qop = auth-int
Client: GET /admin HTTP/1.1
        Authorization: Digest
        nonce = 66c4534Fe34Fwee45bb43
        Response = "E44D04IAMSer323"
Server: HTTP/1.1 200 OK
```

- Response
  - **MD5** hashing
    - one way function
  - original value can't be computed if intercepted
  - Computation
    - H1(user + password + realm) = MD5
    - H2(URI + ReguestMethod) = MD5
    - H(MD5(H1), MD5(H2), nounce) = MD5 is the response to the server
  - **nounce**
    - prevents replay attacks
    - changes in every time interval


- **Digest Authentication**
  - not support by NginX
  - supported by Apache

### S09/L59 Digest Authentication Practical

- using Apache

browser:
```
http://example.com/admin
```
host:
```
# make sure apache is installed
rpm -qa | grep httpd

# stop nginx
service nginx stop
service nginx status

# start apache
service nginx httpd
```

`/etc/httpd/conf/httpd.conf`:
```
# verify this line
LoadModule auth_digest_module modules/mod_auth_digest.so

...

<Location /admin>
 AuthType Digest
 AuthName "knowledge-portal"
 AuthDigestDomain /admin
 AuthDigestProvider file
 AuthUserFile /etc/httpd/digest_pwd
 Require valid-user
</Location>
```

```
cd /etc/httpd/
htdigest -c digest_pwd knowledge-portal admin

service httpds restart
```

### S09/L60 GeoIP

- **ngx_http_geoip_module** module variables:
  - geoip_country, geoip_country_code
  - geoip_city
  - geoip_longitude
  - geoip_org
- https://dev.maxmind.com/geoip/legacy/codes/iso3166/

host:
```
rpm -qa | grep GeoIP
```

`/etc/nginx/nginx.conf`:
```
http {
  geoip_country /usr/share/GeoIP/GeoIP.dat;
  map "$host:$geoip_country_code" $deny_by_country {
    ~^example.com(?!IN) 1;        # restricted to India
    default 0;
  }
}
```
`/etc/nginx/conf.d/web.conf`:
```
server {
  server_name example.com;
  listem 80;
  if ($deny_by_country) { return 403; }
  location / {
    root /var/www/websites/example;
  }
}
```
host:
```
nginx -t
service nginx reload
```

## S10 Logging Subsystem

### S10/L61 Access Logs

- log files:
  - acces logs
  - error logs
- logging module: **ngx_http_log_module**
  - `$remote_addr` - IP address of the client which is trying to connect
  - `$remote_user` - the isername in case of HTTP Basic authentication
  - `$time_local` - timestamp
  - `$request` - HTTP method, URL, HTTP version
  - `$status` - HTTP response code
  - `$body_bytes_sent` - size of the response
  - `$http_referer`
  - `$http_user_agent` - browser, operating systems
  - `$http_x_forwarded_for` - useful when proxy is in between

`/etc/nginx/nginx.conf`:
```
http {
  ...
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

  access_log  /var/log/nginx/access.log  main;
}
```
host:
```
tail -f /var/log/nginx/access.log
```

### S10/L62 Configuring Custom Access Logs

`/etc/nginx/nginx.conf`:
```
  log_format master "$remote_addr" - "$status";

  access_log  /var/log/nginx/access.log  master;
```
host:
```
nginx -t
service nginx reload
```
browser:
```
https://example.com/myseed1.jpeg
```
host:
```
/var/log/nginx/access.log
# different format
```

#### Different logs for each server

- put `access_log` into server directive

`/etc/nginx/conf.d/web.conf`:
```
server {
  server_name example.com;
  access_log  /var/log/nginx/example.log  main;
  listem 80;
  if ($deny_by_country) { return 403; }
  location / {
    root /var/www/websites/example;
  }
}
```

### S10/L63 Error Logs

- Levels of logging:
  - **emerg** - error in the config, nginx won't start
  - **alert**
  - **crit**
  - **error**
  - **warn**
  - **notice**
  - **info**
  - **debug** - not enabled, need to compile nginx to enable
- no documentation about what these log level mean
- not the same flexibility for the configuration as the access logs have
  - only the file path and level of logging can be changed

`/etc/nginx/nginx.conf`:
```
  error_log  /var/log/nginx/access.log  master;
```
host:
```
tail -f /var/log/nginx/*.log
```
browser:
```
http://example.com/non-existent.file
```

- Format
  - timestamp
  - log level
  - process id - which handled the request
  - thread number - of the worker node
  - error message
  - client IP
  - hostname

## S11 HTTP Compression

### S11/L64 HTTP Compression

- saves bandwidth
- faster load time

### S11/L65 Accept Content Encoding

- HTTP Headers
   - Accept Encoding
   - Content Encoding

```
# size sshd_config.txt = 3.8K
gzip -9 -c sshd_config.txt > sshd.gz
# size sshd.gz = 1.8K
```

- Compression protocols supported by HTTP Protocol:
  - **gzip**
  - **deflate**
  - **compress**

```
# client -> server
GET /test.txt HTTP/1.1
Host: example.com
User-Agent: Mozilla 5.0
Accept-Encoding: gzip, deflate

# server -> client
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Encoding: gzip
```

- if the client does not send the `Accept-Encoding` header, the server can assume that the client understands all the type of encoding algorithms
- the `Content-Type` will remain the content type of the original file

### S11/L66 Getting started with Gzip for Nginx

`/etc/nginx/nginx.conf`:
```
http {
  ...
  gzip on;
  gzip_types text/plain text/css test/xml text/javascript;
  gzip_disable "MSIE [1-6]\.";
  gzip_comp_level 9;
}
```

- necessary to specify the type
- image or video files shall not be compressed
- text based data shall be compressed
- Microsoft Internet Explorer 1-6 does not support gzip
- compression level:
  - 1 - fastest, but poor compression
  - 9 - slowest, but best compression

host:
```
nginx -t
service nginx reload

curl http://example.com/sshd_config.txt > c1.txt
# 3.8K

curl -H "Accept-Encoding: gzip" http://example.com/sshd_config.txt > c2.txt
# 1.8K
```

## S12 Yet To Decide

### S12/L67 HTTP Referrer

- famous sites/blogs are copied, but text or images may refer back to the original site, e.g.:
  - original site: `a.com`
    - serves the image and text
  - copied site: `b.com`
    - serves the copied text
    - tries to retrieve the image from `a.com`
- the system administrator:
  - can know where the request/clients comes from
  - can ban referring (not to allow stealing of resources)
- **Image Hot-Linking & Referrer header**

`/etc/nginx/conf.d/web.conf`:
```
server {
  ...
  location ~ \.(jpe?g|png|gif)$ {
    valid_referrers none blocked servera.com *.servera.com;  # serverb.com is an invalid referrer
    if ($invalid_referrer) {
      return 403;
    }
  }
}
```

Allow Hot-Linking for search engines:
```
    valid_referrers none blocked google.com bing.com servera.com *.servera.com;
```

- in `log_format` the `$http_referer` variable contains the referer information

### S12/L68 Accept Language & Content Language

- Based on: Content Negotiation Protocol, Quality parameter
- `Accept-Language` - language prefered by the client
  - specified by the browser settings
```
Accept-Language: da, en-gb;q=0.8, en;q=0.7
```
- the served page can be dependent to the value of the `Accept-Language`, e.g.:
  - `Accept-Language: ja,en` can choose between `en-web1.html`, `ja-web1.html`
- `Content-Language` - determines the language of the body for the intended audience
  - not the same as language of the message body
  - `Content-Language: en` - the body is for the audience who understand english

```
curl --header "Accept-Language: en" example.com/hu.html
# This is the English Version of the Website.

curl --header "Accept-Language: ja" example.com/hu.html
# This is the Japanese Version of the Website.
```

## S13 Web Application Firewall

### S13/L69 Understanding the Modular NGINX Architecture

- nginx has modular based architecture
  - e.g.: GeoIP, WAF, Video Streaming
- third party modules also exists for nginx

```
nginx -V
```

- modules can be added/removed via compilation of nginx
- install from package contains a specific set of modules

```
# modules of Apache httpd: *.so
ls /etc/httpd/modules

# linux modules:
lsmod
```

### S13/L70 Compiling Nginx from Source

install packages to compile:
```
# install packages for compiling
yum -y instal gcc gcc-c++ make zlib-devel pcre-devel openssl-devel
```
get source file:
```
wget http://nginx.org/download/nginx-1.9.0.tar.gz
tar -xzvf nginx-1.9.0.tar.gz
cd nginx-1.9.0
```
configure and compile:
```
nano configure
./configure --help

# compile with core modules only
./configure --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --user=nginx --group=nginx --pid-path=/var/run/nginx.pid

# compile with core modules and an extra module
./configure --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --user=nginx --group=nginx --pid-path=/var/run/nginx.pid --with_http_gzip_static_module

make
make install
```
set environment:
```
# add user and group:
useradd nginx
groupadd nginx
# ...

service nginx status
# nginx: unrecognized service
# because no init.d script available

wget -O /etc/init.d/nginx https://gist.github.com/sairam/5892520/raw/b8195a71e944d46271c8a49f2717f70bcd04bf1a/etc-init.d-nginx
chmod +x /etc/init.d/nginx
service nginx status
service nginx restart

curl 127.0.0.1
```

### S13/L71 Web Application Firewall

- simple firewall
  - checks for **Source IP**
  - checks for **Destination PORT**
  - can't loook into the HTTP packets
  - can't detect the webapplication based hacking attempts
- **Web Application Firewall**
  - looks into HTTP packets, can determine if it's content is related to legitimate or hacking activity
- Web Applications are the weakest link, even if very strong parameter security or firewall settings are set


- OWASP TOP 10 - web applications attacks
  - Injection
  - Broken Authentication and Session Management
  - Cross-Site Scripting (XSS)
  - Insecure Direct Object References
  - Security Misconfiguration
  - Sensitive Data Exposure
  - Missing Function Level Access Control
  - Cross-Site Request Forgery (CSRF)
  - Using Components with Known Vulnerabilities
  - Unvalidated Redirects and Forwards

```
less /var/log/nginx/error.log* | grep --color learning
# potential web application related attacks
```

### S13/L72 Installing & Configuring WAF on Nginx

- **NAXSI** - open source WAF for NGINX

Get NGINX and NAXSI:
```
wget http://nginx.org/download/nginx-1.9.5.tar.gz
tar -xzvf nginx-1.9.5.tar.gz

wget https://github.com/nbs-system/naxsi/archive/master.zip
unzip master.zip
```
install packages to compile:
```
# install packages for compiling
yum -y instal gcc make GeoIP GeoIP-devel pcre-devel openssl openssl-devel
```
configure and compile:
```
# compile with core modules and an extra module
./configure --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --conf-path=/etc/nginx/nginx.conf --add-modules=../naxsi-master/naxsi_src --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --lock-path=/var/run/nginx.lock --http-client-body-temp-path=/var/cache/nginx/client_temp --http-proxy-temp-path=/var/cache/nginx/proxy_temp --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp --http-scgi-temp-path=/var/cache/nginx/scgi_temp --user=nginx --group=nginx --with-http_ssl_module --with-http_realip_module --with-http_addition_module --with-http_sub_module

make
make install
```

```
ls -l /etc/init.d/nginx
# download the init script from previous lecture if needed

service nginx status
service nginx restart
```

- rules for checking HTTP Request URI: `/usr/local/src/naxsi-master/naxsi-config/naxsi-core.rules`

```
cp /usr/local/src/naxsi-master/naxsi-config/naxsi-core.rules /etc/nginx
```
`/etc/nginx/nginx.conf`:
```
http {
  ...
  include /etc/nginx/naxsi-core.rules;
  ...
  server {
    listen 80;
    server_name example.com;

    location / {
      root /var/www/html;
      index index.html;
      include /etc/nginx/naxsi.rules;
    }
  }
}
```
`/etc/nginx/naxsi.rules`:
```
LearningMode;
SecRulesEnabled;
#SecRulesDisabled;
DeniedUrl "/RequestDenied.txt";

## Check & Blocking Rules
CheckRule "$SQL >= 8" BLOCK;
CheckRule "$RFI >= 8" BLOCK;
CheckRule "$TRAVERSAL >= 4" BLOCK;
CheckRule "$EVADE >= 4" BLOCK;
CheckRule "$XSS >= 4" BLOCK;
```
host:
```
mkdir /var/www/html
echo "Hi" > /var/www/html/index.html
echo "Not So Fast!" > /var/www/html/RequestDenied.txt

nginx -t
service nginx reload
tail -f /var/log/nginx/*
```
browser:
```
example.com/?a=%3C  # %3C is a '<' character
```
host:
```
# NAXSI is logging the XSS related activity in the logs
```

- Disable the `LearningMode` in `/etc/nginx/naxsi.rules` in production

### S13/L73 WAF - Custom Messages on Rule Matching Patterns

the error from the previous lecture related to the missing custom message via `RequestDenied` file is corrected

## S14 Cryptography Module

### S14/L74 Understanding Asymmetric Key Encryption ( IHT )

- **Symmetric Key**
  - 1 key
- **Assymetric Key**
  - 2 keys: **Public** and **Private**
  - 1 **Chain**: Public Key + Private Key
  - Data encrypted from Public Key can only be decrypted with corresponding Private Key
  - Data encrypted from Private Key can only be decrypted with corresponding Public Key
  - **Key-Based Authentication** vs **Password-Based Authentication**

### S14/L75 HTTPS Internal Working ( IHT )

- **HTTP** - does not use encryption
- **HTTPS** - uses encryption
  1. the server sends it's public key to the client
  2. the client encodes it's symmetric key with the public key of the server and sends it back to server
  3. the server decrypts the symmetric key with it's private key
  4. the server and client use the symmetric key for encrypted communication
  - if the messages are intercepted they can't be decrypted, because private key is required

### S14/L76 SSL with Nginx

- `/etc/nginx/conf.d/ssl.conf`

```
cd /etc/nginx/conf.d
mkdir certificates
cd certificates
```
Generate certificate:
```
openssh req -x509 -newkey rsa:2048 -keyout key.pem -out final.pem -days 465 -nodes
# fill the details

cp * /etc/ssl/certs/
```

`/etc/nginx/conf.d/ssl.conf`:
```
server {
  listen                     443;
  server_name                zealvora.com;

  ssl on;
  ssl_certificate            /etc/ssl/certs/final.pem;
  ssl_certificate_key        /etc/ssl/certs/key.pem;

  ssl_session_timeout        5m;

  ssl_protocols              SSLv2 SSLv3 TLSv1;
  ssl_ciphers                ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
  ssl_prefer_server_ciphers  on;

  location / {
    root                     /var/www/html;
    index                    index.html index.htm;
  }
}
```
host:
```
nginx -t
service nginx reload
```
browser:
```
https://zealvora.com
# connection is untrusted because it's a self signed certificate
```

- Certificate Authiroties
  - e.g.: GeoTrust

```
# send final.pem to GeoTrust
# they will send back: zealvora_com.zip

unzip zealvora_com.zip
# zealvora_com.ca-bundle  - used for compatibility
# zealvora_com.crt        - certificate

# combine into a single certificate file
cat zealvora_com.crt zealvora_com.ca-bundle > zeal.crt

cp zeal.crt zeal.key /etc/ssl/certs
```
`/etc/nginx/conf.d/ssl.conf`:
```
server {
  ...
  ssl_certificate            /etc/ssl/certs/zeal.crt;
  ssl_certificate_key        /etc/ssl/certs/zeal.key;
  ...
}
```
host:
```
nginx -t
service nginx reload
```
browser:
```
https://zealvora.com
# HTTPS with signed certificate, signed by a trusted Certificate Authority
```

### S14/L77 SSL Termination

- **SSL Termination at Reverse Proxy**
  - SSL Termination handled by the application servers (e.g.: Tomcat, PHP-FPM etc.) may slow them down, therefore the SSL Termination is usually done by the reverse proxy
    - the SSL does not interfere between the communication between the reverse proxy and the application server
  - the communication between the client and reverse proxy is HTTPS (SSL based connection)
  - the communication between the reverse proxy and the application server is HTTP
- **SSL Termination to Upstream**
  - used if the application server resides in the environment which can't be fully trusted
  - the communication between the client and reverse proxy is HTTPS (first SSL based connection)
  - the communication between the reverse proxy and the application server is HTTPS (second SSL based connection)
  - using a second SSL based connection slows down the overall performance

`/etc/nginx/conf.d/zealvora_ssl.conf` in nginx reverse proxy:
```
server {
  listen                      443 ssl;
  server_name                 zealvora.com;

  ssl_certificate             /etc/ssl/zealvora.crt;
  ssl_certificate_key         /etc/ssl/zeal.key;

  ssl_session_cache           shared:SSL:1m;
  ssl_session_timeout         5m;

  ssl_ciphers                 HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers   on;

  location / {
    proxy_pass                http://192.168.10.50:80;
    proxy_set_header          X-Real-IP $remote_addr;
    proxy_set_header          Host $host;
  }
}
```

- SSL Termination handled by SSL settings like `ssl_certificate`, `ssl_certificate_key` etc. in reverse proxy
- `proxy_pass` with HTTP connection
- Certificate details:
  - Hierarchy: AddTrust, COMODO RSA Certification Authority, COMODO RSA Domain Validation Secure Server CA, zealvora.com
    - CA bundle was added, because a web browser don't trust COMODO Certificate, but trusts the root AddTrust certificate


- SideNode:
  - his Wordpress website was not configured to work on full SSL based connection
    - many requests are using HTTP connection
    - when loading HTTPS website the browser won't load the content accessible via HTTP
    - Wordpress needs to be configured to work fully on HTTPS
  - he needs to disable protection in the browser to access the WordPress site with full content
