import {combineReducers} from "redux";
import {Action, ActionTypes} from "../types/ActionTypes";
import {act} from "react-test-renderer";

export interface Reducers {
    registerReducer: any
    setupReducer:    any
    loginReducer:    any
    meReducer:       any
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
    } else if (action.type === ActionTypes.Clear) {
        return []
    }
    return state
}

function MeReducer(state = [], action: Action) {
    if (action.type === ActionTypes.Me) {
        return action.payload
    }
    return state
}

function MePostsReducer(state = [], action: Action) {
    if (action.type === ActionTypes.MePosts) {
        return action.payload
    }
    return state
}

function StatelessReducers(state = [], action: Action) {
    if (action.type === ActionTypes.Check) {
        return action.payload
    } if (action.type === ActionTypes.AddPost) {
        return action.payload
    } if (action.type === ActionTypes.DeletePost) {
        return action.payload
    } if (action.type === ActionTypes.Logout) {
        return action.payload
    }
    return state
}




export default combineReducers({
   registerReducer: RegisterReducer,
   setupReducer: SetupReducer,
   loginReducer: LoginReducer,
    meReducer: MeReducer,
    mePostsReducer: MePostsReducer,
    checkForConnectionReducer: StatelessReducers,
})