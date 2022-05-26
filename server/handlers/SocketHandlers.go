package handlers

import (
	"encoding/json"
	"fmt"
	"reflect"
	"server/models"
	"server/models/mutable"
	"server/utils"
)

func SendMessageHandler(h mutable.SocketHandler) {
	response := models.SocketMessage{}
	if err := json.Unmarshal(h.Message, &response); err != nil {
		fmt.Println(err)
	}
	fmt.Println("Added to database")
	message, error := h.Db.AddMessage(&response.Data, h.Owner)
	if error != nil {
		fmt.Println(error)
		//if error == vernuti error tomu polzovatelyu
	}
	if err := SendMessageHandlerByUser(h, message); err != nil {
		fmt.Println(err)
		return
	}
}

func ReadAllMessagesHandler(h mutable.SocketHandler) {
	if !h.Me {
		body, err := utils.CreateSocketBody("ReadAllMessages", map[string]any{
			"statusCode":    200,
			"type":          0,
			"statusMessage": nil,
		}, true)
		if err != nil {
			panic("Error! ReadAllMessagesHandler ex")
		}
		h.User.Connector.WriteMessage(h.MT, body.([]byte))
		return
	}
	response := map[string]any{}
	if err := json.Unmarshal(h.Message, &response); err != nil {
		fmt.Println(err)
	}
	fmt.Println(response, "Response")
	statusCode, err := h.Db.UpdateMessageStatus(response["data"].(string), h.Owner, 3)
	fmt.Println(statusCode, response["data"], h.Owner)
	body, err := utils.CreateSocketBody("ReadAllMessages", map[string]any{
		"statusCode":    statusCode,
		"statusMessage": err,
		"type":          1,
	}, true)
	h.User.Connector.WriteMessage(h.MT, body.([]byte))
}

func DeleteMessageHandler(h mutable.SocketHandler) {
	response := models.SocketEvent{}
	err := json.Unmarshal(h.Message, &response)
	if err != nil {
		panic("Error! DeleteMessageHandler ex")
	}
	message_hash := response.Data["message_hash"]
	if reflect.TypeOf(message_hash).String() == "string" {
		isRemoved := h.Db.DeleteMessage(h.Owner, response.Data["message_hash"])
		data, err := utils.CreateSocketBody(removeOneMessage, map[string]any{
			"isRemoved":    isRemoved,
			"owner":        h.Owner,
			"message_hash": message_hash,
		}, true)
		if err != nil {
			panic("Error! DeleteMessageHandler ex")
		}
		h.User.Connector.WriteMessage(h.MT, data.([]byte))
	} else {
		data, err := utils.CreateSocketBody(removeOneMessage, map[string]any{
			"isRemoved":    false,
			"owner":        h.Owner,
			"message_hash": message_hash,
		}, true)
		if err != nil {
			panic("Error! DeleteMessageHandler ex")
		}
		h.User.Connector.WriteMessage(h.MT, data.([]byte))
	}
}

func DeleteMessageBunchHandler(h mutable.SocketHandler) {
	response := models.SocketEvent{}
	err := json.Unmarshal(h.Message, &response)
	if err != nil {
		panic("DeleteMessageBunchHandler ex")
	}
	message_hashes := response.Data["message_hashes"]
	if reflect.TypeOf(message_hashes).String() == "[]string" {
		isRemoved := h.Db.DeleteMessageBunch(h.Owner, message_hashes.([]string))
		data, err := utils.CreateSocketBody(removeOneMessage, map[string]any{
			"isRemoved":      isRemoved,
			"owner":          h.Owner,
			"message_hashes": message_hashes,
		}, true)
		if err != nil {
			panic("Error! DeleteMessageBunchHandler ex")
		}
		h.User.Connector.WriteMessage(h.MT, data.([]byte))
	} else {
		data, err := utils.CreateSocketBody(removeOneMessage, map[string]any{
			"isRemoved":    false,
			"owner":        h.Owner,
			"message_hash": message_hashes,
		}, true)
		if err != nil {
			panic("Error! DeleteMessageBunchHandler ex")
		}
		h.User.Connector.WriteMessage(h.MT, data.([]byte))
	}
}
