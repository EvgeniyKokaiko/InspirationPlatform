package models



type ChatData struct {
	Sender 			string 	`json:"sender"`
	Companion 		string 	`json:"companion"`
	CreatedAt 		int64 	`json:"created_at"`
	PlainMessage	string 	`json:"plain_message"`
	Status 			int 	`json:"status"`
	Type 			int 	`json:"type"`
	MessageHash		string 	`json:"message_hash"`
}