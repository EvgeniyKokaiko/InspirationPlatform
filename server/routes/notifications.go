package routes

import (
	"net/http"
	"server/database"
	typedDB "server/types"
	"server/utils"

	"firebase.google.com/go/messaging"
	"github.com/gin-gonic/gin"
)

/**
"pageSize": 0,
"pageIndex": 0,
"totalPages": 0,
"totalItems": 0,
*/

func Notifications(server *gin.Engine, db *database.DB, firebaseApp *messaging.Client) {
	route := server.Group("/notifications")
	{
		route.POST("/get-notifications", func(c *gin.Context) {
			requestData := map[string]any{}
			c.BindJSON(&requestData)
			username, _, headersErr := utils.ParseHeader(c)
			if headersErr != nil {
				c.JSON(http.StatusBadRequest, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
				return
			}
			data, dbErr := db.GetNotifications(username, requestData)
			if dbErr != nil {
				c.JSON(http.StatusBadRequest, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
				return
			}
			c.JSON(http.StatusOK, typedDB.GiveOKResponseWithData(data))
		})
	}
}
