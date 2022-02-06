package models

import "github.com/gorilla/websocket"

type SocketConnection struct {
	Username string
	Connector *websocket.Conn
}



type SocketMessage struct {
	Event 	string 	`json:"event"`
	Data 	map[string]interface{} `json:"data"`
}


type Message struct {
	From 			string `json:"from"`
	To 				string `json:"to"`
	CreatedAt 		string `json:"created_at"`
	PlainMessage 	string `json:"plain_message"`
}
