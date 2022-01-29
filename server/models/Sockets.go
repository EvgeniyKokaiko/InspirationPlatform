package models

import "github.com/gorilla/websocket"

type SocketConnection struct {
	Username string
	Connector *websocket.Conn
}


type Event struct {
	EventName string `json:"event_name"`
}


type SocketMessage struct {
	Event 	`json:"event"`
	Message `json:"message"`
}


type Message struct {
	From 			string `json:"from"`
	To 				string `json:"to"`
	CreatedAt 		string `json:"created_at"`
	PlainMessage 	string `json:"plain_message"`
}
