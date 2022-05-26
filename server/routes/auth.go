package routes

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"server/database"
	typedDB "server/types"

	"github.com/gin-gonic/gin"
)

func Auth(route *gin.Engine, db *database.DB) {
	auth := route.Group("/auth")
	{
		auth.POST("/register", func(c *gin.Context) { //создавати папку в сторейджі з avatar, posts
			var requestData = map[string]any{}
			jsonDataBytes, err := ioutil.ReadAll(c.Request.Body)
			errMarsh := json.Unmarshal(jsonDataBytes, &requestData)
			if err != nil || errMarsh != nil {
				c.JSON(http.StatusBadRequest, typedDB.GiveResponse(http.StatusBadRequest, "Status BadRequest"))
			} else {
				warningMsg, err := db.RegisterUser(requestData)
				if err != nil {
					c.JSON(http.StatusOK, typedDB.GiveResponse(http.StatusForbidden, warningMsg))
				} else {
					file, err := os.ReadFile("./storage/service/base_avatar.png")
					if err != nil {
						fmt.Println("ERR! On Avatar reading")
					}
					if err := os.MkdirAll(fmt.Sprintf("./storage/%s/avatar", warningMsg), 0777); err != nil {
						fmt.Println("ERR! On Avatar folder creating")
					}
					if err := os.WriteFile(fmt.Sprintf("./storage/%s/avatar/avatar.png", warningMsg), file, 0777); err != nil {
						fmt.Println("ERR! On Avatar writing")
					}
					c.JSON(http.StatusOK, typedDB.GiveOKResponseWithData(warningMsg))
				}
			}
		})
		auth.POST("/login", func(c *gin.Context) {
			var requestData map[string]any
			jsonBytes, err := ioutil.ReadAll(c.Request.Body)
			if err != nil {
				fmt.Println("Something went wrong", err)
			}
			json.Unmarshal(jsonBytes, &requestData)
			userToken, errstr := db.Login(requestData)
			if errstr != nil {
				c.JSON(http.StatusAlreadyReported, typedDB.GiveResponse(http.StatusAlreadyReported, userToken))
			} else {
				c.JSON(http.StatusOK, typedDB.GiveOKResponseWithData(userToken))
			}

		})
	}
}
