package models

import "time"

type Subscriptions struct {
	Owner 		string `json:"owner"`
	Subscriber 	string `json:"subscriber,required"`
	Status 		int    `json:"status,required" gorm:"default: 0"`
	CreatedAt 	time.Time `json:"created_at,omitempty"`
	UpdatedAt 	time.Time `json:"updated_at,omitempty"`
}
