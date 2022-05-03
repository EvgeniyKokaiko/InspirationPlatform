package models

import "time"

type Comment struct {
	Id            uint      `gorm:"primaryKey" json:"id"`
	Creator       string    `json:"creator"`
	Comment_Hash  string    `json:"comment_hash"`
	Post_Hash     string    `json:"post_hash"`
	CommentString string    `json:"comment_string"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}
