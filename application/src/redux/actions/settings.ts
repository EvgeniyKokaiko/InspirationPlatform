import {apiURL} from "./index";
import {Dispatch} from "redux";
import {Action, ActionTypes} from "../types/ActionTypes";
import {BaseAction} from "./BaseAction";
import axios from "axios";
import {Asset} from "../../Types/Models";


class Settings extends BaseAction {
    constructor(url: string) {
        super(url)
    }
    public setNewAvatar = (file: Asset) => async (dispatch: Dispatch<Action>) => {
        const formData = new FormData()
        formData.append("image", {
            uri: file.uri,
            name: file.fileName,
            type: file.type,
        })
        await this._useToken(async (el: string | null) => {
            axios
                .post(`http://${apiURL}/settings/avatar`, formData,{
                    headers: {
                        Authorization: `Bearer ${el}`,
                        'Content-type': 'multipart/form-data',
                    },
                })
                .then((el) => {
                    dispatch({
                        type: ActionTypes.SetAvatar,
                        payload: { statusCode: el.status },
                    });
                }).catch(() => {
                dispatch({ type: ActionTypes.SetAvatar, payload: { statusCode: 423 } });
            });
        });
    }
    public setParam =  (param: string, value: string | number) => async (dispatch: Dispatch<Action>) => {
        await this._useToken(async (el: string | null) => {
            axios
                .post(`http://${apiURL}/settings/${param}`, {
                    parameter: value,
                },{
                    headers: {
                        Authorization: `Bearer ${el}`,
                    },
                })
                .then((el) => {
                    dispatch({
                        type: ActionTypes.SetParam,
                        payload: { statusCode: el.status },
                    });
                }).catch(() => {
                dispatch({ type: ActionTypes.SetAvatar, payload: { statusCode: 423 } });
            });
        })
    }
}

export const settingsImpl = new Settings(apiURL)