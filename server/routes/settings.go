package routes

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"server/database"
	typedDB "server/types"
	"server/utils"
)

func Settings(route *gin.Engine, db *database.DB) {
	router := route.Group("/settings")
	{
		router.POST("/avatar", func (c *gin.Context) {
			form , err := c.MultipartForm()
			if err != nil {
				log.Println("Err2!", err)
				c.JSON(http.StatusBadRequest, typedDB.GiveResponse(400, "Bad Request"))
				return
			}
			name, _, err := utils.ParseHeader(c)
			avatarFile := form.File["image"][0]
			if err := c.SaveUploadedFile(avatarFile, fmt.Sprintf("storage/%s/avatar/avatar.png", name)); err != nil {
				c.JSON(http.StatusBadRequest, typedDB.GiveResponse(400, "Bad Request"))
				return
			} else {
				c.JSON(http.StatusOK, typedDB.GiveOKResponse())
			}
			if err != nil {
				log.Println("Err3!", err)
				c.JSON(http.StatusBadRequest, typedDB.GiveResponse(400, "Bad Request"))
				return
			}
		})
		router.POST("/:parameter" , func (c *gin.Context) {
			var requestData = map[string]interface{}{}
			currentChangeableParam := c.Param("parameter")
			err := c.BindJSON(&requestData)
			if err != nil {
				log.Println("ERR!", err)
				c.JSON(http.StatusBadRequest, typedDB.GiveResponse(400, "Bad Request"))
				return
			}
			if len(currentChangeableParam) == 0 {
				c.JSON(http.StatusBadRequest, typedDB.GiveResponse(400, "Bad Request. No Param"))
				return
			}
			name, _, err := utils.ParseHeader(c)
			if err != nil {
				log.Println("ERR!", err)
				c.JSON(http.StatusBadRequest, typedDB.GiveResponse(400, "Bad Request"))
				return
			}
			ok, err := db.SetUserParam(currentChangeableParam, requestData["parameter"], name)
			if err != nil || !ok {
				c.JSON(http.StatusBadRequest, typedDB.GiveResponse(400, "Bad Request"))
			} else {
				c.JSON(http.StatusOK, typedDB.GiveOKResponse())
			}
		})
	}
}


