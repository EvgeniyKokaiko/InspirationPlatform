package routes

import (
	"net/http"
	"server/database"
	typedDB "server/types"
	"server/utils"

	"github.com/gin-gonic/gin"
)

func Likes(router *gin.Engine, db *database.DB) {
	route := router.Group("/likes")
	{
		route.GET("/:postowner/:posthash/like", func(c *gin.Context) {
			pHash := c.Param("posthash")
			pOwner := c.Param("postowner")
			if len(pHash) < 5 {
				c.JSON(http.StatusBadRequest, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
			} else {
				initiator, _, err := utils.ParseHeader(c)
				if err != nil {
					c.JSON(http.StatusBadRequest, typedDB.GiveResponse(http.StatusBadRequest, "Bad Request"))
					return
				}
				isLiked, err1 := db.LikePostHandler(initiator, pHash, pOwner)
				if err1 != nil {
					c.JSON(http.StatusBadRequest, typedDB.GiveResponse(http.StatusConflict, "Conflicts"))
					return
				}
				c.JSON(http.StatusOK, typedDB.GiveOKResponseWithData(map[string]any{
					"post_hash": pHash,
					"is_like":   isLiked,
				}))
			}
		})
		route.GET("/getLikes/:posthash", func(c *gin.Context) {
			var post_hash = c.Param("posthash")
			initiator, _, err := utils.ParseHeader(c)
			if err != nil {
				c.JSON(http.StatusBadRequest, typedDB.GiveResponse(http.StatusConflict, "Conflicts"))
			} else {
				response, err := db.GetLikesByHash(post_hash, initiator)
				if err != nil {
					c.JSON(http.StatusBadRequest, typedDB.GiveResponse(http.StatusBadRequest, err.Error()))
				} else {
					c.JSON(http.StatusOK, typedDB.GiveOKResponseWithData(response))
				}
			}

		})
	}
}
