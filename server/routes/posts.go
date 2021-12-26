package routes

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"reflect"
	"server/database"
	"server/utils"
	"strconv"
)

func Posts(route *gin.Engine, db *database.DB) {
	router := route.Group("/posts")
	{//TODO сделать валидацию если нет токена, ибо рантайм паник.
		router.POST("/add", func (c *gin.Context) {
			var requestData = map[string]interface{}{}
			form, err := c.MultipartForm()
			fmt.Println(form, "val")
			val := form.Value
			fmt.Println("image", form.Value)
			files := form.File["image"]
			for key, val := range form.File {
				fmt.Println(key, val, "abobb")
			}
			postName := utils.RandStringBytesRmndr(30)
			var a = 0
			for key, value := range val {
				fmt.Println(key, value)
				if len(value) > 1 {
					requestData[key] = value
				} else {
					requestData[key] = value[0]
				}
				a++
					fmt.Println(reflect.TypeOf(key), key, value, val[key])
			}
			name, _, _ := utils.ParseHeader(c)
			fileIndex := 0
			//TODO винести це в отдельний файл
			if _, err := os.Stat("storage/" + name); os.IsNotExist(err) {
				os.Mkdir("storage/" + name, 777)
			} else {
				os.Mkdir("storage/" + name, 777)
			}
			if _, err := os.Stat("storage/" + name + "/" + "posts"); os.IsNotExist(err) {
				os.Mkdir("storage/" + name + "/" + "posts", 777)
				os.Mkdir("storage/" + name + "/" + "posts/" + postName, 777)
			} else {
				os.Mkdir("storage/" + name + "/" + "posts/" + postName, 777)
			}
			for _, file := range files {
				fmt.Println(file, "filess")
				if err := c.SaveUploadedFile(file, fmt.Sprintf("storage/%s/posts/%s/%d%s", name, postName ,fileIndex, ".png")); err != nil {
					c.String(http.StatusBadRequest, fmt.Sprintf("upload file err: %s", err.Error()))
					//fmt.Println( fmt.Sprintf("/storage/%s/posts/1/%d%s", name, fileIndex, fileExtension), fileIndex)
					return
				}
				fileIndex++
			}
			if err != nil {
				log.Println("Error!, something went wrong on request body", err)
			}
			if err != nil {
				c.JSON(http.StatusLocked, map[string]interface{}{
					"message": "Locked!Bad Token",
				})
			} else {
				requestData["owner"] = name
				requestData["like_id"] = name
				requestData["image"] = postName
				requestData["data_count"] = fileIndex
				result, errDB := db.AddPost(name, requestData)
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
		router.GET("/me", func (c *gin.Context) {
			name, _, err := utils.ParseHeader(c)
			if err != nil {
				c.JSON(http.StatusLocked, map[string]interface{}{
					"message": "Locked!Bad RequestData",
				})
			} else {
				result, err := db.GetMyPosts(name)
				if err != nil {

				} else {
					c.JSON(http.StatusOK, map[string]interface{}{
						"data": result,
					})
				}
			}
		})


		router.POST("/delete", func(c *gin.Context) {
			header := c.Request.Header.Get("Authorization")
			var request map[string]string
			body, parseError := ioutil.ReadAll(c.Request.Body)
			json.Unmarshal(body, &request)
			if header == "" || len(header) < 20 {
				c.JSON(http.StatusLocked, map[string]interface{}{
					"statusCode": http.StatusLocked,
					"statusMessage": "Invalid Token",
				})
			}
			name, _, err := utils.ParseHeader(c)
			if err != nil || parseError != nil {
				c.JSON(http.StatusLocked, map[string]interface{}{
					"statusCode": http.StatusLocked,
					"statusMessage": "Troubles on token parsing",
				})
			} else {
				result, error2 := db.DeletePost(name, request["hash"])
				if error2 != nil {
					c.JSON(http.StatusLocked, map[string]interface{}{
						"statusCode": http.StatusLocked,
						"statusMessage": "Troubles with database",
					})
				} else {
					utils.DeletePostFS(name, request["hash"])
					c.JSON(http.StatusOK, map[string]interface{}{
						"statusCode": http.StatusOK,
						"statusMessage": result,
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
	router.GET("/getNewsline", func(c *gin.Context) {
		var pageQuery string = c.Query("page")
		page, _ := strconv.Atoi(pageQuery)
			if name, _ , tokenError := utils.ParseHeader(c); tokenError == nil {
				fmt.Println(page)
					dbResponse, dbPageCount ,databaseError := db.GetNewsLine(name, page)
					if databaseError != nil || len(dbResponse) < 1 {
						c.JSON(http.StatusLocked, map[string]interface{}{
							"statusMessage": "Range Not Satisfiable",
							"statusCode": 416,
						})
					} else {
						c.JSON(http.StatusOK, map[string]interface{}{
							"statusMessage": "Accepted",
							"statusCode": 200,
							"data": dbResponse,
							"pages": dbPageCount,
						})
					}

			} else {
				log.Println("Error! ParseHeader exception", tokenError)
			}

	})
}