package main

import (
	"github.com/gin-gonic/gin"
	_ "server/database"
)

func main() {
	server := gin.Default()
	//db := database.CreateDB()
	server.Run(":8080")
}
