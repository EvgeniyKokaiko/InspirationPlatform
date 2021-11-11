import {combineReducers} from "redux";
import {Action, ActionTypes} from "../types/ActionTypes";

export interface Reducers {
    registerReducer: any
    setupReducer:    any
    loginReducer:    any
}

function RegisterReducer(state = [], action: Action) {
   if (action.type === ActionTypes.Register) {
    return action.payload
   } else if (action.type === ActionTypes.Clear) {
       return []
   }
   return state
}

function SetupReducer(state = [], action: Action) {
    if (action.type === ActionTypes.Setup) {
        return action.payload
    } else if (action.type === ActionTypes.Clear) {
        return []
    }

    return state
}

function LoginReducer(state = [], action: Action) {
    if (action.type === ActionTypes.Login) {
       return  action.payload
    }
    return state
}


export default combineReducers({
   registerReducer: RegisterReducer,
   setupReducer: SetupReducer,
   loginReducer: LoginReducer,
})