
export type messageProps = {
    sender: string;
    companion: string;
    created_at: string;
    plain_message: string;
    status: number;
    type: number;
    message_hash: string;
}

class MessageEntity  {
    private _sender: string;
    private _companion: string;
    private _created_at: string;
    private _plain_message: string;
    private _status: number;
    private _type: number;
    private _message_hash: string;
    constructor(messageProps: messageProps) {
        this._sender = messageProps.sender;
        this._companion = messageProps.companion;
        this._created_at = messageProps.created_at;
        this._plain_message = messageProps.plain_message;
        this._status = messageProps.status;
        this._type = messageProps.type;
        this._message_hash = messageProps.message_hash
    }


    get sender(): string {
        return this._sender;
    }

    get companion(): string {
        return this._companion;
    }
    get created_at(): string {
        return this._created_at;
    }
    get plain_message(): string {
        return this._plain_message;
    }
    get status(): number {
        return this._status;
    }
    get type(): number {
        return this._type;
    }
    get message_hash(): string {
        return this._message_hash;
    }

}

//Sender 			string 	`json:"sender"`
// 	Companion 		string 	`json:"companion"`
// 	CreatedAt 		int64 	`json:"created_at"`
// 	PlainMessage	string 	`json:"plain_message"`
// 	Status 			int 	`json:"status"`
// 	Type 			int 	`json:"type"`
// 	MessageHash		string 	`json:"message_hash"`


export {MessageEntity}