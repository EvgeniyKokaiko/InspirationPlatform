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
