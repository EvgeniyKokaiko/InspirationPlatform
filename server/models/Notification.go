package models

import "time"

type Notification struct {
	Id        uint      `gorm:"primaryKey"`
	Holder    string    `json:"holder"`
	Text      string    `json:"text"`
	Author    string    `json:"author"`
	PostHash  string    `json:"post_hash"`
	CreatedAt time.Time `json:"createdAt"`
}
