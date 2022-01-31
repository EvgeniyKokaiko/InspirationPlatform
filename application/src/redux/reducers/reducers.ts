import {combineReducers} from "redux";
import {Action, ActionTypes} from "../types/ActionTypes";
import {act} from "react-test-renderer";

export interface Reducers {
    registerReducer: any
    setupReducer:    any
    loginReducer:    any
    meReducer:       any
}

class ReducersImpl {
    public RegisterReducer(state = [], action: Action) {
        if (action.type === ActionTypes.Register) {
            return action.payload
        } else if (action.type === ActionTypes.Clear) {
            return []
        }
        return state
    }

    public SetupReducer(state = {}, action: Action) {
        if (action.type === ActionTypes.Setup) {
            return action.payload
        }

        return state
    }

    public LoginReducer(state = [], action: Action) {
        if (action.type === ActionTypes.Login) {
            return  action.payload
        } else if (action.type === ActionTypes.Clear) {
            return []
        }
        return state
    }

    public MeReducer(state = [], action: Action) {
        if (action.type === ActionTypes.Me) {
            return action.payload
        } else if (action.type === ActionTypes.Clear) {
            return []
        }
        return state
    }

    public MePostsReducer(state = [], action: Action) {
        if (action.type === ActionTypes.MePosts) {
            return action.payload
        } else if (action.type === ActionTypes.Clear) {
            return []
        }
        return state
    }

    public GetNewsLineReducer(state = [], action: Action) {
        if (action.type === ActionTypes.NewsLine) {
            return [action.payload]
        }
        return state
    }

    public GetMyNewsLineReducer(state = {}, action: Action) {
        if (action.type === ActionTypes.MyNewsLine) {
            return action.payload
        } else if (action.type === ActionTypes.Clear) {
            return []
        }
        return state
    }


    public GetUserData(state = {}, action: Action) {
        if (action.type === ActionTypes.User) {
            return {...action.payload}
        }
        return state;
    }

    public StatelessReducers(state = {}, action: Action) {
        if (action.type === ActionTypes.Check) {
            return action.payload
        } if (action.type === ActionTypes.AddPost) {
            return action.payload
        }  if (action.type === ActionTypes.SetAvatar) {
            return action.payload
        } if (action.type === ActionTypes.SetParam) {
            return action.payload
        }
        return state
    }

    public LogoutReducer(state = {}, action: Action) {
        if (action.type === ActionTypes.Logout) {
            return action.payload
        }
        return state
    }

    public PostDeleteReducer(state = {statusCode: 0}, action: Action) {
        if (action.type === ActionTypes.DeletePost) {
            return action.payload
        }
        return state
    }

    public MakeSubscribeReducer(state = {statusCode: 0}, action: Action) {
        if (action.type === ActionTypes.Subscribe) {
            return action.payload
        } if (action.type === ActionTypes.Clear) {
            return {statusCode: 0}
        }
        return state
    }

    public MakeUnfollowReducer(state = {statusCode: 0}, action: Action) {
        if (action.type === ActionTypes.Unfollow) {
            return action.payload
        }
        return state
    }

    public RequestListReducer(state = {}, action: Action) {
        if (action.type === ActionTypes.RequestList) {
            console.log(action.payload, "PAYLOAD")
            return action.payload
        } else if (action.type === ActionTypes.Clear) {
            return {};
        }
        return state
    }

    public CurrentRequestStatus(state = {}, action: Action) {
        if (action.type === ActionTypes.AcceptOrDeclineRequest) {
            console.log(action.payload, "PAYLOAD")
            return action.payload
        }
        return state
    }



    public getAllReducers = () => {
        return combineReducers({
            registerReducer: this.RegisterReducer,
            setupReducer: this.SetupReducer,
            loginReducer: this.LoginReducer,
            meReducer: this.MeReducer,
            mePostsReducer: this.MePostsReducer,
            checkForConnectionReducer: this.StatelessReducers,
            getNewsLineReducer: this.GetNewsLineReducer,
            GetMyNewsLineReducer: this.GetMyNewsLineReducer,
            getUserDataReducer: this.GetUserData,
            postDelete: this.PostDeleteReducer,
            subscribeReducer: this.MakeSubscribeReducer,
            unfollowReducer: this.MakeUnfollowReducer,
            requestListReducer: this.RequestListReducer,
            currentRequestStatus: this.CurrentRequestStatus,
            logoutReducer: this.LogoutReducer,
        })
    }
}

const reducers = new ReducersImpl();
export default reducers.getAllReducers()
