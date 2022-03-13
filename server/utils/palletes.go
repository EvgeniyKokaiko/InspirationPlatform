package utils

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"os"
)

func DeletePostFS(username string, hash string) error {
	if len(hash) < 20 {
		log.Println("something went wrong on folder deleting")
		return errors.New("ERROR!On post folder deleting")
	} else {
		err := os.RemoveAll(fmt.Sprintf("./storage/%s/posts/%s", username, hash))
		if err != nil {
			log.Println("Error on folder removing")
		}
		return nil
	}
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

func SaveFileToFolder(path string, fileName string, extension string, content []byte, permission uint16) {

}

func HandleStorageForPosts(name string, postName string) {
	if err := os.MkdirAll("storage/"+name, 0777); err != nil {
		log.Println(err)
		return
	}
	if err := os.MkdirAll("storage/"+name+"/posts/"+postName, 0777); err != nil {
		log.Println(err)
		return
	}
}

func GetBunch(page int) {

}
