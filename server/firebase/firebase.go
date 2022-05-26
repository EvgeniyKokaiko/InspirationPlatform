package firebase

import (
	firebase "firebase.google.com/go"
	"firebase.google.com/go/messaging"
)

//https://github.com/firebase/firebase-admin-go/blob/bb055ed1cfbe6224367c63caedc4ba72f1437dcd/snippets/messaging.go#L29-L55
//https://firebase.google.com/docs/cloud-messaging/send-message#go

var app = &firebase.App{}

func CreateMessage() *messaging.Message {
	message := &messaging.Message{
		Data: map[string]string{
			"score": "850",
			"time":  "2:45",
		},
		Token: "",
	}
	return message
}

func SendMessage() {

}
