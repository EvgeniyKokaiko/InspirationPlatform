import { PlainMessage } from "../Types/Models";
import { MessageEntity } from "./entity/MessageEntity";

export class MessageStorage {
    private _companion: string;
    private _models: {[key: string]: MessageEntity}
    constructor() {
        this._companion = '';
        this._models = {};
    }


    public init = (data: Array<PlainMessage>) => {
        data.forEach((message, index) => {
            const newMessage = new MessageEntity({...message}, this);
            const key = message.message_hash;
            if (key !== void 0 && key !== null) {
                this._models[key] = newMessage;
            }
        });
    }

    public add = () => {
        
    }

    public update = () => {

    }

    public remove = () => {
        
    }


}