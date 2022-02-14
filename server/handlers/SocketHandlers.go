package handlers

import (
	"encoding/json"
	"fmt"
	"server/database"
	"server/models"
)



func SendMessageHandler(mT int, message []byte, user *models.SocketConnection, db *database.DB, owner string) {
	//time.Sleep(3 * time.Second)
	fmt.Println("SEND FUCING MESSSAGEGWSERKOGPPOKSRGKP{ORSGPKOSRG}KOPSROPGK")
	response := models.SocketMessage{}
	err1 := json.Unmarshal(message, &response)
	if err1 != nil {
		fmt.Println(err1)
	}
	boolean, error := db.AddMessage(&response.Data, owner)
	if error != nil || !boolean {
		fmt.Println(err1)
		return
	}
	err2 := user.Connector.WriteMessage(mT, message)
	if err2 != nil {
		fmt.Println(err2)
		return
	}
}

func OnConnectSocket(mT int, message []byte, user *models.SocketConnection) {
	//setOnlineStatus
}
