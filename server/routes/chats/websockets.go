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
	defer socket.Close()
	hub.AddClient(&Client, ChatHash)
	go Client.ReadSocketStream(dataSet["db"].(*database.DB))
}

func (ownClient *SocketClient) ReadSocketStream(db *database.DB) {
	defer ownClient.Connector.Close()
	for {
		mT, message, err := ownClient.Connector.ReadMessage()
		socketMessage := SocketMessage{
			MessageType: mT,
			Message:     message,
		}
		if err != nil {
			ownClient.Hub.RemoveClient(ownClient.UUID, ownClient.ChatHash)
		}
		errorEmitter := SocketEmitter(ownClient, socketMessage, db)
		if errorEmitter != nil {
			ownClient.Hub.RemoveClient(ownClient.UUID, ownClient.ChatHash)
		}
	}
}

// ------------------------------------------------ //

// ----------------EMITTER----------------------- //

func SocketEmitter(client *SocketClient, socketMessage SocketMessage, db *database.DB) error {
	eventName, data := socketMessage.ParseSocketMessage()
	parsedSocketMessage := models.SocketEvent{
		Event: eventName,
		Data:  data.(map[string]any),
	}
	handler := SocketHandler{
		SocketMessage: &socketMessage,
		Client:        client,
		Db:            db,
		SocketEvent:   &parsedSocketMessage,
	}
	switch eventName {
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

func (message SocketMessage) ParseSocketMessage() (string, any) {
	result := map[string]any{}
	err := json.Unmarshal(message.Message, &result)
	if err != nil {
		return "default", map[string]any{}
	}
	return result["event"].(string), result["data"]
}
