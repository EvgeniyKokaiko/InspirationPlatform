package database

import (
	"log"
	"server/models"
	typedDB "server/types"
)

//TODO реалізувати тут повне створення бази данних з усіма таблицями і данними!

type TableCreator interface {
	BaseTableCreator(tableName string, callback func(name string))
	CreatePostsTable()
	CreateUsersTable()
	CreateUserSubsTable()
	CreateLikesTable()
	CreateU2UChatTable()
	CreateGroupChatTable()
	CreateNotificationTable()
}

func InitTables(db TableCreator) {
	db.CreatePostsTable()
	db.CreateUsersTable()
	db.CreateUserSubsTable()
	db.CreateLikesTable()
	db.CreateU2UChatTable()
	db.CreateGroupChatTable()
	db.CreateNotificationTable()
}

func (db *DB) BaseTableCreator(tableName string, callback func(name string)) {
	if isExists := db.database.Migrator().HasTable(tableName); !isExists {
		callback(tableName)
	}
}

func (db *DB) CreatePostsTable() {
	db.BaseTableCreator(typedDB.TABLES.POSTS, func(tableName string) {
		err := db.database.Migrator().AutoMigrate(&models.Post{})
		if err != nil {
			return
		}
	})
}

func (db *DB) CreateUsersTable() {
	db.BaseTableCreator(typedDB.TABLES.USERS, func(tableName string) {
		err := db.database.Migrator().AutoMigrate(&models.User{})
		if err != nil {
			return
		}
	})
}

func (db *DB) CreateUserSubsTable() {
	db.BaseTableCreator(typedDB.TABLES.SUBSCRIPTIONS, func(tableName string) {
		err := db.database.Migrator().AutoMigrate(&models.Subscriptions{})
		if err != nil {
			return
		}
	})
}

func (db *DB) CreateLikesTable() {
	db.BaseTableCreator(typedDB.TABLES.LIKES, func(tableName string) {
		err := db.database.Migrator().AutoMigrate(&models.Like{})
		if err != nil {
			return
		}
	})
}

func (db *DB) CreateU2UChatTable() {
	db.BaseTableCreator(typedDB.TABLES.USERToUSERChat, func(tableName string) {
		err := db.database.Migrator().AutoMigrate(&models.ChatData{})
		if err != nil {
			log.Fatal("CreateU2UChatTable ex")
		}
	})
}

func (db *DB) CreateNotificationTable() {
	db.BaseTableCreator(typedDB.TABLES.NOTIFICATIONS, func(tableName string) {
		err := db.database.Migrator().AutoMigrate(&models.Notification{})
		if err != nil {
			log.Fatal("CreateNotificationTable ex")
		}
	})
}

func (db *DB) CreateGroupChatTable() {

}
