package typedDB

import (
	"server/models"
	"server/utils"
)

type Tables struct {
	USERS 		  string
	POSTS  		  string
	SUBSCRIPTIONS string
}

var TABLES = Tables{
	USERS: 			"users",
	POSTS: 			"posts",
	SUBSCRIPTIONS: 	"user_subscription",
}


type DBMethods interface {
	CreateEmptyUser(*models.EmptyUser) error
	SetupAccount(*models.User) error
	Login(*models.EmptyUser) (models.EmptyUser, string)
    Me(username string) (utils.StandardMap, error)
	Avatar(string) string
	AddPost(string, map[string]interface{}) (string, error)
	DeletePost(string, string, string) (string, error)
	GetMyPosts(string) ([]*models.Post, error)
	Logout(string) error
	CheckToken(string) (string, error)
	GetNewsLine(string, int) ([]*models.Post, int ,error)
	GetUserDataWithPosts(string, string, int) (map[string]interface{}, error)
    SubscribeUser(owner string, subscriber string, ) (bool, error)
	UnfollowUser(owner string, subscriber string) (bool, error)
	AcceptRequestOnSubscription(string, string, bool) (bool, error)
}
