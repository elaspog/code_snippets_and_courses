
# nginx - Beginner’s Guide

https://nginx.org/en/docs/beginners_guide.html

## Basics

- nginx
  - has one master process and several worker processes
  - employs event-based model and OS-dependent mechanisms to efficiently distribute requests among worker processes
- master process
  - reads and evaluates configuration
  - maintain worker processes
- worker processes
  - do actual processing of requests
- default configuration file name: `nginx.conf`
  - `/usr/local/nginx/conf`
  - `/etc/nginx`
  - `/usr/local/etc/nginx`

## Starting, Stopping, and Reloading Configuration

```
nginx -s <signal>

nginx -s stop      # fast shutdown
nginx -s quit      # graceful shutdown, should be executed under the same user that started nginx
nginx -s reload    # reloading the configuration file
nginx -s reopen    # reopening the log files
```

Signals sent by Unix tools:

```
ps -ax | grep nginx
# list of all running nginx processes

kill -s QUIT <pid>
```

The process ID of the nginx master process is written, by default, to the `nginx.pid` in the directory `/usr/local/nginx/logs` or `/var/run`

## Configuration File’s Structure

- **modules** are controlled by **directives** specified in the configuration file
- **simple directives**
  - consists of the name and parameters separated by spaces and ends with a semicolon `;`
- **block directives**
  - same structure as simple directives have
  - ends with a set of additional instructions surrounded by braces `{` and `}` (instead of the semicolon)
  - **context** is when **block directives** have other directives inside braces
    - e.g.: `main`, `events`, `http`, `server`, `location`
- **comment** is the rest of the line after `#`

## Serving Static Content

`/data/www/index.html`
`/data/images/image-*.*`

Server block configuration file:
```
http {
    server {
      location / {
          root /data/www;
      }

      location /images/ {
          root /data;
      }
    }
}
```

- **server**
  - listens on the standard port 80 (by default)
  - is accessible on the local machine at `http://localhost/`
- **location**
  - if there are several matching location blocks nginx selects the one with the longest prefix


- **Examples:**
  - in response to the `http://localhost/images/example.png` request nginx will send the `/data/images/example.png` file
  - in response to the `http://localhost/some/example.html` request nginx will send the `/data/www/some/example.html` file
  - if such file does not exist, nginx will send a response indicating the 404 error

```
nginx -s reload
```

- **Debugging:**
  - `access.log`
  - `error.log`
  - `/usr/local/nginx/logs`
  - `/var/log/nginx`

## Setting Up a Simple Proxy Server

Add one more server block to the nginx’s configuration file:
```
server {
    listen 8080;
    root /data/up1;

    location / {
    }
}
```
- `/data/up1/index.html`
- that the root directive is placed in the server context

```
server {
    location / {
        proxy_pass http://localhost:8080;
    }

    location ~ \.(gif|jpg|png)$ {
        root /data/images;
    }
}
```
- `proxy_pass` directive with the `protocol`, `name` and `port`, e.g.: `http://localhost:8080`
- a regular expression should be preceded with `~`
- first location directives that specify prefixes are checked (remembering location with the longest prefix), then regular expressions are checked
  - if there is a match with a regular expression, nginx picks this location
  - otherwise, it picks the one remembered earlier

## Setting Up FastCGI Proxying

- nginx can be used to route requests to **FastCGI** servers which run applications built with various frameworks and programming languages such as PHP
- suppose the FastCGI server is accessible on localhost:9000
- in PHP
  - `SCRIPT_FILENAME` parameter is used for determining the script name
  - `QUERY_STRING` parameter is used to pass request parameters

```
server {
    location / {
        fastcgi_pass  localhost:9000;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param QUERY_STRING    $query_string;
    }

    location ~ \.(gif|jpg|png)$ {
        root /data/images;
    }
}
```
- routes all requests except for requests for static images to the proxied server operating on `localhost:9000` through the FastCGI protocol
