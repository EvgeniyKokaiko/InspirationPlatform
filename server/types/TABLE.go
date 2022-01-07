package typedDB

import (
	"server/models"
)

type Tables struct {
	USERS string
	POSTS string
}

var TABLES = Tables{
	USERS: "users",
	POSTS: "posts",
}


type DBMethods interface {
	CreateEmptyUser(*models.EmptyUser) error
	SetupAccount(*models.User) error
	Login(*models.EmptyUser) (models.EmptyUser, string)
	Me(string) *models.User
	Avatar(string) string
	AddPost(string, map[string]interface{}) (string, error)
	DeletePost(string, string) (string, error)
	GetMyPosts(string) ([]*models.Post, error)
	Logout(string) error
	CheckToken(string) (string, error)
	GetNewsLine(string, int) ([]*models.Post, int ,error)
	GetUserDataWithPosts(string, int) (map[string]interface{}, error)
}
