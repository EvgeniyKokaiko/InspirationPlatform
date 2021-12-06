package utils

import (
	"errors"
	"github.com/gin-gonic/gin"
	"math/rand"
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

func RandomString(n int) string {
	var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")

	s := make([]rune, n)
	for i := range s {
		s[i] = letters[rand.Intn(len(letters))]
	}
	return string(s)
}

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
func RandStringBytesRmndr(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Int63() % int64(len(letterBytes))]
	}
	return string(b)
}