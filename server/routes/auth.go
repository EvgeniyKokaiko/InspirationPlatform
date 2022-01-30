package routes

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http"
	"os"
	"server/database"
	"server/models"
)

func Auth(route *gin.Engine, db *database.DB) {
	auth := route.Group("/auth")
	{
		auth.POST("/register", func (c *gin.Context) { //создавати папку в сторейджі з avatar, posts
			var requestData = models.EmptyUser{}
			jsonDataBytes, err := ioutil.ReadAll(c.Request.Body)
			json.Unmarshal(jsonDataBytes, &requestData)
			warning := db.CreateEmptyUser(&requestData)
			if warning != nil {
				c.JSON(http.StatusAlreadyReported, map[string]interface{}{
					"data": warning,
				})
			} else {
				file, err := os.ReadFile("./storage/service/base_avatar.png")
				fmt.Println("1")
				if err != nil {
					fmt.Println("ERR! On Avatar reading")
				}
				fmt.Println("2")
				if err := os.MkdirAll(fmt.Sprintf("./storage/%s/avatar", requestData.Username), 777); err != nil {
					fmt.Println("ERR! On Avatar folder creating")
				}
				fmt.Println("3", requestData.Username)
				if err := os.WriteFile(fmt.Sprintf("./storage/%s/avatar/avatar.png", requestData.Username), file, 777); err != nil {
					fmt.Println("ERR! On Avatar writing")
				}
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
					"data": result.Token,
				})
			} else {
				c.JSON(http.StatusAlreadyReported, map[string]interface{}{
					"message": "Invalid Data",
				})
			}


		})
	}
}