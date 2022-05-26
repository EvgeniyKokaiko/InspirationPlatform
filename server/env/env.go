package env

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func EnvironmenttInit() {
	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}
}

func GetKey(key string) any {
	value, isExists := os.LookupEnv(key)
	if !isExists {
		return nil
	}
	return value
}
