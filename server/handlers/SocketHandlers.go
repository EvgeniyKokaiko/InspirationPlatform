package handlers

import (
	"encoding/json"
	"fmt"
	"server/models"
)



func SendMessageHandler(mT int, message []byte, user *models.SocketConnection) {
	fmt.Println("send message")
	parsedMessage := ""
	json.Unmarshal(message, parsedMessage)
	fmt.Println(message, parsedMessage)
	fmt.Println(user)
	err := user.Connector.WriteMessage(mT, message)
	if err != nil {
		fmt.Println(err)
	}
}
