package main

import (
	"server/database"
	"server/env"
	"server/firebase"
	"server/routes"
	"server/routes/chats"

	"github.com/gin-gonic/gin"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	server := gin.Default()
	db := database.CreateDB()
	env.EnvironmenttInit()
	fApp := firebase.CreateApplication()
	routes.Auth(server, db)
	routes.Users(server, db, fApp)
	routes.Posts(server, db, fApp)
	routes.Settings(server, db, fApp)
	routes.Likes(server, db, fApp)
	routes.Service(server, db)
	routes.Search(server, db)
	routes.Comments(server, db, fApp)
	routes.Notifications(server, db, fApp)
	routes.Firebase(server, db, fApp)
	hub := chats.Hub{}
	chats.Chats(server, db, fApp, hub)
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
