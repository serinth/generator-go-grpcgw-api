package app

import (
	"os"
	"strings"

	"github.com/BurntSushi/toml"
	"github.com/caarlos0/env"
	log "github.com/sirupsen/logrus"
)

type Config struct {
	Environment        string `env:"ENVIRONMENT,required"`
	IsDebuggingEnabled bool   `env:"ENABLE_DEBUGGING"`
	ApiPort            string `env:"API_PORT" envDefault:":8080"`
	GrpcPort           string `env:"GRPC_PORT" envDefault:":8081"`
	GrpcHost           string `env:"GRPC_HOST" envDefault:"localhost"`
}

func LoadConfig() *Config {

	initialEnv := os.Getenv("ENVIRONMENT")
	if len(strings.TrimSpace(initialEnv)) == 0 {
		log.Fatal("'ENVIRONMENT' variable not set, exiting.")
	}
	cfg := Config{}

	if _, err := toml.DecodeFile("configs/"+initialEnv+".toml", &cfg); err != nil {
		log.Fatalf("Could not load %s config with error: %s", err.Error())
	}

	err := env.Parse(&cfg)

	if err != nil {
		log.Fatalf("Failed to load env variables. %+v\n", err)
	}

	return &cfg
}
