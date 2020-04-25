FROM nginx:1.13.5-alpine

LABEL maintainer="Laszlo Pogany<laszlopogany@gmail.com>"

##
# setting necessary server configurations
##

# add curl and other necessary packages for openssl and certbot
RUN apk add --update \
                curl \
                bash \
                openssl \
                certbot \
                python \
                py-pip \
        && pip install --upgrade pip \
        && pip install 'certbot-nginx' \
        && pip install 'pyopenssl'

RUN addgroup staff
RUN addgroup www-data
RUN adduser -h /home/dev/ -D -g "" -G staff dev
RUN adduser -S -H -g "" -G www-data www-data
RUN echo dev:trolls | chpasswd

##
# copying nginx configuration file
##

COPY nginx.conf /etc/nginx/nginx.conf
RUN chown root:staff /etc/nginx/nginx.conf

# adds certbot cert renewal job to cron
COPY crontab /tmp/crontab-certbot
RUN (crontab -l; cat /tmp/crontab-certbot) | crontab -

# copies over the startup file which handles initializing the nginx
# server and the SSL certification process (if necessary)
COPY startup.sh /bin/startup.sh
RUN chown root:root /bin/startup.sh
RUN chmod ug+rx /bin/startup.sh
RUN chmod go-w /bin/startup.sh
