
# edit 1

FROM ubuntu:latest
MAINTAINER raziel@codefresh.io

RUN apt-get update
RUN apt-get install -y nodejs nodejs-legacy npm


# edit 2

RUN apt-get clean


# edit 3 (not optimal)

# COPY . src
# RUN cd src && npm install


# edit 4 (optimal)

COPY ./package.json src/
RUN cd src && npm install
COPY . src

# edit 5

WORKDIR src/
CMD ["npm", "start"]
