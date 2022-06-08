package models

import "time"

type Notification struct {
	Id             uint      `gorm:"primaryKey"`
	Holder         string    `json:"holder"`
	Text           string    `json:"text"`
	Author         string    `json:"author"`
	AdditionalInfo string    `json:"post_hash"`
	Status         int       `json:"status"`
	CreatedAt      time.Time `json:"createdAt"`
}
