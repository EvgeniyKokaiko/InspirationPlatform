package models

import "time"

type Post struct {
	Id             uint      `gorm:"primaryKey"`
	Owner          string    `json:"owner"`
	Type           uint      `json:"type"`
	Image          string    `json:"image"`
	Video          string    `json:"video"`
	Text           string    `json:"text"`
	Caption        string    `json:"caption"`
	LikeId         string    `json:"like_id"`
	DateOfCreation time.Time `json:"date_of_creation"`
	DataCount      int       `json:"data_count"`
}
