# Golang GRPC with RESTful endpoint (GRPC Gateway) Example

GRPC Gateway: https://github.com/grpc-ecosystem/grpc-gateway
An Example with TLS: https://github.com/philips/grpc-gateway-example

# Requirements
- protoc v3.0.0 or above, can be installed with apt
- libprotobuf-dev (e.g. `sudo apt-get install libprotobuf-dev`)
- you will need the grpc-ecosystem sources
- Ensure that you have the `bin` directory of your GOPATH (`go env GOPATH`) in your PATH

# Quick Start - Go Application
This generator is made to be backward compatible if you used a dependency manager like Glide, or Dep. With the newer versions of Go, the recommended way is to use go modules. When using go modules, you still need to do a
`go mod init <package name>` in the `src` folder where package is the same as what you entered when using the generator e.g. `github.com/serinth/myApp`. However, do this **after** `make tools`

```bash
cd src
make tools
make compile-protobuf
ENVIRONMENT=local go run main.go

curl localhost:8080/_ah/health
```

# Defining Services

Services are defined in `/proto`. When compiled, the generated interfaces need to be implemented. In this example, they're implemented in `/protoServices` but how it's structured is completely up to you.

In the protobuf 3 language, it's very simple to define standard HTTP methods. We define the request model and view model to be returned in the proto files.

The normal approach to the services is:
 1. Define the endpoints and models
 2. Run the protobuf compiler (Provided in the Makefile). This will generate boilerplate GRPC code with interfaces that your services must implement. There is also the added benefit of Swagger docs automatically being generated with a protoc plugin.
 3. Wire up the new services in `main.go`

There is a complete health endpoint example.

# Configurations

Configurations are loaded from the toml files in `/configs`. The behaviour is as follows:
 
 1. .toml file gets loaded first
 2. environment variable will override what's in the toml file
 3. required environment variables do not need to be added to the toml files

# Mandatory Environment Variables
| Variable | Example | Description |
| --- | --- | --- |
| ENVIRONMENT | local | name the config toml files to be the same as the environment variable name.

# Optional Environment Variable Overrides
| Variable | Example | Description |
| --- | --- | --- |
| ENABLE_DEBUGGING | true | Always enable log.debug
| API_PORT | ":8080" | The RESTful endpoint port
| GRPC_PORT | ":8081" | The GRPC endpoint port
| GRPC_HOST | "localhost" | The hostname of the GRPC server
