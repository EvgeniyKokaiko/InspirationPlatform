package utils

import (
	"errors"
	"github.com/gin-gonic/gin"
	"strings"
)

func ParseHeader(c *gin.Context) (string, string, error) {
	authorizationHeader := strings.Split(c.Request.Header.Get("Authorization"), " ")
	token := authorizationHeader[1]
	name, email, err := ParseToken(token)
	if err != nil {
		return "", "", errors.New("ERROR! Something went wrong on token parsing")
	}
	return name, email, nil
}