package routes

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"server/database"
	typedDB "server/types"
	"server/utils"

	"firebase.google.com/go/messaging"
	"github.com/gin-gonic/gin"
)

func Firebase(server *gin.Engine, db *database.DB, firebaseApp *messaging.Client) {
	router := server.Group("/firebase")
	{
		router.POST("/send-token", func(c *gin.Context) {
			requestData := map[string]any{}
			data, err := ioutil.ReadAll(c.Request.Body)
			jsonBodyErr := json.Unmarshal(data, &requestData)
			username, _, userTokenErr := utils.ParseHeader(c)
			if err != nil || jsonBodyErr != nil || userTokenErr != nil {
				c.JSON(http.StatusConflict, typedDB.GiveResponse(http.StatusConflict, "Conflicts"))
				return
			}
			databaseError := db.FirebaseToken(username, requestData)
			if databaseError != nil {
				c.JSON(http.StatusForbidden, typedDB.GiveResponse(http.StatusForbidden, "Forbidden"))
				return
			}
			c.JSON(http.StatusOK, typedDB.GiveResponse(http.StatusOK, "OK!"))
		})
	}

}
