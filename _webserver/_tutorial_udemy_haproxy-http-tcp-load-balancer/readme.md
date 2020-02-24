
# HAProxy - TCP/HTTP Load Balancer

https://www.udemy.com/course/haproxy-http-tcp-load-balancer/

## S01 Introduction

### S01/E01 Introduction

- opensource software written in C
- high availability, layer 4 and layer 7 load balancing and proxy
- efficient memory and CPU usage

### S01/E02 Current & Desired Architecture

- current:
  - application server serves all the requests directly
  - application server is connected to database
- desired:
  - multiple application servers (with different ports)
    - all connected to database
  - HAProxy stands between the application servers and users
    - the backend is load balanced, the application servers are used in round robin
    - the frontend is not behind the HAProxy, it's between the users and HAProxy

### S01/E03 HAProxy Architecture

- Frontend
  - anything in front of HAProxy
  - clients communicate with this
  - exposes ports
  - Timeout Client - how long should wait before disconnecting an idle client
  - Bind - ports listening to
  - ACL - path checking, conditionals, 404s, region based blockings etc.
  - Frontend always connects to a Backend
- Backend
  - anything behind HAProxy
  - multiple servers can be specified for a Backend
  - Timeout Connect - when trying to connect to backend servers, 300ms is usually enough
  - Timeout Server - when trying to get response from backend servers, how long should HAProxy wait for a response
  - Balance (roundrobin, lastconn, source)
    - leastconn - connect to the server what has the least number of connections
    - source - sticky sessions


- Architecture:
  - Multiple Frontends or multiple Backends
    - Varnish - reverse proxy
      - free version supports only HTTP
  - Frontend bind to one or more ports
  - a Frontend connects to a Backend
    - Frontend-http - binds 80, forwards to HTTPS Backend
    - Frontend-https - binds 443

### S01/E04 HAProxy as TCP Proxy & HTTP Proxy (Layer 4 vs Layer 7)

- mode of protocol for Frontends and Backends
- layer 4 = mode tcp
  - sees only IP address and Port only
- layer 7 = mode http
  - can look into data
  - can do routing
    - /app1 or /app2
  - to look into the data it needs to be decrypted
  - for round robin it's not necessary to look into the data

### S01/E05 ACL (Access Control Lists)

- conditionals applies to route traffic
- applies on both Frontend and Backend
- e.g.: block any request to /admin (needs http mode)
- reroute the traffic to different backend microservices
- can be applied to layer 4 or layer 7
  - region based routing
- good for microservices

### S01/E06 TLS Termination vs TLS Pass Through

- TLS Termination
  - Frontend is TLS (e.g. HTTPS) backend is not (HTTP)
  - HAProxy terminates TLS and decrypts and send encrypted
  - Can look at the data, L7 ACL, re-write headers, cache but require cert
    - Layer of proxy must be trusted
- TLS Passthrough
  - Backend is TLS
  - HAProxy front-ends proxy the packets directly to the backend
    - proxy just forwards
    - even the handshake happens end-to-end
  - No caching, L4 ACL only, but more secure, HAProxy doesn't need cert
    - Backend server has HTTPS and certificate etc.

## S02 Working with HAProxy

**Dockerfile**  
**app/index.js**  
**app/package.json**  
**app/package-lock.json**  

Prerequisites:
```
docker build -t nodeapp .
```

### S02/E07 Working with HAProxy

### S02/E08 Spin up the services

```
docker run -p 2222:9999 -d -e APPID=2222 nodeapp
docker run -p 3333:9999 -d -e APPID=3333 nodeapp
docker run -p 4444:9999 -d -e APPID=4444 nodeapp
docker run -p 5555:9999 -d -e APPID=5555 nodeapp
```
in web browser:
```
localhost:2222
localhost:2222/app1
localhost:2222/app2
localhost:2222/admin

localhost:3333

localhost:4444

localhost:5555
```

### S02/E09 Install HAProxy (mac)

```
brew intsall haproxy
```
version 2.0.10

### S02/E10 HAProxy configuration

**test.cfg**

```
mkdir proxy
cd proxy/
ls
clear

vim test.cfg
```

#### Layer 4 / TCP Proxy

**test.cfg**

test.cfg:
```
frontend http80
  bind *:80             # bind 0.0.0.0:80
  timeout client 60s
  default_backend allservers

backend allservers
  timeout connect 10s
  timeout server 100s
  servers server2222 127.0.0.1:2222
  servers server3333 127.0.0.1:3333
  servers server4444 127.0.0.1:4444
  servers server5555 127.0.0.1:5555
```
run:
```
haproxy -f test.cfg
```
in web browser:
```
localhost:80
```
- after refreshing turn out it's not round robin
- default mode of communication is TCP (stateful TCP connection with the backend) => Layer 4 proxy
  - browser wants to keep the connection alive as possible => reuses connections which was created to certain backend server
  - `mode tcp`
- stateful model

```
telnet 127.0.0.1 80
GET /
# 2222
telnet 127.0.0.1 80
GET /
# 3333
telnet 127.0.0.1 80
GET /
# 4444
telnet 127.0.0.1 80
GET /
# 5555

# round robin
```
Every telnet is a new TCP socket created.

#### Layer 7 / HTTP Proxy

test.cfg:
```
frontend http80
  bind *:80
  timeout client 60s
  mode http
  default_backend allservers

backend allservers
  timeout connect 10s
  timeout server 100s
  mode http
  servers server2222 127.0.0.1:2222
  servers server3333 127.0.0.1:3333
  servers server4444 127.0.0.1:4444
  servers server5555 127.0.0.1:5555
```
run:
```
haproxy -f test.cfg
```
in web browser:
```
localhost:80
```
- after refreshing it's round robin
- HTTP proxy has ability to funnel and load balance
- every request is a new request
- stateless model

### S02/E11 ACL Conditional

**test.cfg**

```
localhost/app1
# round robining for app1

localhost/app2
# round robining for app2
```

#### Set routing with round robin for different backends

**test.cfg**

- one backend for app1
- one backend for app2

test.cfg:
```
frontend http80
  # ...
  acl app1 path_ends -i /app1
  acl app2 path_ends -i /app2

  use_backend app1Servers if app1
  use_backend app2Servers if app2

  default_backend allservers

backend app1Servers
  # ...
  servers server2222 127.0.0.1:2222
  servers server3333 127.0.0.1:3333

backend app2servers
  # ...
  servers server4444 127.0.0.1:4444
  servers server5555 127.0.0.1:5555

backend allservers
  # ...
```
```
haproxy -f test.cfg
```
in web browser:
```
localhost/app1
# round robining for 2222 and 3333

localhost/app2
# round robining for 4444 and 5555

localhost
# round robining for all of the servers
```

#### Sticky connection for stateful applications

- stateful applications are harder to manage
- balance:
  - least
  - source
    - always forward all the requests to one and only one server
  - round robin (default)

test.cfg:
```
# when app1 is stateful:
backend app1Servers
  timeout connect 10s
  timeout server 10s
  balance source
  mode http
  servers server2222 127.0.0.1:2222
  servers server3333 127.0.0.1:3333
```

```
haproxy -f test.cfg
```
in web browser:
```
localhost/app1
# always routed to a single server chosen from 2222 and 3333
```

### S02/E12 ACL Reject URL

**test.cfg**

#### Block application

Block admin page from `localhost/admin`, but allow it from `localhost:5555/admin`

test.cfg:
```
frontend http80
  # ...
  # anything begins with admin is blocked
  http-request deny if { path -i -m beg /admin }
  # ...
```
```
haproxy -f test.cfg
```
in web browser:
```
localhost/admin
# blocked

localhost:5555/admin
# not blocked
```

### S02/E13 Enable HTTPS HAProxy

**test.cfg**

- register domain name https://noip.com
  - Create Hostname
  - A record
  - e.g.: husseinproxy.ddns.net
- in router set port forwarding to localhost (e.g.: huseinmac): 80, 443

```
brew install letsencrypt
sudo certbot certonly --standalone
# enter email address
# accept terms of service
# don't share email
# enter the registered domain name (e.g. husseinproxy.ddns.net)
# output: public key and private key in separate files
```

- HAProxy needs one file, therefore the public and private keys need to be merged into one file

```
sudo cat /path/to/fullchain.pem /path/to/privkey.pem | sudo tee /path/to/proxy/haproxy.pem
```
test.cfg:
```
frontend httpsandhttp
  bind *:80
  bind *:443 ssl crt /path/to/proxy/haproxy.pem
```
* `bind *:443` would be enough but without TLS
* SSL means TLS here
* TLS supported by HAProxy uses Diffie-Hellman
  * `tune.ssl.default-dh-param`

```
haproxy -f test.cfg
```

in web browser:
```
# http://husseinproxy.ddns.net
# not secure

https://husseinproxy.ddns.net
# round robin 2222,3333,4444,5555

https://husseinproxy.ddns.net/app1
# sticky, one from 2222,3333

https://husseinproxy.ddns.net/app2
# round robin 4444,5555

https://husseinproxy.ddns.net/admin
# blocked
```

### S02/E14 Enable HTTP/2 on HAProxy

**test.cfg**

After refreshing in Developer Tools / Network the used protocol is HTTP/1.1

* **Application Layer Protocol Negotiation**
  - extension of TLS that can negotiate protocols during handshake

test.cfg:
```
frontend httpsandhttp
  # ...
  bind *:443 ssl crt /path/to/proxy/haproxy.pem alpn h2,http1.1
  # ...
```

### S02/E15 Spin Application on Docker Container

**app/index.js**  
**app/package.json**  
**Dockerfile**  

Application and Docker code:
```
npm init -y
# edit index.js
# add file content

npm install express

# edit package.json
# add the following line
# "scripts": {
#   "app": "node index.js"
# },

npm run app
# application runs from the computer
```

Run with Docker:
```
# build docker image
docker build -t nodeapp .

# run docker container
docker run --name nodeapp -p 9999:9999 nodeapp

# stop container
docker stop nodeapp

# remove image
docker rm nodeapp
```

Spin up multiple containers:
```
docker run -d -p 8000:9999 nodeapp
docker run -d -p 8001:9999 nodeapp
docker run -d -p 8002:9999 nodeapp
```

Containers can be put behind load balancers, like Caddy, NGINX, HAProxy.

### S02/E16 Summary
