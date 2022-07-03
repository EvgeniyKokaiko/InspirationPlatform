package chats

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/database"
	"server/models"
	"server/utils"
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
	bytesMessage, _ := json.Marshal(&ownResponse)
	threadError := make(chan bool)
	for _, client := range h.Client.Hub[h.Client.ChatHash] {
		fmt.Println("dasdasdsa", h.Client.Hub[h.Client.ChatHash], client.UUID, client.Username)
		fmt.Println(h.Client.UUID == client.UUID, "uuid checks")
		if h.Client.UUID == client.UUID {
			fmt.Println("daunito")
			err := h.Client.WriteMessage(h.SocketMessage.MessageType, bytesMessage)
			if err != nil {
				panic(err)
			}
		} else {
			fmt.Println("nigger zxc", client.Username)
			go SendHandlerByUser(sendMessage, h.SocketMessage.MessageType, client, message, threadError)
			isError := <-threadError
			if isError {
			} else {
				break
			}
		}
	}
}

func SendHandlerByUser(eventName string, messageType int, client *SocketClient, message any, threadError chan bool) {
	body, creatingBodyError := utils.CreateSocketBody(eventName, message, true)
	if err := client.WriteMessage(messageType, body.([]byte)); err != nil || creatingBodyError != nil {
		threadError <- true
		return
	}
	threadError <- false
}

func ReadAllMessagesHandler(h SocketHandler) {
	threadError := make(chan bool)
	for _, client := range h.Client.Hub[h.Client.ChatHash] {
		if h.Client.UUID == client.UUID {
			statusCode, err := h.Db.UpdateMessageStatus(h.SocketEvent.Data, h.Client.Username, 3)
			body := map[string]any{
				"statusCode":    statusCode,
				"statusMessage": err,
				"type":          1,
			}
			go SendHandlerByUser(readAllMessage, h.SocketMessage.MessageType, h.Client, body, threadError)
			isError := <-threadError
			if isError {
				fmt.Println("ReadAllMessagesHandler ex")
			}
		} else {
			body := map[string]any{
				"statusCode":    200,
				"type":          0,
				"statusMessage": nil,
			}
			go SendHandlerByUser(readAllMessage, h.SocketMessage.MessageType, client, body, threadError)
			isError := <-threadError
			if isError {
			} else {
				break
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
