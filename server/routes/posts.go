package routes

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"log"
	"net/http"
	"server/database"
	"server/models"
	"server/utils"
)

func Posts(route *gin.Engine, db *database.DB) {
	router := route.Group("/posts")
	{
		router.POST("/add", func (c *gin.Context) {
			var requestData models.Post
			jsonDataBytes, err := ioutil.ReadAll(c.Request.Body)
			jserr := json.Unmarshal(jsonDataBytes, &requestData)
			fmt.Println(requestData)
			if err != nil && jserr != nil {
				log.Println("Error!, something went wrong on request body", err)
			}
			name, _, err := utils.ParseHeader(c)
			if err != nil {
				c.JSON(http.StatusLocked, map[string]interface{}{
					"message": "Locked!Bad Token",
				})
			} else {
				requestData.Owner = name
				requestData.LikeId = name
				result, errDB := db.AddPost(name, &requestData)
				if errDB != nil {
					c.JSON(http.StatusLocked, map[string]interface{}{
						"message": "Locked!Bad RequestData",
					})
				} else {
					c.JSON(http.StatusOK, map[string]interface{}{
						"isGood": result,
						"data": requestData,
					})
				}
			}
		})
		router.POST("/test", func(c *gin.Context) {
			var requestData  = map[string]interface{}{}
			c.Request.ParseForm()
			for key, value := range c.Request.PostForm {
				requestData[key] = value
				fmt.Println(key, value)
			}
			fmt.Println(requestData)
		})
	}
}