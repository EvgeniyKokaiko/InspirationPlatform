package chats

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"reflect"
	"server/models"
	"server/utils"
)


var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var SocketRoomer = map[string][]models.SocketConnection{}
//delete(SocketRoomer, "")

func handleWS(w http.ResponseWriter, r http.Request, h http.Header, cHash string ,username string) {
	 socket, error := upgrader.Upgrade(w, &r, h)
	 if error != nil {
		 fmt.Println("Socket dropped!", error)
		 return
	 }
	newConnection := models.SocketConnection{
		Username:  username,
		Connector: socket,
	}
	 defer socket.Close()
	 SocketRoomer[cHash] = append(SocketRoomer[cHash], newConnection)
	 socket.WriteJSON(fmt.Sprintf("Success!Golang Socket was connected by this user <%s>", username))
	 for {
		 //mT - message type, message - byte slice message, error - error
		mT ,message , error := socket.ReadMessage()
		 if error != nil {
			 fmt.Println(error)
			 Stop(error, cHash, newConnection)
			 break
		 }
		 newMessage := map[string]interface{}{}
		 parsingErr := json.Unmarshal(message, &newMessage)
		 fmt.Println(newMessage, message)
		 currentEvent := newMessage["event"]
		 if parsingErr != nil {
			 fmt.Println(parsingErr, "Parse JSON ERROR!")
			 Stop(parsingErr, cHash, newConnection)
			 break
		 }
		 fmt.Println(newMessage, "MESSAGE")
		 for _, value := range SocketRoomer[cHash] {
			 fmt.Println(value, SocketRoomer, SocketRoomer[cHash])
			 if reflect.DeepEqual(value, newConnection) {
				 continue
			 }

				err := SocketEmitter(currentEvent, mT, message, &value)
			 	if err != nil {
				 Stop(parsingErr, cHash, newConnection)
					break
			 	}
		 }
	 }
	fmt.Println(SocketRoomer)
}

func SocketEmitter(eventName interface{}, mT int, message []byte, user *models.SocketConnection) error {
	switch eventName {
	case "SendMessage":
		utils.SendMessageHandler(mT, message, user)
	default:
		fmt.Println("default")
	}
	return nil
}




func Stop(error error, cHash string, newConnection models.SocketConnection) {
	log.Println("read:", error)
	index := FindIndex(SocketRoomer[cHash], newConnection)
	fmt.Println(index)
	SocketRoomer[cHash] = remove(SocketRoomer[cHash], index)
	defer newConnection.Connector.Close()
	return
}


func remove(slice []models.SocketConnection, s int) []models.SocketConnection {
		return append(slice[:s], slice[s+1:]...)
}

func FindIndex(a []models.SocketConnection, x models.SocketConnection) int {
	for index, value := range a {
		if reflect.DeepEqual(value, x) {
			return index
		}
	}
	return 0
}