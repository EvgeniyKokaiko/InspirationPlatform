package database

import (
	"fmt"
	"server/firebase"
	"server/models"
	typedDB "server/types"
	"sync"
	"time"
)

type PushDataSet struct {
	wg                *sync.WaitGroup
	owner             string
	subscriber        string
	channel           chan bool
	notificationTitle string
	status            uint8
	additionalInfo    string
}

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

func (db *DB) PushNotificationWithTable(data *PushDataSet) {
	token, err := db.GetTokenByUser(data.owner)
	if err != nil {
		data.channel <- false
		return
	}
	sendMessageErr := firebase.SendMessage(PushTitle, data.notificationTitle, token, map[string]string{})
	if sendMessageErr != nil {
		data.channel <- false
		return
	}
	FollowingNotification := &models.Notification{
		Holder:         data.owner,
		Author:         data.subscriber,
		Text:           data.notificationTitle,
		Status:         int(data.status),
		CreatedAt:      time.Time{},
		AdditionalInfo: data.additionalInfo,
	}
	if dbFollowingResponse := db.database.Table(typedDB.TABLES.NOTIFICATIONS).Create(&FollowingNotification); dbFollowingResponse.Error != nil {
		data.channel <- false
		return
	}
	defer close(data.channel)
	data.channel <- true
	data.wg.Done()
}

func (db *DB) PushNotificationWithoutTable(data *PushDataSet) {
	token, err := db.GetTokenByUser(data.owner)
	if err != nil {
		data.channel <- false
		return
	}
	sendMessageErr := firebase.SendMessage(PushTitle, data.notificationTitle, token, map[string]string{})
	if sendMessageErr != nil {
		data.channel <- false
		return
	}
	defer close(data.channel)
	data.channel <- true
	data.wg.Done()
}

func (db *DB) SendPushPosts(owner, message string) error {
	/*
	*	@param maker string @table user_subscription
	*	@param username string @table users
	* 	@param fb_token string @table users
	 */
	friendList := []map[string]any{}
	if dbFriendListResponse := db.database.Raw("SELECT * FROM (SELECT maker from user_subscription WHERE subscriber = ? AND STATUS = 3) AS y INNER JOIN (SELECT username, fb_token FROM users) AS x ON x.username = y.maker", owner).Scan(&friendList); dbFriendListResponse.Error != nil {
		return dbFriendListResponse.Error
	}
	wg := &sync.WaitGroup{}
	wg.Add(len(friendList))
	for _, value := range friendList {
		if value["fb_token"] == nil {
			wg.Done()
			continue
		}
		dataSet := PushDataSet{
			wg:                wg,
			owner:             value["username"].(string),
			subscriber:        owner,
			channel:           make(chan bool),
			notificationTitle: message,
			status:            0,
			additionalInfo:    "",
		}
		go db.PushNotificationWithoutTable(&dataSet)
		if isSent := <-dataSet.channel; isSent {
			fmt.Println("AddPost Push sended")
		}
	}
	return nil
}
