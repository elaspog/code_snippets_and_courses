
# Create An Nginx Reverse Proxy With Docker - How To Run Multiple Docker Containers Under One URL

https://medium.com/@mannycodes/create-an-nginx-reverse-proxy-with-docker-a1c0aa9078f1

## Why Would You Need This

- everything is hosted under one domain name or ip address under port 80 and don’t require that the user specify special port numbers when making requests to the frontend, backend, or other services
- avoid CORS issues because the requests being made from the frontend are coming from the same location from the backend, so there should be no additional configurations needed for the backend

# Structure

- three docker containers running under the same network but only have the reverse proxy exposed to the client

## Creating Our Backend Container

```
docker run -it -d --name backend node:10.15.3-alpine
```

### Creating NodeJS Application

```
docker exec -it backend /bin/sh

apk add nano
cd /home/node
npm init
npm install express --save
touch index.js
nano index.js
```

/home/node/index.js:
```
const express = require('express');
const app = express();
const port = 5000;
const version = '1.0.0';
app.get('/', (req, res) => res.send({ version }));
app.listen(port, () => console.log(`Listening on port ${port}`));
```

```
node index.js
```

From browser:
```
http://localhost:5000
# nothing is showing
```

### Testing Initial NodeJS Application

```
docker exec -it backend /bin/sh

apk add curl

curl localhost:5000
# Expected Output
# {"version":"1.0.0"}
```

## Creating Our Frontend Container

### Setting Up Container

```
docker run -it -d --name frontend nginx:stable-alpine

docker exec -it frontend /bin/sh

apk add curl
curl localhost
# HTML Output
```

### Creating Vanilla JavaScript Frontend

```
# add nano
apk add nano

# change directories
cd /usr/share/nginx/html

# remove index.html
rm index.html

# create new index.html
touch index.html

# edit file
nano index.html
```

`index.html`:
```
<!DOCTYPE html>
<html>
<head>
<title>Frontend</title>
<script>
window.onload = function () {
     fetch('/api', { method: 'get'}).then((response) => {
         const json = response.json();
         if (response.ok) {
             return json;
         }
         return Promise.reject(new Error('Something went wrong.'));
     })
     .then((response) => {
         document.getElementById('version').innerHTML = JSON.stringify(response);
     }).catch((error) => {
         document.getElementById('error').innerHTML = error && error.message || 'Something else went wrong.';
     });
};
</script>
</head>
<body>
<h1>My Application Version</h1>
<p id="version"></p>
<p id="error"></p>
</body>
</html>
```

### Testing Frontend Application

```
curl localhost
```

## Communicating Between Containers

### Adding Containers To Same Network

```
docker network create mynetwork

# Connect backend
docker network connect mynetwork backend

# Connect frontend
docker network connect mynetwork frontend

docker network inspect mynetwork;
```

### Testing Our Network

```
# Enter container
docker exec -it frontend /bin/sh

# Make a request to the backend
curl http://backend:5000

# Expected Ouput
# {"version":"1.0.0"}
```


## Configuring Nginx Container (Reverse Proxy)

```
docker run -it -d -p 80:80 --network=mynetwork --name proxy nginx:stable-alpine
```

### Configuring Nginx Settings

```
docker exec -it proxy /bin/sh

# go to the main configuration file
cd /etc/nginx/conf.d

cat default.conf

apk add nano

nano default.conf
```

`default.conf`:
```
...
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        proxy_pass http://frontend;
    }
    location /api {
        proxy_pass http://backend:5000/;
    }
...
```
- there should be two location routes defined
- note that it's `http://backend:5000/` and **not** `http://backend:5000`

```
nginx -s reload
```

### Testing Out Connections

```
apk add curl;
# Original frontend
curl http://frontend

# Should be the same
curl http://localhost

# Original backend
curl http://backend:5000

# Should be the same backend
curl http://localhost/api
```

## Creating A Dockerfile

`default.conf`:
```
server {
    listen       80;
    server_name  localhost;
    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        proxy_pass http://frontend;
    }
    location /api {
        proxy_pass http://backend:5000/;
    }
    #error_page  404              /404.html;
    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}
    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}
    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

`Dockerfile`:
```
FROM nginx:stable-alpine
COPY default.conf /etc/nginx/conf.d
EXPOSE 80/tcp
EXPOSE 443/tcp
CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;';"]
WORKDIR /usr/share/nginx/html
```


## Taking It Further

- Adding SSL Support
- React Frontend
- NodeJS Backend
- Docker Compose
- Kubernetes Orchestration
