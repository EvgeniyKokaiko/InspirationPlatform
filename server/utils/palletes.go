package utils

import (
	"errors"
	"fmt"
	"log"
	"os"
)

func DeletePostFS(username string ,hash string) error  {
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



 func HandleStorageForPosts(name string, postName string) {
		if err := os.MkdirAll("storage/" + name, 777); err != nil {
			log.Println(err)
			return
		}
	  if err := os.MkdirAll("storage/" + name + "/posts/" + postName, 777); err != nil {
		  log.Println(err)
		  return
	  }
 }



 func GetBunch(page int) {

 }


