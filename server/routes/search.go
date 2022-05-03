package routes

import (
	"net/http"
	"server/database"
	typedDB "server/types"

	"github.com/gin-gonic/gin"
)

func Search(route *gin.Engine, db *database.DB) {
	router := route.Group("/search")
	{
		router.PUT("/search_user", func(c *gin.Context) {
			// /search_user?search=searchxzczxc
			searchedValue := c.Query("search")
			result, err := db.SearchUserByName(searchedValue)
			if err != nil {
				c.JSON(http.StatusBadRequest, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
			} else {
				c.JSON(http.StatusOK, typedDB.GiveOKResponseWithData(result))
			}
		})
	}
}
