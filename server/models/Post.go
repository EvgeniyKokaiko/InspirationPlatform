package models




type Post struct {
	Owner 			string 		`json:"owner"`
	Type  			int   		`json:"type"`
	Image			string 		`json:"image"`
	Video 			string 		`json:"video"`
	Text  			string  	`json:"text"`
	Caption 		string		`json:"caption"`
	LikeId 			string  	`json:"like_id"`
	DateOfCreation  string		`json:"date_of_creation"`
	DataCount 		string      `json:"data_count"`
}
