package database

import (
	"errors"
	"fmt"
	"log"
	"math"
	models "server/models"
	typedDB "server/types"
	"server/utils"
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type DB struct {
	database *gorm.DB
	config   struct {
		dsn          string
		ip           string
		username     string
		databaseName string
	}
}

func CreateDB() *DB {
	Data := DB{
		config: struct {
			dsn          string
			ip           string
			username     string
			databaseName string
		}{
			dsn:          "root:@tcp(127.0.0.1:3306)/valhalla?charset=utf8mb4&parseTime=True&loc=Local",
			ip:           "127.0.0.1:3306",
			username:     "evgeniykokaiko",
			databaseName: "valhalla",
		},
	}
	Data.database, _ = gorm.Open(mysql.Open(Data.config.dsn), &gorm.Config{})
	if Data.database.Error != nil {
		log.Fatal("something went wrong with db")
	}
	return &Data
}

func (db *DB) CreateEmptyUser(item *models.EmptyUser) error {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(item.Password), 8)
	item.Password = string(hashedPassword)
	item.IsPrivate = false
	item.CreatedAt = time.Now().Format(time.RFC3339)
	fmt.Println(item)
	err := db.database.Table(typedDB.TABLES.USERS).Create(&item)
	if err != nil {
		fmt.Println("Something went wrong", err)
	}
	return err.Error
}

//при тому коли ми создали емпті юзера і вишли з аппки, при заході назад дивитись чи він сетапнувся, якщо ні, тоді перекидувати на скрін сетапа!

func (db *DB) SetupAccount(item *models.User) error {
	err := db.database.Table(typedDB.TABLES.USERS).Where("username = ?", item.Username).Updates(&item)
	if err != nil {
		fmt.Println(err)
	}
	return err.Error
}

func (db *DB) Login(item *models.EmptyUser) (models.EmptyUser, string) {
	var result models.User
	var tokenModel models.EmptyUser
	db.database.
		Raw("SELECT username, email, password, token FROM users WHERE username= ? ;", item.Username).
		Scan(&result)
	err := bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(item.Password))
	if err != nil {
		return models.EmptyUser{}, "Denied"
	} else {
		tokenModel.Token = utils.CreateToken(result.Username, result.Email)
		db.database.Table("users").Where("username = ?", result.Username).Updates(&tokenModel)
		return tokenModel, "Accepted"
	}
}

func (db *DB) Me(username string) (utils.StandardMap, error) {
	var result *models.User
	var resultPointer = &result
	var userCounts = map[string]interface{}{}
	var dbResult = utils.StandardMap{}
	dbUserResponse := db.database.
		Table(typedDB.TABLES.USERS).
		Where("username = ?", username).
		Take(&result).
		Scan(&result)
	dbCounter := db.database.
		Table(typedDB.TABLES.SUBSCRIPTIONS).
		Raw(`SELECT x.owner_count, y.subscriber_count FROM
		(SELECT COUNT(*) AS owner_count from user_subscription WHERE maker = ?) AS x, 
		(SELECT COUNT(*) AS subscriber_count FROM user_subscription WHERE subscriber = ?) as y`, username, username).
		Scan(&userCounts)
	dbResult.AddToMap("userData", result)
	dbResult.AddToMap("counts", userCounts)
	if dbUserResponse.Error != nil || dbCounter.Error != nil {
		return utils.StandardMap{}, errors.New("ERROR! DB error")
	}
	(*resultPointer).Token = ""
	(*resultPointer).Password = ""
	return dbResult, nil
}

func (db *DB) Avatar(username string) string {
	var result *models.User
	db.database.Table(typedDB.TABLES.USERS).Where("username = ?", username).Take(&result).Scan(&result)
	fmt.Println(result.Avatar, "5454")
	return result.Avatar
}

func (db *DB) AddPost(username string, data map[string]interface{}) (string, error) {
	data["date_of_creation"] = time.Now()
	fmt.Println(data["date_of_creation"])
	response := db.database.Table(typedDB.TABLES.POSTS).Create(data)
	if response.Error != nil {
		return "", errors.New("ERROR! Something went wrong on post creation")
	}
	return "Good", nil
}

func (db *DB) DeletePost(username string, hash string, owner string) (string, error) {
	result := db.database.Table(typedDB.TABLES.POSTS).Where("owner = ? AND image = ?", username, hash).Delete(&models.Post{})
	if result.Error != nil || owner != username {
		return "", errors.New("ERROR! Something went wrong")
	}
	return "Accept", nil
}

func (db *DB) GetMyPosts(username string) ([]*models.Post, error) {
	var result []*models.Post
	db.database.Table(typedDB.TABLES.POSTS).Where("owner = ?", username).Find(&result).Scan(&result)
	return result, nil
}

func (db *DB) Logout(username string) error {
	result := db.database.Table(typedDB.TABLES.USERS).Where("username = ?", username).Update("token", "")
	if result.Error != nil {
		return errors.New("ERROR! Something went wrong on database")
	}
	return nil
}

func (db *DB) CheckToken(username string) (string, error) {
	var result *models.EmptyUser
	err := db.database.Table(typedDB.TABLES.USERS).Where("username = ?", username).Find(&result).Scan(&result)
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

func (db *DB) GetNewsLine(initiator string, page int) ([]map[string]any, int, error) {
	var dbResult []map[string]any
	var dbPageResult = map[string]interface{}{}
	const postBunch int = 30
	dbResponse := db.database.Raw(`
	SELECT * FROM posts ORDER BY posts.date_of_creation DESC`, initiator).Offset(postBunch * page).Limit(postBunch).Scan(&dbResult)
	dbPageCount := db.database.Raw("SELECT COUNT(*) FROM posts").Scan(&dbPageResult)
	pageCount := math.Ceil(float64(dbPageResult["COUNT(*)"].(int64) / 30))
	fmt.Println(dbPageCount, pageCount)
	if dbResponse.Error != nil {
		log.Println("GetNewsLine ex", dbResponse.Error)
		return []map[string]any{}, 0, errors.New("ERROR! You got error on GetNewsLine method in DB")
	}

	return dbResult, int(pageCount), nil
}

func (db *DB) GetUserDataWithPosts(username string, name string, page int) (map[string]interface{}, error) {
	var userData *models.User
	var userPosts *[]models.Post
	var userSubscription *models.Subscriptions
	var userCounts = map[string]interface{}{}
	dbResult := utils.StandardMap{}
	dbUserDataResponse := db.database.
		Table(typedDB.TABLES.USERS).
		Where("username = ?", username).
		Take(&userData)
	dbSubscription := db.database.
		Table(typedDB.TABLES.SUBSCRIPTIONS).
		Where("maker = ? AND subscriber = ?", username, name).
		Find(&userSubscription)
	dbCounter := db.database.
		Table(typedDB.TABLES.SUBSCRIPTIONS).
		Raw(`SELECT x.owner_count, y.subscriber_count FROM
		(SELECT COUNT(*) AS owner_count from user_subscription WHERE maker = ?) AS x, 
		(SELECT COUNT(*) AS subscriber_count FROM user_subscription WHERE subscriber = ?) as y`, username, username).
		Scan(&userCounts)
	if (userData.IsPrivate == 1 && userSubscription.Status > 2) || userData.IsPrivate == 0 {
		dbUserPostsResponse := db.database.
			Table(typedDB.TABLES.POSTS).
			Where("owner = ?", username).
			Scan(&userPosts)
		if dbUserPostsResponse.Error != nil {
			return map[string]interface{}{}, errors.New("ERROR! You got an error on database catching")
		}
		dbResult.AddToMap("userPosts", userPosts)
		dbResult.AddToMap("isPrivate", false)
	} else {
		dbResult.AddToMap("userPosts", map[string]interface{}{
			"status":     "Locked.User doesn't give permission",
			"statusCode": 1,
		})
		dbResult.AddToMap("isPrivate", true)
	}
	dbResult.AddToMap("counts", userCounts)

	if userSubscription.Maker == "" && userSubscription.Subscriber == "" {
		dbResult.AddToMap("isSubscribe", false)
	} else {
		dbResult.AddToMap("isSubscribe", true)
	}

	if dbUserDataResponse.Error != nil || dbSubscription.Error != nil || dbCounter.Error != nil {
		return map[string]interface{}{}, errors.New("ERROR! You got an error on database catching")
	}
	if userData.Password != "" {
		userData.Password = ""
	}
	dbResult.AddToMap("isSubscribed", userSubscription)
	dbResult.AddToMap("userData", userData)
	return dbResult, nil
}

//status 0 - unknown
//status 1 - private
//status 2 - accepted
//status 3 - two dimension subscription

func (db *DB) SubscribeUser(owner string, subscriber string) (bool, error) {
	subscription := models.Subscriptions{}
	subscription.Subscriber = subscriber
	subscription.Maker = owner
	subscription.CreatedAt = time.Now()
	subscription.UpdatedAt = time.Now()
	ownerUser := models.User{}
	isExists := models.Subscriptions{}
	var countOfResponses int = 0

	dbUserResponse := db.database.
		Table(typedDB.TABLES.USERS).
		Where("username = ?", owner).
		Take(&ownerUser)
	dbSubscriptionResponse := db.database.
		Raw("Select COUNT(*) FROM user_subscription WHERE maker = ? AND subscriber = ?", owner, subscriber).
		Scan(&countOfResponses)

	if dbUserResponse.Error != nil || countOfResponses != 0 || dbSubscriptionResponse.Error != nil || owner == subscriber {
		return false, errors.New("ERROR!This user doesnt exists")
	}

	if dbTwoWaySubscriptionResponse := db.database.Table(typedDB.TABLES.SUBSCRIPTIONS).Where("maker = ? AND subscriber = ? AND status > 1", subscriber, owner).Take(&isExists); isExists.Maker != subscriber && isExists.Subscriber != owner {
		fmt.Println(1, 2)
		if ownerUser.IsPrivate == 1 {
			subscription.Status = 1
		} else {
			subscription.Status = 2
		}
	} else {
		fmt.Println(3, dbTwoWaySubscriptionResponse.Error)
		subscription.Status = 3
		cHash, _ := utils.GenerateHashWithSalt(owner, subscriber, time.Now())
		subscription.SocketHash = cHash
		updateSecondDimension := models.Subscriptions{SocketHash: cHash, Status: 3}
		fmt.Println(subscription.SocketHash, "BRUH0", updateSecondDimension, "BRUH")
		if dbMySubscriptionResponse := db.database.
			Table(typedDB.TABLES.SUBSCRIPTIONS).
			Where("maker = ? AND subscriber = ? AND status > 1", subscriber, owner).
			Updates(&updateSecondDimension); dbMySubscriptionResponse.Error != nil {
			return false, errors.New("ERROR!This user doesnt exists")
		}
	}

	if dbSubscriptionResponse := db.database.
		Table(typedDB.TABLES.SUBSCRIPTIONS).
		Create(&subscription); dbSubscriptionResponse.Error != nil {
		return false, errors.New("ERROR!Something went wrong")
	}
	return true, nil
}

func (db *DB) UnfollowUser(owner string, subscriber string) (bool, error) {
	subscription := models.Subscriptions{}
	dbUnfollowResponse := db.database.
		Table(typedDB.TABLES.SUBSCRIPTIONS).
		Where("maker = ? AND subscriber = ?", owner, subscriber).
		Delete(&subscription)
	if dbUnfollowResponse.Error != nil || dbUnfollowResponse.RowsAffected == 0 {
		return false, errors.New("ERROR! Something went wrong")
	}
	return true, nil
}

func (db *DB) AcceptRequestOnSubscription(owner string, username string, accepted bool) (bool, error) {
	subscription := models.Subscriptions{}
	if accepted {
		if dbAcceptRequestResponse := db.database.
			Table(typedDB.TABLES.SUBSCRIPTIONS).
			Where("maker = ? AND subscriber = ?", owner, username).
			Update("status", 2); dbAcceptRequestResponse.Error != nil || dbAcceptRequestResponse.RowsAffected == 0 {
			fmt.Println(dbAcceptRequestResponse.Error, dbAcceptRequestResponse.RowsAffected, true)
			return false, errors.New("ERROR! Something went wrong")
		}
	} else {
		if dbDeclineRequestResponse := db.database.
			Table(typedDB.TABLES.SUBSCRIPTIONS).
			Where("maker = ? AND subscriber = ?", owner, username).
			Delete(&subscription); dbDeclineRequestResponse.Error != nil || dbDeclineRequestResponse.RowsAffected == 0 {
			fmt.Println(dbDeclineRequestResponse.Error, dbDeclineRequestResponse.RowsAffected, false, owner, username, accepted)
			return false, errors.New("ERROR! Something went wrong")
		}
	}

	return true, nil
}

//SELECT * FROM user_subscription INNER JOIN (SELECT full_name, username, email, description FROM users) AS user_rows ON user_subscription.owner = user_rows.username AND user_subscription.owner = 'kek54'

func (db *DB) GetRequestList(owner string) ([]map[string]interface{}, error) {
	var subscriptionList []map[string]interface{}

	if dbGetRequestListResponse := db.database.Raw(`
		SELECT * FROM user_subscription
		INNER JOIN (SELECT full_name, username, email, description FROM users)
		AS user_rows ON user_subscription.subscriber = user_rows.username
		AND user_subscription.maker = ? AND user_subscription.status = 1`, owner).
		Take(&subscriptionList); dbGetRequestListResponse.Error != nil || dbGetRequestListResponse.RowsAffected == 0 {
		return []map[string]interface{}{}, errors.New("ERROR! Something went wrong")
	}
	fmt.Println(subscriptionList)
	return subscriptionList, nil
}

func (db *DB) GetMyFriendList(owner string, page int) ([]map[string]interface{}, error) {
	var subscriptionList []map[string]interface{}

	if dbGetRequestListResponse := db.database.Raw(`
		SELECT * FROM user_subscription
		INNER JOIN (SELECT full_name, username, email, description FROM users)
		AS user_rows ON user_subscription.subscriber = user_rows.username
		AND user_subscription.maker = ?`, owner).
		Find(&subscriptionList); dbGetRequestListResponse.Error != nil || dbGetRequestListResponse.RowsAffected == 0 {
		return []map[string]interface{}{}, errors.New("ERROR! Something went wrong")
	}
	fmt.Println(subscriptionList)
	return subscriptionList, nil
}

func (db *DB) GetMySubscriptionList(subscriber string, page int) ([]map[string]interface{}, error) {
	var subscriptionList []map[string]interface{}

	if dbGetRequestListResponse := db.database.Raw(`
		SELECT * FROM user_subscription
		INNER JOIN (SELECT full_name, username, email, description FROM users)
		AS user_rows ON user_subscription.maker = user_rows.username
		AND user_subscription.subscriber = ?`, subscriber).
		Find(&subscriptionList); dbGetRequestListResponse.Error != nil || dbGetRequestListResponse.RowsAffected == 0 {
		return []map[string]interface{}{}, errors.New("ERROR! Something went wrong")
	}
	fmt.Println(subscriptionList)
	return subscriptionList, nil
}

func (db *DB) GetMyNewsLine(subscriber string, page int) ([]map[string]interface{}, error) {
	var myNewsLine = []map[string]any{}
	//FIX likes (there is select * likes except likes to current post)
	if dbGetMyNewsLineResponse := db.database.Raw(`
	SELECT * FROM posts INNER JOIN
	(SELECT maker, subscriber, status FROM user_subscription 
	WHERE STATUS > 1 AND subscriber = ?)
	AS subs ON (posts.owner = subs.maker)
	 ORDER BY posts.date_of_creation DESC
		`, subscriber, subscriber).Scan(&myNewsLine); dbGetMyNewsLineResponse.Error != nil && dbGetMyNewsLineResponse.Error != gorm.ErrRecordNotFound {
		return []map[string]interface{}{}, errors.New("ERROR! On GetMyNewsLine reading")
	}
	return myNewsLine, nil
}

//SELECT * FROM posts INNER JOIN (SELECT owner, subscriber, status FROM user_subscription WHERE STATUS = 2 AND subscriber = 'evgeniy') AS subs ON (posts.owner = subs.owner)

func Da(base typedDB.DBMethods, a string) {
	var b = 'A'
	fmt.Println(base.Me(a))
	fmt.Println(b)
}

const (
	USERNAME  string = "username"
	PASSWORD         = "password"
	TOKEN            = "token"
	Avatar           = "avatar"
	CREATEDaT        = "created_at"
)

func (db *DB) SetUserParam(param string, value interface{}, username string) (bool, error) {
	if param == USERNAME || param == PASSWORD || param == TOKEN || param == Avatar || param == CREATEDaT {
		return false, errors.New("ERROR! ON dbSetParamResponse. You can't change this param")
	}
	if dbSetParamResponse := db.database.
		Table("users").
		Where("username = ?", username).
		Update(param, value); dbSetParamResponse.Error != nil {
		return false, errors.New("ERROR! ON dbSetParamResponse")
	}

	return true, nil
}

func (db *DB) AddMessage(data *models.FromClientData, owner string) (models.ChatData, error) {
	newMessage := models.ChatData{
		Sender:       owner,
		Companion:    data.Companion,
		CreatedAt:    time.Now().UnixMilli(),
		PlainMessage: data.PlainMessage,
		Status:       2,
		Type:         0,
		MessageHash:  data.MessageHash,
	}
	if dbMessageResponse := db.database.Table(typedDB.TABLES.USERToUSERChat).Create(&newMessage); dbMessageResponse.Error != nil {
		return models.ChatData{}, errors.New("ERROR! On Message Creating")
	}
	return newMessage, nil
}

func (db *DB) GetMessages(owner string, to string, page int) ([]*models.ChatData, error) {
	var response []*models.ChatData
	if getMessagesResponse := db.database.Table(typedDB.TABLES.USERToUSERChat).Where("sender = ? AND companion = ? OR sender = ? AND companion = ?", owner, to, to, owner).Scan(&response); getMessagesResponse.Error != nil {
		return []*models.ChatData{}, errors.New("Error!On GetMessages Method")
	}

	return response, nil
}

func (db *DB) UpdateMessageStatus(sender string, companion string, status int) (int, error) {
	if updateMessageStatusResponse := db.database.Table(typedDB.TABLES.USERToUSERChat).
		Where("sender = ? AND companion = ?", sender, companion).
		Update("status", status); updateMessageStatusResponse.Error != nil {
		if updateMessageStatusResponse.Error == gorm.ErrRecordNotFound {
			return 404, errors.New("ERROR! UpdateMessageStatus ex")
		} else {
			return 400, errors.New("ERROR! UpdateMessageStatus ex")
		}
	}
	return 200, nil
}

func (db *DB) LikePostHandler(initiator string, postHash string, owner string) (bool, error) {
	var likeExist *models.Like
	dbLikeResponse := db.database.Table(typedDB.TABLES.LIKES).Where("post_hash = ? AND creator = ? AND initiator = ?", postHash, owner, initiator).Take(&likeExist)
	fmt.Println(likeExist)
	if likeExist.Initiator == initiator || likeExist.PostHash == postHash {
		dbLikeRemoveResponse := db.database.Table(typedDB.TABLES.LIKES).Where("post_hash = ? AND creator = ? AND initiator = ?", postHash, owner, initiator).Delete(&models.Like{})
		if dbLikeResponse.Error != nil || dbLikeRemoveResponse.Error != nil {
			return false, errors.New("LikePostHandler ex")
		}
		return false, nil
	} else {
		likeBody := models.Like{
			Creator:   owner,
			PostHash:  postHash,
			Initiator: initiator,
			CreatedAt: time.Time{},
		}
		dbLikeAddResponse := db.database.Table(typedDB.TABLES.LIKES).Create(&likeBody)
		if dbLikeAddResponse.Error != nil {
			return false, errors.New("LikePostHandler ex")
		}
		return true, nil
	}
}

func (db *DB) GetPostWithLikesByHash(postHash string, initiator string) (map[string]any, error) {
	var dbData = map[string]any{}

	if dbGetPostResponse := db.database.Raw(`
	SELECT * FROM (SELECT * FROM posts WHERE posts.image = ?) as posts2 LEFT JOIN (SELECT maker, subscriber, status FROM user_subscription 
		WHERE subscriber = ?)
		AS subs ON (posts2.owner = subs.maker) LEFT JOIN (SELECT COUNT(*) as likesCount, post_hash FROM likes WHERE likes.post_hash = ?) as likes ON (posts2.image = likes.post_hash)  
		LEFT JOIN (SELECT * FROM likes WHERE initiator = ?) as likeData ON (posts2.image = likes.post_hash)
		 ORDER BY posts2.date_of_creation DESC`, postHash, initiator, postHash, initiator).Take(&dbData); dbGetPostResponse.Error != nil {
		return map[string]any{}, errors.New("ERROR! GetPostWithLikesByHash ex")
	}
	return dbData, nil
}

func (db *DB) GetLikesByHash(post_hash string, initiator string) (map[string]any, error) {
	var response = map[string]any{}
	var likesData = map[string]any{}
	dbGetIsLikedResponse := db.database.Raw("select * from likes where likes.post_hash = ? and likes.initiator = ?", post_hash, initiator).Take(&map[string]any{})
	fmt.Println(dbGetIsLikedResponse.Error)
	if dbGetIsLikedResponse.Error != nil {
		response["isLiked"] = false
	} else {
		response["isLiked"] = true
	}
	if dbGetLikesCount := db.database.Raw("select post_hash, count(*) as likesCount from likes where post_hash = ?", post_hash).Take(&likesData); dbGetLikesCount.Error != nil {
		return map[string]any{}, errors.New("Error! GetLikesByHash ex")
	}
	response["likesData"] = likesData

	return response, nil
}
