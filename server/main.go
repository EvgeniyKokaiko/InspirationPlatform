package main

import (
	"github.com/gin-gonic/gin"
	"server/database"
	_ "server/database"
	"server/routes"
)

func main() {
	server := gin.Default()
	db := database.CreateDB()
	routes.Auth(server,db)
	routes.Users(server, db)
	server.Run(":8080")
}
