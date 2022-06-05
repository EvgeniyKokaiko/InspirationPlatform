package routes

import (
	"server/database"

	"firebase.google.com/go/messaging"
	"github.com/gin-gonic/gin"
)

func Notifications(server *gin.Engine, db *database.DB, firebaseApp *messaging.Client) {
	route := server.Group("/notifications")
	{
		route.POST("/get-notifications", func(c *gin.Context) {

		})
	}
}
