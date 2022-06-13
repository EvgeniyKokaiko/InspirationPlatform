package models

import "time"

type User_Subscriptions struct {
	Id         uint      `gorm:"primaryKey"`
	Maker      string    `json:"maker"`
	Subscriber string    `json:"subscriber,required"`
	Status     int       `json:"status,required" gorm:"default: 0"`
	SocketHash string    `json:"socket_hash"`
	CreatedAt  time.Time `json:"created_at,omitempty"`
	UpdatedAt  time.Time `json:"updated_at,omitempty"`
}
