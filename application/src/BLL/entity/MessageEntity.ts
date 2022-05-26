import { timeParse } from "../../Parts/utils";
import { MessageStorage } from "../MessageStorage";

export type messageProps = {
    sender: string;
    companion: string;
    created_at: string | number;
    plain_message: string;
    status: number;
    type: number;
    message_hash?: string;
}

class MessageEntity  {
    private _sender: string;
    private _companion: string;
    private _created_at: string | number;
    private _plain_message: string;
    private _status: number;
    private _type: number;
    public _message_hash: string;
    private readonly _storage: MessageStorage;
    constructor(messageProps: messageProps, storage: MessageStorage) {
        this._sender = messageProps.sender;
        this._companion = messageProps.companion;
        this._created_at = messageProps.created_at ? new Date(messageProps.created_at).toString() : new Date().toString();
        this._plain_message = messageProps.plain_message;
        this._status = messageProps.status;
        this._type = messageProps.type;
        this._message_hash = messageProps.message_hash as string
        this._storage = storage;
    }


    public get sender(): string {
        return this._sender;
    }

    public get storage(): MessageStorage {
        return this._storage;
    }

    public get companion(): string {
        return this._companion;
    }
    public get created_at() {
        return this._created_at;
    }
    public set status(value: number) {
        this._status = value;
    }
    public get plain_message(): string {
        return this._plain_message;
    }
    public get messageMapping(): string {
        const date = timeParse(this._created_at)
        const name = this._sender
        const message = this._plain_message;
        return `${name} at ${date}: ${message}`
    }
    public get status(): number {
        return this._status;
    }
    public get type(): number {
        return this._type;
    }
    public get message_hash(): string {
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