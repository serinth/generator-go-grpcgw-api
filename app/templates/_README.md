# Golang GRPC with RESTful endpoint (GRPC Gateway) Example

GRPC Gateway: https://github.com/grpc-ecosystem/grpc-gateway
An Example with TLS: https://github.com/philips/grpc-gateway-example

# Quick Start - Go Application
```bash
make tools
make compile-protobuf
go get ./...
go run main.go

curl localhost:8080/_ah/health
```

# Ports

The gateway / RESTful endpoint runs on port `8080`

GRPC server runs on port `10000`

