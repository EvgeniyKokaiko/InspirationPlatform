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

func Comments(router *gin.Engine, db *database.DB, firebaseApp *messaging.Client) {
	route := router.Group("/comments")
	{
		route.POST("/:posthash/add", func(c *gin.Context) {
			posthash := c.Param("posthash")
			username, _, err := utils.ParseHeader(c)
			if err != nil {
				c.JSON(http.StatusConflict, typedDB.GiveResponse(http.StatusConflict, "Conflict"))
			} else {
				bodyBytes, bytesErr := ioutil.ReadAll(c.Request.Body)
				data := map[string]string{}
				dataErr := json.Unmarshal(bodyBytes, &data)
				if bytesErr != nil || dataErr != nil {
					c.JSON(http.StatusConflict, typedDB.GiveResponse(http.StatusConflict, "Conflict"))
				}
				acceptedData, err := db.AddComment(username, posthash, data)
				if err != nil {
					c.JSON(http.StatusForbidden, typedDB.GiveResponseWithData(http.StatusForbidden, "Forbidden", acceptedData))
				} else {
					c.JSON(http.StatusOK, typedDB.GiveOKResponseWithData(acceptedData))
				}
			}
		})
		route.DELETE("/:posthash/:commenthash/delete", func(c *gin.Context) {
			posthash := c.Param("posthash")
			commenthash := c.Param("commenthash")
			username, _, err := utils.ParseHeader(c)
			if err != nil || len(posthash) < 10 || len(commenthash) < 10 {
				c.JSON(http.StatusBadRequest, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
			} else {
				dbErr := db.DeleteComment(posthash, commenthash, username)
				if dbErr != nil {
					c.JSON(http.StatusForbidden, typedDB.GiveResponse(http.StatusForbidden, "Forbidden"))
				} else {
					c.JSON(http.StatusOK, typedDB.GiveOKResponse())
				}
			}
		})

		route.GET("/:posthash/get", func(c *gin.Context) {
			posthash := c.Param("posthash")
			username, _, err := utils.ParseHeader(c)
			if err != nil || len(posthash) < 10 {
				c.JSON(http.StatusBadRequest, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
			} else {
				data, dbErr := db.GetComments(posthash, username)
				if dbErr != nil {
					c.JSON(http.StatusForbidden, typedDB.GiveResponse(http.StatusForbidden, "Forbidden"))
				} else {
					c.JSON(http.StatusOK, typedDB.GiveOKResponseWithData(data))
				}
			}
		})

		route.PUT("/:posthash/:commenthash/update", func(c *gin.Context) {
			posthash := c.Param("posthash")
			commenthash := c.Param("commenthash")
			username, _, err := utils.ParseHeader(c)
			if err != nil || len(posthash) < 10 || len(commenthash) < 10 {
				c.JSON(http.StatusBadRequest, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
			} else {
				dataBytes, bodyErr := ioutil.ReadAll(c.Request.Body)
				dataRequest := map[string]string{}
				parsingErr := json.Unmarshal(dataBytes, &dataRequest)
				errorMessage, dbErr := db.UpdateComment(posthash, commenthash, username, dataRequest)
				if bodyErr != nil || parsingErr != nil || dbErr != nil {
					c.JSON(http.StatusForbidden, typedDB.GiveResponseWithData(http.StatusForbidden, "Forbidden", errorMessage))
				} else {
					c.JSON(http.StatusOK, typedDB.GiveOKResponse())
				}
			}
		})
	}
}
