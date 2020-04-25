
# Hosting WordPress over HTTPS with Docker

https://dev.to/foresthoffman/hosting-wordpress-over-https-with-docker-5gc

## Execute

1. Rewrite the `example.com` to the live domain name in the following files:
  - `website/nginx/wordpress.conf`
  - `revproxy/startup.sh`
  - `revproxy/nginx.conf.init`
  - `revproxy/nginx.conf.exec`
2. Create network
```
docker network create nginxproxy_default
```
3. Start the `website` first:
```
# from website directory:
docker-compose up -d
```
4. Start the `revproxy` with `.init` config
```
# from revproxy directory:
cp nginx.init.conf nginx.conf
docker-compose up --build
# if cert has been built
docker-compose down
rm nginx.conf
```
5. Start the `revproxy` with `.exec` config
```
# from revproxy directory:
cp nginx.exec.conf nginx.conf
docker-compose up -d
```
