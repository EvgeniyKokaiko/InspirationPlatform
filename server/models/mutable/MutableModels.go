package mutable

import (
	"server/database"
	"server/models"
)

type SocketHandler struct {
	MT int
	Message []byte
	User    *models.SocketConnection
	Db      *database.DB
	Owner 	string
	Me 		bool
}
