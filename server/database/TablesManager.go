package database

//TODO реалізувати тут повне створення бази данних з усіма таблицями і данними!


type TableCreator interface {
	BaseTableCreator(callback func(name string))
	CreatePostsTable()
	CreateUsersTable()
	CreateUserSubsTable()
	CreateLikesTable()
	CreateU2UChatTable()
	CreateGroupChatTable()
}


func Start(db TableCreator) {
	db.CreatePostsTable()
	db.CreateUsersTable()
	db.CreateUserSubsTable()
	db.CreateLikesTable()
	db.CreateU2UChatTable()
	db.CreateGroupChatTable()
}

func (db *DB) BaseTableCreator(tableName string,callback func(name string)) {
	if isExists := db.database.Migrator().HasTable(tableName); !isExists {
		callback(tableName)
	}
}

func (db *DB) CreatePostsTable() {

}

func  (db *DB) CreateUsersTable() {

}

func  (db *DB) CreateUserSubsTable() {

}

func (db *DB) CreateLikesTable() {

}

func (db *DB) CreateU2UChatTable() {

}

func (db *DB) CreateGroupChatTable() {

}