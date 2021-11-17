package models



type EmptyUser struct {
	Username 	string  `json:"username"`
	Email 	 	string  `json:"email"`
	Password 	string  `json:"password,omitempty"`
	Token 		string  `json:"token"`
}

type User struct {
	Username      string `json:"username"`
	Email         string `json:"email"`
	Password      string `json:"password,omitempty"`
	FriendList    string `json:"friend_list"`
	Subscriptions string `json:"subscriptions"`
	AccessToken   string `json:"access_token"`
	Avatar        string `json:"avatar"`
	PersonalSite  string `json:"personal_site"`
	Gender        string `json:"gender"`
	Description   string `json:"description"`
	FullName      string `json:"full_name"`
	Location      string `json:"location"`
	DateOfBirth   string `json:"date_of_birth"`
	Token         string `json:"token,omitempty"`
}



type Username struct {
	Username  string `json:"username"`
}


