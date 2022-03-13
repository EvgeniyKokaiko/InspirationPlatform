package models

import "time"

type Like struct {
	Id        uint      `gorm:"primaryKey"`
	Creator   string    `json:"creator"`
	PostHash  string    `json:"post_hash"`
	Initiator string    `json:"initiator"`
	CreatedAt time.Time `json:"createdAt"`
}
