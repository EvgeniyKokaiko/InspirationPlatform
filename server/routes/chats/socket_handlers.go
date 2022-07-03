package chats

import (
	"fmt"
	"net/http"
	"server/database"
	"server/models"
	"server/utils"
	"time"
)

type ClientInterface interface {
}

type SocketHandler struct {
	SocketMessage *SocketMessage
	Client        *SocketClient
	Db            *database.DB
	SocketEvent   *models.SocketEvent
}

const (
	sendMessage         = "SendMessage"
	connect             = "Connect"
	closeConn           = "Close"
	readAllMessage      = "ReadAllMessages"
	addedMessage        = "AddedMessage"
	removeOneMessage    = "RemoveOneMessage"
	removeBunchMessages = "RemoveBunchMessages"
)

func SendMessageHandler(h SocketHandler) {
	message, error := h.Db.AddMessage(h.SocketEvent, h.Client.Username)
	if error != nil {
		fmt.Println(error)
		return
	}

	ownResponse := map[string]any{
		"event":      addedMessage,
		"statusCode": http.StatusOK,
		"username":   h.Client.Username,
		"message":    message,
	}

	threadError := make(chan bool)
	for _, client := range h.Client.Hub[h.Client.ChatHash] {
		if h.Client.UUID == client.UUID {
			err := h.Client.WriteMessage(h.SocketMessage.MessageType, ownResponse)
			if err != nil {
				panic(err)
			}
		} else {
			for i := 0; i <= 3; i++ {
				go SendHandlerByUser(h.SocketMessage.MessageType, client, message, threadError)
				isError := <-threadError
				if isError {
					time.Sleep(time.Second * 5)
				} else {
					break
				}
			}
		}
	}
}

func SendHandlerByUser(messageType int, client *SocketClient, message any, threadError chan bool) {
	defer close(threadError)
	body, creatingBodyError := utils.CreateSocketBody(sendMessage, message, true)
	if err := client.WriteMessage(messageType, body); err != nil || creatingBodyError != nil {
		threadError <- true
	}
	threadError <- false
}

func ReadAllMessagesHandler(h SocketHandler) {
	threadError := make(chan bool)
	for _, client := range h.Client.Hub[h.Client.ChatHash] {
		if h.Client.UUID == client.UUID {
			statusCode, err := h.Db.UpdateMessageStatus(h.SocketEvent.Data.(string), h.Client.Username, 3)
			body, err := utils.CreateSocketBody(readAllMessage, map[string]any{
				"statusCode":    statusCode,
				"statusMessage": err,
				"type":          1,
			}, true)
			go SendHandlerByUser(h.SocketMessage.MessageType, h.Client, body, threadError)
			isError := <-threadError
			if isError {
				fmt.Println("ReadAllMessagesHandler ex")
			}
		} else {
			for i := 0; i <= 3; i++ {
				body, err := utils.CreateSocketBody("ReadAllMessages", map[string]any{
					"statusCode":    200,
					"type":          0,
					"statusMessage": nil,
				}, true)
				if err != nil {
					panic("Error! ReadAllMessagesHandler ex")
				}
				go SendHandlerByUser(h.SocketMessage.MessageType, client, body, threadError)
				isError := <-threadError
				if isError {
					time.Sleep(time.Second * 5)
				} else {
					break
				}
			}
		}
	}
}

func DeleteMessageHandler(h SocketHandler) {
	//response := models.SocketEvent{}
	//err := json.Unmarshal(h.Message, &response)
	//if err != nil {
	//	panic("Error! DeleteMessageHandler ex")
	//}
	//message_hash := response.Data["message_hash"]
	//if reflect.TypeOf(message_hash).String() == "string" {
	//	isRemoved := h.Db.DeleteMessage(h.Owner, response.Data["message_hash"])
	//	data, err := utils.CreateSocketBody(removeOneMessage, map[string]any{
	//		"isRemoved":    isRemoved,
	//		"owner":        h.Owner,
	//		"message_hash": message_hash,
	//	}, true)
	//	if err != nil {
	//		panic("Error! DeleteMessageHandler ex")
	//	}
	//	h.User.Connector.WriteMessage(h.MT, data.([]byte))
	//} else {
	//	data, err := utils.CreateSocketBody(removeOneMessage, map[string]any{
	//		"isRemoved":    false,
	//		"owner":        h.Owner,
	//		"message_hash": message_hash,
	//	}, true)
	//	if err != nil {
	//		panic("Error! DeleteMessageHandler ex")
	//	}
	//	h.User.Connector.WriteMessage(h.MT, data.([]byte))
	//}
}

func DeleteMessageBunchHandler(h SocketHandler) {
	//response := models.SocketEvent{}
	//err := json.Unmarshal(h.Message, &response)
	//if err != nil {
	//	panic("DeleteMessageBunchHandler ex")
	//}
	//message_hashes := response.Data["message_hashes"]
	//if reflect.TypeOf(message_hashes).String() == "[]string" {
	//	isRemoved := h.Db.DeleteMessageBunch(h.Owner, message_hashes.([]string))
	//	data, err := utils.CreateSocketBody(removeOneMessage, map[string]any{
	//		"isRemoved":      isRemoved,
	//		"owner":          h.Owner,
	//		"message_hashes": message_hashes,
	//	}, true)
	//	if err != nil {
	//		panic("Error! DeleteMessageBunchHandler ex")
	//	}
	//	h.User.Connector.WriteMessage(h.MT, data.([]byte))
	//} else {
	//	data, err := utils.CreateSocketBody(removeOneMessage, map[string]any{
	//		"isRemoved":    false,
	//		"owner":        h.Owner,
	//		"message_hash": message_hashes,
	//	}, true)
	//	if err != nil {
	//		panic("Error! DeleteMessageBunchHandler ex")
	//	}
	//	h.User.Connector.WriteMessage(h.MT, data.([]byte))
	//}
}
