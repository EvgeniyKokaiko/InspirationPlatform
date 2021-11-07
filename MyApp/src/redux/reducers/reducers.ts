import {combineReducers} from "redux";
import {Action, ActionTypes} from "../types/ActionTypes";



function RegisterReducer(state = [], action: Action) {
   if (action.type === ActionTypes.Register) {
    return [...state, action.payload]
   }

   return state
}

export default combineReducers({
   registerReducer: RegisterReducer
})