package models

import "time"

type Subscriptions struct {
	Id         uint      `gorm:"primaryKey"`
	Owner      string    `json:"owner"`
	Subscriber string    `json:"subscriber,required"`
	Status     int       `json:"status,required" gorm:"default: 0"`
	SocketHash string    `json:"socket_hash"`
	CreatedAt  time.Time `json:"created_at,omitempty"`
	UpdatedAt  time.Time `json:"updated_at,omitempty"`
}
