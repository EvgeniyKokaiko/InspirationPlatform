package handlers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"server/models"
	"server/models/mutable"
)

func HandleByUser() {

}

const (
	sendMessage = "SendMessage"
	connect = "Connect"
	close = "Close"
	addedMessage = "AddedMessage"
)

func SendMessageHandlerByUser(h mutable.SocketHandler, message models.ChatData)  error {
	switch h.Me {
	case true:
		ownResponse := map[string]any{
			"event": addedMessage,
			"statusCode": http.StatusOK,
			"username": h.User.Username,
			"message": message,
		}
		byteResponse, err := json.Marshal(ownResponse)
		if err != nil {
			fmt.Println(err)
			return errors.New("ERROR! SendMessageHandlerByUser ex")
		}
		err2 := h.User.Connector.WriteMessage(h.MT,byteResponse)
		if err2 != nil  {
			fmt.Println(err2)
			return errors.New("ERROR! SendMessageHandlerByUser ex")
		}
		break
	case false:
		response := map[string]any{
			"event": sendMessage,
			"data": message,
		}
		messageBytes, err := json.Marshal(response)
		err2 := h.User.Connector.WriteMessage(h.MT, messageBytes)
		if err2 != nil || err != nil {
			fmt.Println(err2)
			return errors.New("ERROR! SendMessageHandlerByUser ex")
		}
		break
	}

	return nil
}