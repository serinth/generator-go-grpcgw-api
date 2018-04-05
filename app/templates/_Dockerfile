FROM scratch

ADD ca-certificates.crt /etc/ssl/certs/

ADD main /
COPY configs /configs

EXPOSE 8080 8081

ENTRYPOINT ["/main"]
