package routes

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http"
	"server/database"
	"server/models"
)

func Auth(route *gin.Engine, db *database.DB) {
	auth := route.Group("/auth")
	{
		auth.POST("/register", func (c *gin.Context) {
			var requestData = models.EmptyUser{}
			jsonDataBytes, err := ioutil.ReadAll(c.Request.Body)
			json.Unmarshal(jsonDataBytes, &requestData)
			warning := db.CreateEmptyUser(&requestData)
			if warning != nil {
				c.JSON(http.StatusAlreadyReported, map[string]interface{}{
					"data": warning,
				})
			} else {
				c.JSON(http.StatusOK, map[string]interface{}{
					"data": requestData.Username,
				})
			}
			if err != nil {
				fmt.Println(err)
			}
			fmt.Println(requestData)
		})
		auth.POST("/setup", func(c *gin.Context) {
			var requestedData models.User
			jsonBytes, _ := ioutil.ReadAll(c.Request.Body)
			json.Unmarshal(jsonBytes, &requestedData)
			warning := db.SetupAccount(&requestedData)
			if warning != nil {
				c.JSON(http.StatusAlreadyReported, map[string]interface{}{
					"data": "Oops, something went wrong",
				})
			} else {
				c.JSON(http.StatusOK, map[string]interface{}{
					"data": "Your data was successfully saved!",
				})
			}
		})
		auth.POST("/login", func(c *gin.Context) {
			var req models.EmptyUser
			jsonBytes, err := ioutil.ReadAll(c.Request.Body)

			if err != nil {
				fmt.Println("Something went wrong", err)
			}
			json.Unmarshal(jsonBytes, &req)
			fmt.Println(req, 4)
			result, errstr := db.Login(&req)
			if errstr == "Accepted" {
				c.JSON(http.StatusOK, map[string]interface{}{
					"data": result,
				})
			} else {
				c.JSON(http.StatusOK, map[string]interface{}{
					"message": "Invalid Data",
				})
			}


		})
	}
}


//warning := db.SetupAccount(&requestedData)
//if warning != nil {
//	c.JSON(400, map[string]interface{}{
//		"message": warning,
//	})
//} else {
//	c.JSON(http.StatusOK, map[string]interface{}{
//		"data": "Your data was successfully saved!",
//	})
//}