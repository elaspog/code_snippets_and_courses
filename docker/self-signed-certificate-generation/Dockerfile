
FROM microsoft/dotnet:2.1-aspnetcore-runtime AS cert_base
WORKDIR /app
WORKDIR /cert
COPY generateSelfSignedCertificate.sh .

# Set password for the certificate as 1234
ENV certPassword 1234

# Use opnssl to generate a self signed certificate cert.pfx with password $env:certPassword
RUN ["/bin/bash", "generateSelfSignedCertificate.sh"]

RUN cp /cert/* /app/ \
    && rm /app/generateSelfSignedCertificate.sh

# Expose port 443 for the application.
EXPOSE 443
