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
		route.GET("/:post-owner/:post-hash/like", func(c *gin.Context) {
			pHash := c.Param("post-hash")
			pOwner := c.Param("post-owner")
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
	}
}
