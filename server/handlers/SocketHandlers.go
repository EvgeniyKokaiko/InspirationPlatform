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
		body, err := CreateSocketBody("ReadAllMessages", map[string]any{
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
	body, err := CreateSocketBody("ReadAllMessages", map[string]any{
		"statusCode":    statusCode,
		"statusMessage": err,
		"type":          1,
	}, true)
	h.User.Connector.WriteMessage(h.MT, body.([]byte))
}

func CreateSocketBody(eventName string, body any, isBytes bool) (any, error) {
	if isBytes {
		result := map[string]any{
			"event": eventName,
			"data":  body,
		}
		bytesBody, err := json.Marshal(result)
		if err != nil {
			fmt.Print(bytesBody)
			return nil, nil
		}
		return bytesBody, nil
	} else {
		return map[string]any{
			"event": eventName,
			"data":  body,
		}, nil
	}
}
