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
	"server/models/mutable"
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
//cHash string ,username string,db *database.DB
func handleWS(w http.ResponseWriter, r http.Request, h http.Header, dataSet map[string]any) {
	 socket, error := upgrader.Upgrade(w, &r, h)
	 if error != nil {
		 fmt.Println("Socket dropped!", error)
		 return
	 }
	newConnection := models.SocketConnection{
		Username:  dataSet["username"].(string),
		Connector: socket,
	}
	 defer socket.Close()
	 SocketRoomer[dataSet["cHash"].(string)] = append(SocketRoomer[dataSet["cHash"].(string)], newConnection)
	 socket.WriteJSON(fmt.Sprintf("Success!Golang Socket was connected by this user <%s>", dataSet["username"].(string)))
	 for {
		 //mT - message type, message - byte slice message, error - error
		mT ,message , error := socket.ReadMessage()
		 if error != nil {
			 fmt.Println(error)
			 fmt.Println("closed1")
			 Stop(error, dataSet["cHash"].(string), newConnection)
			 break
		 }
		 newMessage := map[string]interface{}{}
		 parsingErr := json.Unmarshal(message, &newMessage)
		 fmt.Println(newMessage, message)
		 currentEvent := newMessage["event"]
		 if parsingErr != nil {
			 fmt.Println("closed2")
			 fmt.Println(parsingErr, "Parse JSON ERROR!")
			 Stop(parsingErr, dataSet["cHash"].(string), newConnection)
			 break
		 }
		 fmt.Println(newMessage, "MESSAGE")
		 for _, value := range SocketRoomer[dataSet["cHash"].(string)] {
			 fmt.Println(value, SocketRoomer, "SOCKET ROOMER")
				fmt.Println("Emitter")
			 	ownConnect := false
			 	if reflect.DeepEqual(value, newConnection) {
					ownConnect = true
				}
					err := SocketEmitter(currentEvent, mT, message, &value, dataSet["db"].(*database.DB), dataSet["username"].(string), ownConnect)
					if err != nil {
					Stop(parsingErr, dataSet["cHash"].(string), newConnection)
						return
					}

		 }
	 }
	fmt.Println(SocketRoomer)
}

func SocketEmitter(eventName interface{}, mT int, message []byte, user *models.SocketConnection, db *database.DB ,owner string, isMe bool) error {
	sendMessageModelProps := mutable.SocketHandler{
		MT:      mT,
		Message: message,
		User:    user,
		Db:      db,
		Owner:   owner,
		Me: isMe,
	}
	switch eventName {
	case "SendMessage":
		fmt.Println("send Message type")
		handlers.SendMessageHandler(sendMessageModelProps)
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