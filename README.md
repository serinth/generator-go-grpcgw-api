# Quick Start - Yeoman Generator
```bash
npm install -g yo
cd generator-go-grpcgw-api
npm link
yo go-grpcgw-api
```

Creates a GRPC Gateway project with one health endpoint and CORS enabled.

It will prompt for 2 things:

1. Application name e.g. (myApp)
2. URL Repository e.g. (github.com/serinth)

The resulting repo that gets generated will be under `$GOPATH/github.com/serinth/myApp`

A README on how to use the new microservice is inside myApp.
