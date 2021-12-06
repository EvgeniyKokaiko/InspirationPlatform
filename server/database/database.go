package database

import (
	"errors"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
	models "server/models"
	"server/utils"
)

type DB struct {
	database *gorm.DB
	config struct {
		dsn 	 string
		ip  	 string
		username string
		databaseName string
	}
}


func CreateDB() *DB {
	Data := DB{
		config: struct {
			dsn      	 string
			ip       	 string
			username 	 string
			databaseName string
		}{
			dsn: "root:@tcp(127.0.0.1:3306)/valhalla?charset=utf8mb4&parseTime=True&loc=Local",
			ip: "127.0.0.1:3306",
			username: "evgeniykokaiko",
			databaseName: "valhalla",
		},
	}
	Data.database, _ = gorm.Open(mysql.Open(Data.config.dsn),  &gorm.Config{})
	if Data.database.Error != nil {
		log.Fatal("something went wrong with db")
	}
	return &Data
}



func (db *DB) CreateEmptyUser(item *models.EmptyUser) error {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(item.Password), 8)
	item.Password = string(hashedPassword)
	fmt.Println(item)
	err := db.database.Table("users").Create(&item)
	if err != nil {
		fmt.Println("Something went wrong", err)
	}
	return err.Error
}


func (db *DB) SetupAccount(item *models.User) error {
	fmt.Println(item, 34342)
	err := db.database.Table("users").Where("username = ?", item.Username).Updates(&item)
	if err != nil {
		fmt.Println(err)
	}
	return err.Error
}


func (db *DB) Login(item *models.EmptyUser) (models.EmptyUser, string) {
	var result models.User
	var tokenModel models.EmptyUser
	db.database.Raw("SELECT username, email, password, token FROM users WHERE username= ? ;", item.Username).Scan(&result)
	err := bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(item.Password))
	if err != nil {
		return models.EmptyUser{}, "Denied"
	} else {
		tokenModel.Token = utils.CreateToken(result.Username, result.Email)
		db.database.Table("users").Where("username = ?", result.Username).Updates(&tokenModel)
		return tokenModel, "Accepted"
	}
}


func (db *DB) Me(username string) *models.User {
	var result *models.User
	var resultPointer = &result
	db.database.Table("users").Where("username = ?", username).Take(&result).Scan(&result)
	(*resultPointer).Token = ""
	(*resultPointer).Password = ""
	return result
}


func (db *DB) Avatar(username string) string {
	var result *models.User
	db.database.Table("users").Where("username = ?", username).Take(&result).Scan(&result)
	fmt.Println(result.Avatar, "5454")
	return result.Avatar
}


func (db *DB) AddPost(username string, data map[string]interface{}) (string, error) {
	response := db.database.Table("posts").Create(data)
	if response.Error != nil {
		return "", errors.New("ERROR! Something went wrong on post creation")
	}
	return "Good", nil
}


func (db *DB) GetMyPosts(username string) ([]*models.Post, error) {
	var result []*models.Post
	db.database.Table("posts").Where("owner = ?", username).Find(&result).Scan(&result)
	return result, nil
}


func (db *DB) CheckToken(username string) (string, error) {
	var result *models.EmptyUser
	err := db.database.Table("users").Where("username = ?", username).Find(&result).Scan(&result)
	if err.Error != nil && len(result.Token) < 10 {
		fmt.Println(result)
		return "", err.Error
	}
	name, _, error := utils.ParseToken(result.Token)
	if error != nil && username != name {
	return "", error
	}

	return result.Username, nil
}