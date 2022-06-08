package database

import (
	"fmt"
	"server/firebase"
	"server/models"
	typedDB "server/types"
	"sync"
	"time"
)

func (db *DB) StartFollowingPush(wg *sync.WaitGroup, owner, subscriber string, channel chan bool) {
	token, err := db.GetTokenByUser(owner)
	if err != nil {
		channel <- false
		return
	}
	firebase.SendMessage(PushTitle, fmt.Sprintf(Following, subscriber), token, map[string]string{})
	FollowingNotification := &models.Notification{
		Holder:         owner,
		Author:         subscriber,
		Text:           fmt.Sprintf(Following, subscriber),
		Status:         0,
		CreatedAt:      time.Time{},
		AdditionalInfo: "",
	}
	if dbFollowingResponse := db.database.Table(typedDB.TABLES.NOTIFICATIONS).Create(&FollowingNotification); dbFollowingResponse.Error != nil {
		channel <- false
		return
	}
	defer close(channel)
	channel <- true
	wg.Done()
}

func (db *DB) UnfollowPush(wg *sync.WaitGroup, owner, subscriber string, channel chan bool) {
	token, err := db.GetTokenByUser(owner)
	if err != nil {
		channel <- false
		return
	}
	firebase.SendMessage(PushTitle, Unfollow, token, map[string]string{})
	FollowingNotification := &models.Notification{
		Holder:         owner,
		Author:         subscriber,
		Text:           Unfollow,
		Status:         0,
		CreatedAt:      time.Time{},
		AdditionalInfo: "",
	}
	if dbFollowingResponse := db.database.Table(typedDB.TABLES.NOTIFICATIONS).Create(&FollowingNotification); dbFollowingResponse.Error != nil {
		channel <- false
		return
	}
	defer close(channel)
	channel <- true
	wg.Done()
}
