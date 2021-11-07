import {Dispatch} from "redux";
import axios from "axios"
import {Action, ActionTypes} from "../types/ActionTypes";

const apiUrl = "192.168.1.80:8080";

export const Register = (username: string, email: string, password: string) => async (dispatch: Dispatch<Action>) => {
    try {
       const response = await axios.post(`http://${apiUrl}/auth/register`, {
           username,
           email,
           password,
       });
        console.log("Register", `${apiUrl}/register`)
        dispatch({type: ActionTypes.Register, payload: response})
    } catch (ex) {
        console.log("register ex", ex)
    }
}


