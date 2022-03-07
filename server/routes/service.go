package routes

import (
	"net/http"
	"server/database"

	"github.com/gin-gonic/gin"
)

func Service(router *gin.Engine, db *database.DB) {
	router.LoadHTMLGlob("utils/static/*")
	router.NoRoute(func(c *gin.Context) {
		c.HTML(http.StatusNotFound, "404page.html", map[string]any{
			"not-found": "body",
		})
	})
}
