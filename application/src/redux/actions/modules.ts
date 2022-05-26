import {BaseAction} from "./BaseAction";
import {Action, ActionTypes} from "../types/ActionTypes";
import {Dispatch} from "redux";
import {apiURL} from "./index";
import {MessageEntity} from "../../BLL/entity/MessageEntity";
import { PlainMessage } from "../../Types/Models";


class ModuleActions extends BaseAction {
    constructor(serverURL: string) {
        super(serverURL);
    }

    public setAllReadMessages = (status: number, type: number | undefined) => {
        return {
            type: ActionTypes.SetAllReadMessages,
            payload: {
                status,
                type,
            }
        }
    }


    public setStatus = (status: number, message_hash: string | null) => {
        return {
            type: ActionTypes.SetNewStatus,
            payload: {
                status,
                message_hash,
            }
        }
    }

    public addMessageToStack = (message: PlainMessage) => {
        return {
            type: ActionTypes.AddFakeMessage,
            payload: message
        }
    }

    public clearAllMessages = () => {
        return {
            type: ActionTypes.ClearMessages,
        }
    }

    public removeMessage = (message_hash: string) => {
        return {
            type: ActionTypes.RemoveMessage,
            payload: message_hash,
        }
    }

    public getToken = () => async (dispatch: Dispatch<Action>) => {
        await this._useToken(async (el: string | null) => {
            dispatch({type: ActionTypes.GetToken, payload: el})
        });
    };
}



export const modulesImpl = new ModuleActions(apiURL)