package routes

import (
	"github.com/gin-gonic/gin"
	"server/database"
)

func Likes(router *gin.Engine, db *database.DB) {
	route := router.Group("/likes")
	{
		route.POST("/:post-hash/like", func(c *gin.Context) {
				
		})
	}
}
