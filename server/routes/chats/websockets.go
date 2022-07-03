package chats

import (
	"encoding/json"
	"fmt"
	uuid2 "github.com/google/uuid"
	"github.com/gorilla/websocket"
	"net/http"
	"server/database"
	"server/models"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type SocketMessage struct {
	MessageType int
	Message     []byte
}

func runWebsocket(w http.ResponseWriter, r http.Request, h http.Header, dataSet map[string]any, hub Hub) {
	socket, error := upgrader.Upgrade(w, &r, h)
	if error != nil {
		fmt.Println("Socket dropped!", error)
		return
	}
	ChatHash := dataSet["cHash"].(string)
	uuid := uuid2.New()
	Client := SocketClient{
		Username:  dataSet["username"].(string),
		Connector: socket,
		Hub:       hub,
		UUID:      uuid.String(),
		ChatHash:  ChatHash,
	}
	hub.AddClient(&Client, ChatHash)
	fmt.Println("clients", hub)
	Client.ReadSocketStream(dataSet["db"].(*database.DB))
}

func (ownClient *SocketClient) ReadSocketStream(db *database.DB) {
	defer ownClient.Connector.Close()
	for {
		mT, message, err := ownClient.Connector.ReadMessage()
		socketMessage := SocketMessage{
			MessageType: mT,
			Message:     message,
		}
		fmt.Println("asd")
		if err != nil {
			fmt.Println("LEAVED", ownClient.Username)
			ownClient.Hub[ownClient.ChatHash] = ownClient.Hub.RemoveClient(ownClient.UUID, ownClient.ChatHash)
			return
		}
		errorEmitter := SocketEmitter(ownClient, socketMessage, db)
		if errorEmitter != nil {
			ownClient.Hub[ownClient.ChatHash] = ownClient.Hub.RemoveClient(ownClient.UUID, ownClient.ChatHash)
			return
		}
	}
}

// ------------------------------------------------ //

// ----------------EMITTER----------------------- //

func SocketEmitter(client *SocketClient, socketMessage SocketMessage, db *database.DB) error {
	event := socketMessage.ParseSocketMessage()
	parsedSocketMessage := models.SocketEvent{
		Event: event["event"].(string),
		Data:  event["data"],
	}
	handler := SocketHandler{
		SocketMessage: &socketMessage,
		Client:        client,
		Db:            db,
		SocketEvent:   &parsedSocketMessage,
	}
	switch event["event"].(string) {
	case "SendMessage":
		SendMessageHandler(handler)
		break
	case "Connect":
		fmt.Println("Connected!")
	case "ReadAllMessages":
		fmt.Println("read all messages sf[olewokfoke")
		ReadAllMessagesHandler(handler)
		break
	case "RemoveOneMessage":
		DeleteMessageHandler(handler)
		break
	case "RemoveBunchMessages":
		DeleteMessageBunchHandler(handler)
		break
	default:
		fmt.Println("default")
	}
	return nil
}

func (message SocketMessage) ParseSocketMessage() map[string]any {
	result := map[string]any{}
	err := json.Unmarshal(message.Message, &result)
	if err != nil {
		return map[string]any{}
	}
	fmt.Println("res", result)
	return result
}
