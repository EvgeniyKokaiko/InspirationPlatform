package routes

import (
	"github.com/gin-gonic/gin"
	"server/database"
)

func Users(route *gin.Engine, db *database.DB) {
	router := route.Group("/users")
	{
		router.GET("/me", func(c *gin.Context) {

		})
	}
}