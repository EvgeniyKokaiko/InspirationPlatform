package models



type EmptyUser struct {
	Username 	string  `json:"username"`
	Email 	 	string  `json:"email"`
	Password 	string  `json:"password,omitempty"`
	Token 		string  `json:"token"`
	CreatedAt 	  string `json:"created_at"`
}

type User struct {
	Username      string `json:"username"`
	Email         string `json:"email"`
	Password      string `json:"-"`
	Avatar        string `json:"avatar"`
	PersonalSite  string `json:"personal_site"`
	Gender        string `json:"gender"`
	Description   string `json:"description"`
	FullName      string `json:"full_name"`
	Location      string `json:"location"`
	DateOfBirth   string `json:"date_of_birth"`
	Token         string `json:"-"`
	CreatedAt 	  string `json:"created_at"`
}



type Username struct {
	Username  string `json:"username"`
}


