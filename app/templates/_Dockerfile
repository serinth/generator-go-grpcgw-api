FROM golang:1.12.4-alpine as builder
RUN apk update && apk add --no-cache ca-certificates && update-ca-certificates
RUN adduser -D -g '' appuser
WORKDIR $GOPATH/src/<%=goAppPath%>
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /main

FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /main /main
COPY configs /configs

ARG env
ENV ENVIRONMENT $env
USER appuser
EXPOSE 8080 8081
ENTRYPOINT ["/main"]
