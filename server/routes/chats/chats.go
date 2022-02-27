package chats

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"server/database"
	typedDB "server/types"
	"server/utils"
)


func Chats(route *gin.Engine, db *database.DB) {
	router := route.Group("/messaging")
	{
		router.GET("/get-messages/:userName", func(c *gin.Context) {
			companion := c.Param("userName")
			if username, _, err := utils.ParseHeader(c); err == nil {
					if data, err := db.GetMessages(username, companion, 1); err != nil {
						fmt.Println("Error2")
						c.JSON(http.StatusConflict, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
					} else {
						fmt.Println("Not Error3")
						c.JSON(http.StatusOK, typedDB.GiveOKResponseWithData(data))
					}
			} else {
				fmt.Println("Error1")
				c.JSON(http.StatusConflict, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
			}
		})


		router.GET("/:token/:cHash", func(c *gin.Context) {
			var cHash = c.Param("cHash")
			var token = c.Query("token")

			fmt.Println(token, "TT")
			username, _, err := utils.ParseToken(token)
			dataSet := map[string]any{
				"db": db,
				"cHash": cHash,
				"username": username,
			}
 			if err != nil {
				c.JSON(http.StatusConflict, typedDB.GiveResponse(http.StatusConflict, "Socket Conflicts"))
			}
				 handleWS(c.Writer, *c.Request, nil, dataSet)
		})


	}
}