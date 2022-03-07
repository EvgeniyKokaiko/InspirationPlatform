package models

type EmptyUser struct {
	Username  string `json:"username"`
	Email     string `json:"email"`
	Password  string `json:"password,omitempty"`
	Token     string `json:"token"`
	IsPrivate bool   `json:"is_private"`
	CreatedAt string `json:"created_at"`
}

type User struct {
	Id           uint   `gorm:"primaryKey"`
	Username     string `json:"username"`
	Email        string `json:"email"`
	Password     string `json:"-"`
	Avatar       string `json:"avatar"`
	PersonalSite string `json:"personal_site"`
	Gender       string `json:"gender"`
	Description  string `json:"description"`
	FullName     string `json:"full_name"`
	Location     string `json:"location"`
	DateOfBirth  string `json:"date_of_birth"`
	IsPrivate    int    `json:"is_private"`
	Token        string `json:"-"`
	CreatedAt    string `json:"created_at"`
}

type Username struct {
	Username string `json:"username"`
}
