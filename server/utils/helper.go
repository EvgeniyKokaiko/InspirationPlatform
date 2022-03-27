package utils

import (
	"encoding/json"
	"errors"
	"fmt"
	"math/rand"
	"server/models"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type StandardMap map[string]interface{}
type Subscriptions models.Subscriptions

func ParseHeader(c *gin.Context) (string, string, error) {
	authorizationHeader := strings.Split(c.Request.Header.Get("Authorization"), " ")
	fmt.Println("-------TOKEN-------", c.Request.Header.Get("Authorization"), "--------------------")
	if len(c.Request.Header.Get("Authorization")) < 10 {
		return "", "", errors.New("ERROR! Something went wrong on token parsing")
	}
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

func GenerateHashWithSalt(salt ...interface{}) (string, error) {
	result := map[interface{}]interface{}{}
	randStr := RandStringBytesRmndr(32)
	for _, value := range salt {
		result[value] = value
	}
	result[randStr] = randStr
	result["timestamp"] = time.Now()

	byteResult, _ := json.Marshal(result)
	hash, _ := bcrypt.GenerateFromPassword(byteResult, 8)
	validHashString := strings.Replace(string(hash), "/", ".", 15)

	return validHashString, nil
}

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func RandStringBytesRmndr(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Int63()%int64(len(letterBytes))]
	}
	return string(b)
}

func (c StandardMap) AddToMap(key string, item interface{}) {
	c[key] = item
}

//func (c *Subscriptions) AddToStruct (key string, value interface{}, typed string) {
//	switch typed {
//	case "int":
//		reflect.ValueOf(c).FieldByName(key).SetInt(int64(value.(int)))
//	case "string":
//		reflect.ValueOf(c).FieldByName(key).SetString(value.(string))
//	case "bool":
//		reflect.ValueOf(c).FieldByName(key).SetBool(value.(bool))
//	}
//}

func RemoveConnection(slice []*websocket.Conn, s int) []*websocket.Conn {
	return append(slice[:s], slice[s+1:]...)
}

func FindIndex(a []*websocket.Conn, x *websocket.Conn) int {
	for index, n := range a {
		if x == n {
			return index
		}
	}
	return -1
}

func HandleDBError(ctx *gorm.DB, errorMessage string, result interface{}, values ...interface{}) (interface{}, error) {
	if ctx.Error != nil {
		return values, errors.New(errorMessage)
	}
	return result, nil
}
