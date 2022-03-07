package models

import "time"

type Like struct {
	Id        uint      `gorm:"primaryKey"`
	Owner     string    `json:"owner"`
	PostHash  string    `json:"post_hash"`
	Initiator string    `json:"initiator"`
	CreatedAt time.Time `json:"createdAt"`
}
