package routes

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"server/database"
)

func Auth(route *gin.Engine, db *database.DB) {
	auth := route.Group("/auth")
	{
		auth.POST("/register", func (c *gin.Context) {
			var requestData = map[string]interface{}{}
			jsonDataBytes, err := ioutil.ReadAll(c.Request.Body)
			json.Unmarshal(jsonDataBytes, &requestData)
			if err != nil {
			}

			c.BindJSON(requestData)
			fmt.Println(requestData["username"])
		})
	}
}