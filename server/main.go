package main

import (
	"server/database"
	_ "server/database"
	"server/routes"
	"server/routes/chats"

	"github.com/gin-gonic/gin"
)

func main() {
	server := gin.Default()
	db := database.CreateDB()
	routes.Auth(server, db)
	routes.Users(server, db)
	routes.Posts(server, db)
	routes.Settings(server, db)
	routes.Likes(server, db)
	routes.Service(server, db)
	routes.Search(server, db)
	routes.Comments(server, db)
	chats.Chats(server, db)
	StaticServer(server)
	database.InitTables(db)
	server.Use(CORSMiddleware())
	server.Run(":8080")

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func StaticServer(server *gin.Engine) {
	server.Static("/storage", "./storage")
}
