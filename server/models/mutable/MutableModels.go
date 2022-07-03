package mutable

import (
	"server/database"
	"server/models"
	"server/routes/chats"
)

type SocketHandler struct {
	SocketMessage *chats.SocketMessage
	Client        *chats.SocketClient
	Db            *database.DB
	SocketEvent   *models.SocketEvent
}
