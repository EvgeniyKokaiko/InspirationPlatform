package routes

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"server/database"
	"server/utils"
)

func Users(route *gin.Engine, db *database.DB) {
	router := route.Group("/users")
	{
		router.GET("/me", func(c *gin.Context) {
			if len(c.Request.Header.Get("Authorization")) > 10 {
				name, email, err := utils.ParseHeader(c)
				fmt.Println(name, email, 5427)
				data := db.Me(name)
				if err != nil {
					c.JSON(http.StatusLocked, map[string]interface{}{
						"message": "Bad Token!",
					})
				} else {
					c.JSON(http.StatusOK, map[string]interface{}{
						"me":   true,
						"data": data,
						"avatar" : "http://" + c.Request.Host + "/users/avatar/" + data.Username,
					})
				}
			}
		})
		router.GET("/avatar/:username", func (c *gin.Context) {
				var username = c.Param("username")
				avatar := db.Avatar(username)
				c.File(avatar)
		})
	}
}

//fmt.Println(c.Request.Host+c.Request.URL.Path)