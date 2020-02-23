
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

### S02/E07 Working with HAProxy

### S02/E08 Spin up the services

### S02/E09 Install HAProxy (mac)

### S02/E10 HAProxy configuration

### S02/E11 ACL Conditional

### S02/E12 ACL Reject URL

### S02/E13 Enable HTTPS HAProxy

### S02/E14 Enable HTTP/2 on HAProxy

### S02/E15 Spin Application on Docker Container

### S02/E16 Summary
