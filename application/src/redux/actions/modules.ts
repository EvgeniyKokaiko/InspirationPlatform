import {BaseAction} from "./BaseAction";
import {Action, ActionTypes} from "../types/ActionTypes";
import {Dispatch} from "redux";
import {apiURL} from "./index";
import {MessageEntity} from "../../BLL/entity/MessageEntity";


class ModuleActions extends BaseAction {
    constructor(serverURL: string) {
        super(serverURL);
    }


    public setStatus = (status: number, message_hash: string | null) => {
        console.log('setStatus')
        return {
            type: ActionTypes.SetNewStatus,
            payload: {
                status,
                message_hash,
            }
        }
    }

    public addMessageToStack = (message: MessageEntity) => {
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

    public getToken = () => async (dispatch: Dispatch<Action>) => {
        await this._useToken(async (el: string | null) => {
            dispatch({type: ActionTypes.GetToken, payload: el})
        });
    };
}



export const modulesImpl = new ModuleActions(apiURL)