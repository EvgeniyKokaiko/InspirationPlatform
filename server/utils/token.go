package utils

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt"
	"strings"
)

type Claims struct {
	jwt.StandardClaims
	Username string
	Password string
	Email 	 string
}

const (
	A = iota
	B
	C
	D
	E
	F
)

const secret = "VaLhAlLa"

func CreateToken(username string, email string) string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &Claims{
		StandardClaims: jwt.StandardClaims{},
		Username: username,
		Email: email,
	})
	stringToken, err := token.SignedString([]byte(secret))
	if err != nil {
		fmt.Println(err)
	}
	return stringToken
}


func ParseToken(accessToken string) (string,string,error) {
	token, err := jwt.ParseWithClaims(accessToken, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("invalid signing method")
		}
		return []byte(secret), nil
	})
	if err != nil {
		return "", "", err
	}
	claims, ok := token.Claims.(*Claims)
	if !ok {
		return "", "", errors.New("token claims invalid")
	}

	return claims.Username, claims.Email ,nil
}

func oldParseToken(tokenstr string) {
	arrayFromJWT := strings.Split(tokenstr, ".")
	first := arrayFromJWT[1]
	fmt.Println(arrayFromJWT)
	token, _ := jwt.DecodeSegment(first)
	fmt.Println(string(token))
	var user Claims
	json.Unmarshal([]byte(string(token)), &user)
	fmt.Println(user)
}
