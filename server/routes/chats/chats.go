package chats

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"server/database"
	typedDB "server/types"
	"server/utils"
)


func Chats(route *gin.Engine, db *database.DB) {
	router := route.Group("/messaging")
	{
		router.GET("/userId/getUrl", func(c *gin.Context) {


		})


		router.GET("/:token/:cHash", func(c *gin.Context) {
			var cHash = c.Param("cHash")
			var token = c.Param("token")
 			if username, _, err := utils.ParseToken(token); len(token) > 15 || err == nil {
				 handleWS(c.Writer, *c.Request, nil, cHash ,username)
			} else {
				c.JSON(http.StatusConflict, typedDB.GiveResponse(http.StatusConflict, "Socket Conflicts"))
			}
		})


	}
}