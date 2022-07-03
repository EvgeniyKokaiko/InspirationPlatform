package chats

import (
	"encoding/json"
	"github.com/gorilla/websocket"
)

type SocketClient struct {
	Username  string
	Connector *websocket.Conn
	Hub       Hub
	UUID      string
	ChatHash  string
}

type Hub map[string][]*SocketClient

func (hub Hub) AddClient(client *SocketClient, chatHash string) {
	hub[chatHash] = append(hub[chatHash], client)
}

func (hub Hub) RemoveClient(clientUUId string, hash string) []*SocketClient {
	room := hub[hash]
	if len(room) < 2 {
		return []*SocketClient{}
	}
	index := FindIndexByUUID(room, clientUUId)
	room[index].Connector.Close()
	return append(room[:index], room[index+1:]...)
}

func FindIndexByUUID(a []*SocketClient, x string) int {
	for index, value := range a {
		if value.UUID == x {
			return index
		}
	}
	return 0
}

func GetClientByUUID(a []*SocketClient, x string) *SocketClient {
	for _, value := range a {
		if value.UUID == x {
			return value
		}
	}
	return nil
}

func (ownClient *SocketClient) WriteMessage(messageType int, data any) error {
	byteSlices, err := json.Marshal(data)
	if err != nil {
		return err
	}
	sendError := ownClient.Connector.WriteMessage(messageType, byteSlices)
	if sendError != nil {
		return sendError
	}
	return nil
}
