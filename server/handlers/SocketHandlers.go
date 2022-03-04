package handlers

import (
	"encoding/json"
	"fmt"
	"server/models"
	"server/models/mutable"
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
		return
	}
	response := map[string]any{}
	if err := json.Unmarshal(h.Message, &response); err != nil {
		fmt.Println(err)
	}
	fmt.Println(response)
	statusCode, err := h.Db.UpdateMessageStatus(response["data"].(string), h.Owner, 3)
	result := map[string]any{
		"statusCode": statusCode,
		"statusMessage": err,
	}
	resultBytes, err1 := json.Marshal(result)
	if err != nil || err1 != nil {
		fmt.Println("ReadAllMessagesHandler", err)
	}
	h.User.Connector.WriteMessage(h.MT, resultBytes)
}
