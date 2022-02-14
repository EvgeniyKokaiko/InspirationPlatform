package chats

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"reflect"
	"server/database"
	"server/handlers"
	"server/models"
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

func handleWS(w http.ResponseWriter, r http.Request, h http.Header, cHash string ,username string,db *database.DB) {
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
			 fmt.Println("closed1")
			 Stop(error, cHash, newConnection)
			 break
		 }
		 newMessage := map[string]interface{}{}
		 parsingErr := json.Unmarshal(message, &newMessage)
		 fmt.Println(newMessage, message)
		 currentEvent := newMessage["event"]
		 if parsingErr != nil {
			 fmt.Println("closed2")
			 fmt.Println(parsingErr, "Parse JSON ERROR!")
			 Stop(parsingErr, cHash, newConnection)
			 break
		 }
		 fmt.Println(newMessage, "MESSAGE")
		 for _, value := range SocketRoomer[cHash] {
			 fmt.Println(value, SocketRoomer, SocketRoomer[cHash])
			 //if reflect.DeepEqual(value, newConnection) {
				// continue
			 //}
				fmt.Println("Emitter")
				err := SocketEmitter(currentEvent, mT, message, &value, db ,username)
			 	if err != nil {
				 Stop(parsingErr, cHash, newConnection)
					break
			 	}
		 }
	 }
	fmt.Println(SocketRoomer)
}

func SocketEmitter(eventName interface{}, mT int, message []byte, user *models.SocketConnection, db *database.DB ,owner string) error {
	switch eventName {
	case "SendMessage":
		fmt.Println("send Message type")
		handlers.SendMessageHandler(mT, message, user, db, owner)
		break
	case "Connect":
		handlers.OnConnectSocket(mT, message, user)
	default:
		fmt.Println("default")
	}
	return nil
}




func Stop(error error, cHash string, newConnection models.SocketConnection) {
	log.Println("read:", error)
	index := FindIndex[models.SocketConnection](SocketRoomer[cHash], newConnection)
	fmt.Println(index)
	SocketRoomer[cHash] = remove[models.SocketConnection](SocketRoomer[cHash], index)
	defer newConnection.Connector.Close()
	return
}


func remove[T comparable](slice []T, s int) []T {
	if len(slice) < 2 {
		return []T{}
	}
		return append(slice[:s], slice[s+1:]...)
}

func FindIndex[T comparable](a []T, x T) int {
	for index, value := range a {
		if reflect.DeepEqual(value, x) {
			return index
		}
	}
	return 0
}