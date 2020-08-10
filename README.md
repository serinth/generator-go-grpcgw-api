# Quick Start - Yeoman Generator
```bash
npm install -g yo
cd generator-go-grpcgw-api
npm link
cd [YOUR NEW CODE REPO DIR]
yo go-grpcgw-api
```

# Features
- Go Mod ready, deprecated GOPATH requirement
- GRPCGW ready
- Protocol Buffers
- CORS enabled with Health Endpoint
- Configuration values setup with toml files
- A Helm chart for the Golang service with a sample DB connection secret

A README on how to use the new microservice is inside the generated code.

This generator will prompt for the package name:
```
What is your package name? (e.g. github.com/serinth/myApp):
```

Based on these value, the code generated will have the following replacements:

```go
import (
	"net/http"

	"<%=goAppPath%>/app"
	"<%=goAppPath%>/proto"
	"<%=goAppPath%>/protoServices"
)
```

where `<%=goAppPath%>` will be `github.com/serinth/myApp`.

The code generated will be in **[current directory]/src** so make sure you change directories first before running `yo go-grpcgw-api`.

