import { PlainMessage } from "../Types/Models";
import { MessageEntity } from "./entity/MessageEntity";


export class MessageStorage {
    private _companion: string;
    private  _models: MessageEntity[];
    private _initial: boolean;
    constructor() {
        this._companion = '';
        this._models = [];
        this._initial = true;
    }
    /**
     * 
     * 
     * {
              message_hash: el.message_hash as string,
              type: el.type,
              plain_message: el.plain_message,
              created_at: new Date(el.created_at).toString(),
              sender: el.sender,
              status: el.status,
              companion: el.companion,
            }
     */
            public get initial(): boolean {
                return this._initial;
            }


    public init = (data: Array<PlainMessage>) => {
        this._initial = true;
        data.forEach((message, index) => {
            const newMessage = new MessageEntity({ ...message }, this);
            const key = message.message_hash;
            this._models.push(newMessage);
        });
        
    }

    public add = (messageProps: PlainMessage) => {
        const ent = new MessageEntity({ ...messageProps }, this);
        this.models.push(ent);
    }

    public update = (index: number, key: keyof MessageEntity, value: any) => {
        const item = this._models[index];
        if (item === void 0) {
            return;
        }
        (item as any)[key] = value;
    }

    public remove = () => {

    }
    public addToEnd = (data: Array<PlainMessage>) => {
        this._initial = false;
        const oldMessages = data.map((item) => {
            return new MessageEntity({...item}, this)
        })
        this._models = [...oldMessages, ...this.models]
    }

    public get = (message_hash: string) => {
        return this._models.findIndex((item) => item.message_hash === message_hash);
    }

    public getItem = (key: string, value: string) => {
        return this._models.find((item) => (item as any)[key] === value);
    }

    public updateAll = (key: string, where: any, value: any) => {
        this.models.forEach((el: MessageEntity) => {
            if ((el as any)[key] === where) {
                (el as any)[key] = value;
            }
        });
    }


    public get models(): MessageEntity[] {
        return this._models;
    }

}