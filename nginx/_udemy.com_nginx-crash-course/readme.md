
# NginX Load Balancer and Web Server

https://www.udemy.com/course/nginx-crash-course

## S1 Introduction

### S1/L01 Introduction

- opensource webserver / reverse proxy / load balancer
- written in C

### S1/L02 What is NginX?

- Web Server
  - Serves web content
- Proxy
  - Load Balancing
  - Backend Routing
  - Caching

### S1/L03 NginX Use Cases

- NginX as Load Balancer:
  - putting the application servers behind the NginX
  - application servers can be: physical machine, virtual machine, docker container, kubernetes pod
  - application servers are accessible via IP addresses
  - can be configured to be secure:
    - use sertificates
    - TLS 1.3
    - HTTP2
  - all of the clients communicate with a single endpoint, an NginX FrontEnd

### S1/L04 Layer 4 and Layer 7 Load Balancing in NginX

- NginX can operate in Layer 7 (http) or Layer 4 (tcp)
- Using **stream** context it becomes layer 4 proxy
- Using **http** context it becomes layer 7 proxy


- in Layer 4 (tcp) there is access to IP Address, Port, TLS handshake
- in Layer 7 (http) there is access to HTTP Protocol, Headers, Body, GET/POST Request etc.

## S2 Working with NginX

### S2/L05 Working woth NginX - What will we do?

### S2/L06 Installing NginX

OSX install:
```
brew install nginx
```

- configuration file: `/usr/local/etc/nginx/nginx.conf`
- default port: 8080
-  can run without sudo

### S2/L07 NginX as Web Server

Delete existing configuration to start from scratch:
```
cd /usr/local/etc/nginx/
vim nginx.conf
rm nginx.conf
```

#### NginX as a static web server with default screen

`/usr/local/etc/nginx/nginx.conf`
```
http {
  server {
    listen 8080;
  }
}
events { }
```

- context of nginx:
  - **http** - layer 7
  - **events**
    - e.g.: minimum number of worker connections
- context can have directives
  - **http** and **events** are also directives
  - **server** - block directive
  - **listen** - simple directive

```
nginx   # start nginx
```

in web browser:
```
localhost:8080
# default screen is visible
```

#### NginX as a static web server with custom screen

`/home/username/index.html`:
```
<html>
<body>

hello its nginx but its my own content

</body>
</html>
```

`/usr/local/etc/nginx/nginx.conf`:
```
http {
  server {
    listen 8080;
    root /Users/username/nginxcourse;   # serve the content from this folder
  }
}
events { }
```

in console:
```
nginx -s reload
```

in web browser:
```
localhost:8080
# custom screen is visible
```

#### Serve specific path based on certain location

- server different contents from different folders
- good for different websites

in `/home/username/`:
```
mkdir site1
mkdir site2
mkdir images  # put a random images inside this folder: image.png, image.jpg
```

`/home/username/site1/index.html`:
```
<html>
<body>
this is site 1!!!!
</body>
</html>
```

`/home/username/site1/index.html`:
```
<html>
<body>
this is site 2!!!!
</body>
</html>
```

`/usr/local/etc/nginx/nginx.conf`:
```
http {
  server {
    listen 8080;
    root /Users/username/nginxcourse;   # serve the content from this folder
  }
}
events { }
```

in console:
```
nginx -s reload
```

in web browser:
```
localhost:8080
# root folder

localhost:8080/site1
# site1

localhost:8080/site2
# site2
```

#### Add a directory to serve from for a location:

`/usr/local/etc/nginx/nginx.conf`:
```
http {
  server {
    listen 8080;
    root /Users/username/nginxcourse;   # serve the content from this folder

    location /images {
        root /Users/username/nginxcourse; # overwrites the folder for this location only
    }

  }
}
events { }
```

in console:
```
nginx -s reload
```

in web browser:
```
localhost:8080
# root folder

localhost:8080/site1
# site1

localhost:8080/site2
# site2

localhost:8080/images
# ERROR 403

localhost:8080/images/image.png
# image is served
```

#### Add regular expressions

`/usr/local/etc/nginx/nginx.conf`:
```
http {

  server {
    listen 8080;
    root /Users/HusseinNasser/nginxcourse;
    location /images {
      root /Users/HusseinNasser/;
    }
    location ~ .jpg$ {
      return 403;
    }
  }

}
events { }
```

in console:
```
nginx -s reload
```

in web browser:
```
localhost:8080/images/image.png
# image is served

localhost:8080/images/image.jpg
# ERROR 403
```

#### Using proxy (alias)

`/usr/local/etc/nginx/nginx.conf`:
```
http {

  server {
    listen 8080;
    root /Users/HusseinNasser/nginxcourse;
    location /images {
      root /Users/HusseinNasser/;
    }
    location ~ .jpg$ {
      return 403;
    }
  }

  server {
    listen 8888;
    location / {
      proxy_pass http://localhost:8080/;
    }
  }

}
events { }
```

in console:
```
nginx -s reload
```

in web browser:
```
localhost:8080
# is served

localhost:8888
# is served
```

`/usr/local/etc/nginx/nginx.conf`:
```
http {

  server {
    listen 8080;
    root /Users/HusseinNasser/nginxcourse;
    location /images {
      root /Users/HusseinNasser/;
    }
    location ~ .jpg$ {
      return 403;
    }
  }

  server {
    listen 8888;
    location / {
      proxy_pass http://localhost:8080/;
    }
    location /img {
      proxy_pass http://localhost:8080/images/;
    }
  }

}
events { }
```

in console:
```
nginx -s reload
```

in web browser:
```
localhost:8080/images/image.png
# is served

localhost:8888/img/image.png
# is served
```

### S2/L08 NginX as a Layer 7 Proxy

Start 4 NodeJS services (S02/L13):
```
docker run -p 2222:9999 -e APPID=2222 -d nodeapp
docker run -p 3333:9999 -e APPID=3333 -d nodeapp
docker run -p 4444:9999 -e APPID=4444 -d nodeapp
docker run -p 5555:9999 -e APPID=5555 -d nodeapp
```
Test services in web browser:
```
localhost:2222
localhost:2222/app1
localhost:2222/app2
localhost:2222/admin
localhost:3333
localhost:4444
localhost:5555

# root, app1, app2, admin work for each combination
```

#### Served in Round Robin

`/usr/local/etc/nginx/nginx.conf`:
```
http {

    upstream allbackend {
        #ip_hash;
        server 127.0.0.1:2222;
        server 127.0.0.1:3333;
        server 127.0.0.1:4444;
        server 127.0.0.1:5555;
    }

    server {
        listen 80;
        location / {
            proxy_pass http://allbackend/;
        }
    }

}

events { }
```

in console:
```
nginx -s reload
```

in web browser:
```
localhost
# home page is served in Round Robin
```

#### Served by the same backend

- *sticky session* for *stateful applications*

`/usr/local/etc/nginx/nginx.conf`:
```
    # ...
    upstream allbackend {
        ip_hash;
        # ...
    }
    # ...
```

in console:
```
nginx -s reload
```

in web browser:
```
localhost
localhost/app1
localhost/app2
localhost/admin

# pages are always served by one backend
```

- stateful applications are generally bad idea
- stateless architecture is preferred
  - e.g.: kubernetes can destroy container any time

#### Split the load between backends

- useful for heavy load
- can be done due to the Layer 7 routing

`/usr/local/etc/nginx/nginx.conf`:
```
http {

    upstream allbackend {
        #ip_hash;
        server 127.0.0.1:2222;
        server 127.0.0.1:3333;
        server 127.0.0.1:4444;
        server 127.0.0.1:5555;
    }

    upstream app1backend {
        server 127.0.0.1:2222;
        server 127.0.0.1:3333;
    }

    upstream app2backend {
        server 127.0.0.1:4444;
        server 127.0.0.1:5555;
    }

    server {
        listen 80;
        location / {

            proxy_pass http://allbackend/;
        }

        location /app1 {
            proxy_pass http://app1backend/;
        }

        location /app2 {
            proxy_pass http://app2backend/;
        }
    }

}

events { }
```

in console:
```
nginx -s reload
```

in web browser:
```
localhost
# served by 2222, 3333, 4444, 5555

localhost/app1
# served by 2222, 3333

localhost/app2
# served by 4444, 5555

localhost/admin
# served by 2222, 3333, 4444, 5555
```

#### Block admin connections

- don't allow access to admin from port 80
- allow access only from internal network

`/usr/local/etc/nginx/nginx.conf`:
```
server {
    listen 80;
    #...

    location /admin {
        return 403;
    }
}
```

in console:
```
nginx -s reload
```

in web browser:
```
localhost/admin
# Error 403 - not served

localhost:2222/admin
localhost:3333/admin
localhost:4444/admin
localhost:5555/admin
# served
```

### S2/L09 NginX as a Layer 4 Proxy

- HTTP/1.1 - Browser can have 6 TCP connections
- HTTP/2 - 1 TCP connection with multiplexing
- **Layer 7 Load Balancer**
  - 1 TCP connection between the browser and NginX
  - 4 TCP connections with the backends (in this example)
  - Maximum number of connections can be set
- **Layer 4 Load Balancer**
  - The proxy streams the connection back to the backend directly
  - The browser connects to the proxy
  - The proxy maps the connection (IP and Port) to a selected backend
    - NAT table is a possible implementation

`/usr/local/etc/nginx/nginx.conf`:
```
stream {

  upstream allbackend {
    server 127.0.0.1:2222;
    server 127.0.0.1:3333;
    server 127.0.0.1:4444;
    server 127.0.0.1:5555;
  }

  server {
    listen 80;
    proxy_pass allbackend/;
  }

}

events { }
```

- **location** directive can't be applied
  - Layer 7 functionality
- **proxy_pass** directive can't have **http://** prefix
  - the protocol which is used is unknown here
  - any protocol of the Layer 7 can work:
    - websockets
    - smtp
    - webrtc
    - http

in console:
```
nginx -s reload
```

in web browser:
```
localhost
# will stick to the selected backend (e.g.: 2222)
```

- changes rarely from web browser
- uses the same connection until the TCP connection expires
- but it's Round Robin on Layer 4 level
- the browser establishes 6 TCP connections (because it's HTTP/1.1)
  - if lucky it might hit another TCP connection which hits another server of the backend

#### Test Round Robin with TelNet

```
telnet 127.0.0.1 80

GET /
# served from 2222 and connection closed immediately

GET /
# served from 3333 and connection closed immediately

GET /
# served from 4444 and connection closed immediately

GET /
# served from 5555 and connection closed immediately
```

### S2/L10 Enable HTTPS on NginX

- in router settings:
  - forward TCP/UDP port 80 for HTTP
  - forward TCP/UDP port 443 for HTTPS

`/usr/local/etc/nginx/nginx.conf`:
```
http {

    upstream allbackend {
        #ip_hash;
        server 127.0.0.1:2222;
        server 127.0.0.1:3333;
        server 127.0.0.1:4444;
        server 127.0.0.1:5555;
    }

    upstream app1backend {
        server 127.0.0.1:2222;
        server 127.0.0.1:3333;
    }

    upstream app2backend {
        server 127.0.0.1:4444;
        server 127.0.0.1:5555;
    }

    server {
        listen 80;
        location / {

            proxy_pass http://allbackend/;
        }

        location /app1 {
            proxy_pass http://app1backend/;
        }

        location /app2 {
            proxy_pass http://app2backend/;
        }

        location /admin {
            return 403;
        }
    }

}

events { }
```

from web browser:
```
<routers_public_ip>
# works
```

#### Create a domain name

https://noip.com
- Create a new hostname

from web browser:
```
<created_domain_name>
e.g.: nginxtest.ddns.net
# works HTTP/1.1
```

- HTTP/2 - does not work with unsecure stuff
  - can be done in unencrypted way, but most browsers does not support because it's hard to upgrade the connection without TLS, because ALP is used to negotiate the protocol

#### Create a certificate

https://letsencrypt.org

- Let's encrypt
- certbot API
  - public key
  - private key

OSX install:
```
brew install letsencrypt
```
in console:
```
nginx -s stop
# because the certbot need to use port 80 to communicate with the website

sudo certbot certonly --standalone
# enter the registered domain name: e.g.: nginxtest.ddns.net
# path to private and public key is on the output
```

- `sudo` for using privileged port 80
- there is a different way to generate certificate, but that touches the existing (nginx) config
  - better to

`/usr/local/etc/nginx/nginx.conf`:
```
server {
    listen 80;
    listen 443 ssl;

    ssl_certificate /etc/letsencrypt/live/nginxtest.ddns.net/fullchain.pem;

    ssl_certificate /etc/letsencrypt/live/nginxtest.ddns.net/privkey.pem;

    # ...
}
```

in console:
```
nginx -s reload
```

from web browser:
```
<created_domain_name>
e.g.: nginxtest.ddns.net
# connection is secure
```

- RSA Encryption - not recommended cypher
- Diffie-Hellman - recommended cypher

TLS checker: https://cdn77.com/tls-test

- The website doed not have TLS 1.3

### S2/L11 Enable TLS 1.3 on NginX


`/usr/local/etc/nginx/nginx.conf`:
```
server {
    # ...
    ssl_protocols TLSv1.3;
    # ...
}
```

- TLS 1.3
  - will fail with clients not supporting
  - Diffie-Hellman - latest encryption algorithm
- TLS 1.2
  - slow
  - uses old cyphers by default
  - downgrade attack

in console:
```
nginx -s reload
```

from web browser:
```
<created_domain_name>
e.g.: nginxtest.ddns.net
# connection is secure
```

### S2/L12 Enable HTTP/2 on NginX


`/usr/local/etc/nginx/nginx.conf`:
```
server {
    listen 80;
    listen 443 ssl http2;

    # ...
}
```

in console:
```
nginx -s reload
```

from web browser:
```
<created_domain_name>
e.g.: nginxtest.ddns.net
# connection uses http2
```

- Sidenotes:
  - the certificate is still encrypted with RSA algorithm
  - HAProxy forces to use the latest security solutions

```
sudo nginx -v
```

### S2/L13 Bonus - Spin up a lightweight Docker Container with your application

in console:
```
cd app
npm init -y
```

`app/index.js`:
```
const app = require("express")();

app.get("/", (req, res) => res.send("hello from a lightweight container!!"))

app.listen(9999, () => console.log("listening on 9999"))
```

in console:
```
npm install express
```

in `app/package.json`:
```
"scripts": {
  "app": "node index.js"
}
```

in console:
```
npm run app
```

in web browser:
```
localhost:9999
# works
```

`Dockerfile`:
```
FROM node:12
WORKDIR /home/node/app
copy app /home/node/app
RUN npm install
CMD npm run app
EXPOSE 9999
```

in console:
```
docker build -t nodeapp .

docker run --name nodeapp -p 9999:9999 nodeapp
```

in web browser:
```
localhost:9999
# works
```

in console:
```
docker stop nodeapp
docker rm nodeapp

docker run -d -p 8000:9999 nodeapp
docker run -d -p 8001:9999 nodeapp
docker run -d -p 8002:9999 nodeapp
```

- microservices architecture with container
  - easily can be put behind a load balancer like Caddy, HAProxy, NginX etc.

### S2/L14 Course Summary

- paid version of NginX
- NginX is underdocumented
- HAProxy has better documentation
