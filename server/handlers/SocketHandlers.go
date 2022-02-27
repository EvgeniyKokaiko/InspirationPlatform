package handlers

import (
	"encoding/json"
	"fmt"
	"server/models"
	"server/models/mutable"
)



func SendMessageHandler(h mutable.SocketHandler) {
	//time.Sleep(3 * time.Second)
	fmt.Println("SEND FUCING MESSSAGEGWSERKOGPPOKSRGKP{ORSGPKOSRG}KOPSROPGK")
	response := models.SocketMessage{}
	err1 := json.Unmarshal(h.Message, &response)
	if err1 != nil {
		fmt.Println(err1)
	}
	message, error := h.Db.AddMessage(&response.Data, h.Owner)
	if error != nil {
		fmt.Println(err1)
		//if error == vernuti error tomu polzovatelyu
	}
	err := SendMessageHandlerByUser(h, message)
	if err != nil {
		fmt.Println(err)
		return
	}
}

func OnConnectSocket(mT int, message []byte, user *models.SocketConnection) {
	//setOnlineStatus
}
