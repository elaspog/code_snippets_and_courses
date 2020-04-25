#!/bin/bash
#
# startup.sh
#

# Startup the nginx server. The server has to be active for the Let's Encrypt Certbot to
# register and install the certificates.
nginx -g "daemon on;"

# Checks that the SSL certificates are installed. If they are, renews any that are old, and
# installs them if not.
if [[ -d "/etc/letsencrypt/live/example.com" ]]; then
        certbot renew --quiet
else
        if ! [[ -d "/etc/letsencrypt/live/example.com" ]]; then
                certbot --nginx -m your-email@ex.com --agree-tos --no-eff-email --redirect --expand -d example.com,www.example.com
        fi
        if ! [[ -f "/etc/ssl/certs/dhparam.pem" ]]; then
                openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
        fi
fi

# Shuts down the daemonized nginx server and fires up one in the foreground.
nginx -s stop && nginx -g 'daemon off;'
