
FROM ubuntu:latest
MAINTAINER raziel@codefresh.io

RUN apt-get update
RUN apt-get install -y curl

RUN curl --silent --location https://deb.nodesource.com/setup_4.x | sudo bash -
RUN sudo apt-get install --yes nodejs
RUN apt-get clean

RUN mkdir src/
WORKDIR src/

CMD ["npm", "start"]

ONBUILD COPY ./package.json ./
ONBUILD RUN npm install
ONBUILD COPY . .

