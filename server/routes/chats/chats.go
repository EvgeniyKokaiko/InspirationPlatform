package chats

import (
	"fmt"
	"net/http"
	"server/database"
	typedDB "server/types"
	"server/utils"
	"strconv"

	"firebase.google.com/go/messaging"
	"github.com/gin-gonic/gin"
)

func Chats(route *gin.Engine, db *database.DB, firebaseApp *messaging.Client) {
	router := route.Group("/messaging")
	{
		router.GET("/get-messages/:userName", func(c *gin.Context) {
			page, pageErr := strconv.Atoi(c.Query("page"))
			init, _ := strconv.ParseBool(c.Query("init"))
			companion := c.Param("userName")
			if username, _, err := utils.ParseHeader(c); err == nil {
				if data, err := db.GetMessages(username, companion, page, init); err != nil || pageErr != nil {
					c.JSON(http.StatusConflict, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
				} else {
					c.JSON(http.StatusOK, typedDB.GiveOKResponseWithData(data))
				}
			} else {
				c.JSON(http.StatusConflict, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
			}
		})

		router.GET("/:token/:cHash", func(c *gin.Context) {
			var cHash = c.Param("cHash")
			var token = c.Query("token")

			fmt.Println(token, "TT")
			username, _, err := utils.ParseToken(token)
			dataSet := map[string]any{
				"db":       db,
				"cHash":    cHash,
				"username": username,
			}
			if err != nil {
				c.JSON(http.StatusConflict, typedDB.GiveResponse(http.StatusConflict, "Socket Conflicts"))
			}
			handleWS(c.Writer, *c.Request, nil, dataSet)
		})
	}
}
