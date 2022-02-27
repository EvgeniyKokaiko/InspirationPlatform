import {BaseAction} from "./BaseAction";
import {Action, ActionTypes} from "../types/ActionTypes";
import {Dispatch} from "redux";
import {apiURL} from "./index";


class ModuleActions extends BaseAction {
    constructor(serverURL: string) {
        super(serverURL);
    }


    public addMessageToStack = () => {
        console.log('testred')
        return {
            type: ActionTypes.Test,
        }
    }

    public getToken = () => async (dispatch: Dispatch<Action>) => {
        await this._useToken(async (el: string | null) => {
            dispatch({type: ActionTypes.GetToken, payload: el})
        });
    };
}



export const modulesImpl = new ModuleActions(apiURL)