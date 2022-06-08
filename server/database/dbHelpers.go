package database

import (
	"errors"
	typedDB "server/types"
)

const PushTitle = "Valhalla"

const (
	NewMessage    = "User <%s> send message to you!"
	RemoveMessage = "We don't know who, but someone deleted the message"
	NewPost       = "User <%s> added a new post"
	LikePost      = "User <%s> liked your publication"
	CommendPost   = "User <%s> left a comment under your publication"
	UpdateAvatar  = "User <%s> updated an avatar"
	Following     = "User <%s> started following you"
	Unfollow      = "We don't know who, but someone unfollow you"
)

func (db *DB) GetTokenByUser(username string) (string, error) {
	token := ""
	dbTokenResponse := db.database.Table(typedDB.TABLES.USERS).Select("fb_token").Where("username = ?", username).Take(&token)
	if dbTokenResponse.Error != nil {
		return "", errors.New("Error! GetTokenByUser ex")
	}
	return token, nil
}
