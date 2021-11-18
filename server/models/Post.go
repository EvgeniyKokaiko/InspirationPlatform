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
}

type PostForm struct {
	Owner 			string 		`form:"owner"`
	Type  			int   		`form:"type"`
	Image			string 		`form:"image"`
	Video 			string 		`form:"video"`
	Text  			string  	`form:"text"`
	Caption 		string		`form:"caption"`
	LikeId 			string  	`form:"like_id"`
	DateOfCreation  string		`form:"date_of_creation"`
}