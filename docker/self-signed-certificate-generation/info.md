
# Usage

To build the docker image execute one of the followings:

* build by Dockerfile:
`docker build -t dotnet/cert:self_signed_cert_base .`

* build by docker-compose file:
`docker-compose build`

Then run the docker container from docker image:
`docker run -it dotnet/cert:self_signed_cert_base`
