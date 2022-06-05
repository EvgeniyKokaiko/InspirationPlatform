package routes

import (
	"fmt"
	"net/http"
	"server/database"
	typedDB "server/types"
	"server/utils"

	"firebase.google.com/go/messaging"
	"github.com/gin-gonic/gin"
)

func Users(route *gin.Engine, db *database.DB, firebaseApp *messaging.Client) {
	router := route.Group("/users")
	{
		router.GET("/me", func(c *gin.Context) {
			if len(c.Request.Header.Get("Authorization")) > 10 {
				name, email, err := utils.ParseHeader(c)
				fmt.Println(name, email, 5427)
				data, error := db.Me(name)
				if err != nil || error != nil {
					c.JSON(http.StatusLocked, map[string]interface{}{
						"message": "Bad Token!",
					})
				} else {
					c.JSON(http.StatusOK, map[string]interface{}{
						"me":     true,
						"data":   data,
						"avatar": "http://" + c.Request.Host + "/storage/" + name + "/avatar/avatar.png",
					})
				}
			}
		})
		router.GET("/check", func(c *gin.Context) {
			if len(c.Request.Header.Get("Authorization")) > 10 {
				name, _, err := utils.ParseHeader(c)
				if err != nil {
					c.JSON(http.StatusLocked, map[string]interface{}{
						"message": "Bad Token!",
					})
				} else {
					user, err := db.CheckToken(name)
					if err != nil {
						c.JSON(http.StatusLocked, map[string]interface{}{
							"message": "Bad Data!",
						})
					} else {
						c.JSON(http.StatusOK, map[string]interface{}{
							"message":     "Accepted!",
							"currentUser": user,
						})
					}
				}
			}
		})
		router.GET("/logout", func(c *gin.Context) {
			if tokenHeader := c.Request.Header.Get("Authorization"); len(tokenHeader) > 20 {
				name, _, err := utils.ParseHeader(c)
				if err != nil {
					c.JSON(http.StatusLocked, map[string]interface{}{
						"message": "Bad Token!",
					})
				}
				dbErr := db.Logout(name)
				if dbErr != nil {
					c.JSON(http.StatusLocked, map[string]interface{}{
						"message": "Bad Data!",
					})
				} else {
					c.JSON(http.StatusOK, map[string]interface{}{
						"statusCode":    http.StatusOK,
						"statusMessage": "accepted",
					})
				}
			}
		})
		router.GET("/:userId", func(c *gin.Context) {
			var usernameFromParam string = c.Param("userId")
			var name, _, err = utils.ParseHeader(c)
			if len(usernameFromParam) < 0 || err != nil {
				c.JSON(http.StatusBadRequest, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
			} else {
				if dbResult, error := db.GetUserDataWithPosts(usernameFromParam, name, 0); error == nil {
					c.JSON(http.StatusOK, typedDB.GiveOKResponseWithData(dbResult))
				} else {
					c.JSON(http.StatusBadRequest, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
				}
			}
		})
		router.GET("/:userId/subscribe", func(c *gin.Context) {
			var usernameFromParam string = c.Param("userId")
			if username, _, err := utils.ParseHeader(c); len(c.GetHeader("Authorization")) > 15 || err == nil {
				if response, err := db.SubscribeUser(usernameFromParam, username); err == nil && response == true {
					c.JSON(http.StatusOK, typedDB.GiveOKResponseWithData(map[string]interface{}{
						"owner":      usernameFromParam,
						"subscriber": username,
					}))
				} else {
					c.JSON(http.StatusOK, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
				}
			} else {
				c.JSON(http.StatusOK, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
			}

		})
		router.GET("/:userId/unfollow", func(c *gin.Context) {
			var usernameFromParam string = c.Param("userId")
			if username, _, err := utils.ParseHeader(c); len(c.GetHeader("Authorization")) > 15 || err == nil {
				if response, err := db.UnfollowUser(usernameFromParam, username); err == nil && response == true {
					c.JSON(http.StatusOK, typedDB.GiveOKResponseWithData(map[string]interface{}{
						"owner":      usernameFromParam,
						"subscriber": username,
					}))
				} else {
					c.JSON(http.StatusOK, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
				}
			} else {
				c.JSON(http.StatusOK, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
			}
		})
		router.POST("/:userId/acceptRequest", func(c *gin.Context) {
			var usernameFromParam string = c.Param("userId")
			var requestBody = map[string]interface{}{}
			err := c.BindJSON(&requestBody)
			if err != nil {
				fmt.Println(err)
				c.JSON(http.StatusOK, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
			}
			if username, _, err := utils.ParseHeader(c); len(c.GetHeader("Authorization")) > 15 || err == nil {
				if response, err := db.AcceptRequestOnSubscription(username, usernameFromParam, requestBody["status"].(bool)); err == nil && response == true {
					c.JSON(http.StatusOK, typedDB.GiveOKResponseWithData(map[string]interface{}{
						"owner":      usernameFromParam,
						"subscriber": username,
					}))
				} else {
					c.JSON(http.StatusOK, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
				}
			} else {
				c.JSON(http.StatusOK, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
			}
		})
		router.GET("/requestList", func(c *gin.Context) {
			if username, _, err := utils.ParseHeader(c); len(c.GetHeader("Authorization")) > 15 || err == nil {
				if response, err := db.GetRequestList(username); err == nil {
					c.JSON(http.StatusOK, typedDB.GiveOKResponseWithData(response))
				} else {
					c.JSON(http.StatusOK, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
				}
			} else {
				c.JSON(http.StatusOK, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
			}
		})
		router.GET("/:userId/following", func(c *gin.Context) {
			username := c.Param("userId")
			if response, err := db.GetMySubscriptionList(username, 0); err == nil {
				c.JSON(http.StatusOK, typedDB.GiveOKResponseWithData(response))
			} else {
				c.JSON(http.StatusOK, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
			}
		})
		router.GET("/:userId/followers", func(c *gin.Context) {
			username := c.Param("userId")
			if response, err := db.GetMyFriendList(username, 0); err == nil {
				c.JSON(http.StatusOK, typedDB.GiveOKResponseWithData(response))
			} else {
				c.JSON(http.StatusOK, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
			}
		})
	}
}

//dbResult, error := db.GetUserDataWithPosts("evgeniy", 0)
//fmt.Println(c.Request.Host+c.Request.URL.Path)
