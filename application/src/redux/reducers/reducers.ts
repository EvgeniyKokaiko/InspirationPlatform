import {combineReducers} from "redux";
import {Action, ActionTypes, ClassicPayload} from "../types/ActionTypes";
import {act} from "react-test-renderer";
import {PlainMessage} from "../../Types/Models";
import {MessageEntity} from "../../BLL/entity/MessageEntity";
import {MessageStatus} from "../../Types/enums";
import { homeEntityProps, HomePostEntity } from "../../BLL/entity/HomePostEntity";

export interface Reducers {
    registerReducer: any
    setupReducer:    any
    loginReducer:    any
    meReducer:       any
}

class ReducersImpl {

    public async GetTokenReducer(state = "", action: Action) {
        if (action.type === ActionTypes.GetToken) {

            return action.payload
        }
        return state
    }

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

    public GetMyNewsLineReducer(state: any = {
        isModify: 0,
    }, action: Action) {
        if (action.type === ActionTypes.MyNewsLine) {
            const result = {
                isModify: state.isModify + 1,
                pages: action.payload.pages,
                statusCode: action.payload.statusCode,
                statusMessage: action.payload.statusMessage,
                data: [] as HomePostEntity[],
            };
            if (action.payload === void 0 || !Array.isArray(action.payload.data)) {
                return {
                    isModify: 0,
                    pages: 0,
                    statusCode: 402,
                    statusMessage: "Closed!",
                    data: [],
                };
            }
            const rawData: homeEntityProps[] = action.payload.data;
            rawData.forEach((homePost: homeEntityProps) => {
                const newHomePost = new HomePostEntity(homePost)
                result.data.push(newHomePost);
            })
            return result;
        } else if (action.type === ActionTypes.LikePost) {
                if (action.payload.statusCode !== 200) {
                    return state
                }
                state.data.forEach((el: HomePostEntity) => {
                    if (el.image === action.payload.data.post_hash) {
                        if (action.payload.data.is_like) {
                            el.likesCount = el.likesCount + 1;
                            el.post_hash = action.payload.post_hash;
                        } else {
                            el.likesCount = el.likesCount - 1;
                            el.post_hash = null;
                        }
                    }
                })
            return state;
        } else if (action.type === ActionTypes.Clear) {
            return {
                isModify: state.isModify + 1,
                pages: 0,
                statusCode: 0,
                statusMessage: '',
                data: [],
            }
        }
        return {
            isModify: 0,
            pages: 0,
            statusCode: 0,
            statusMessage: '',
            data: state,
        }
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
        }
        return state
    }

    public SetParamReducer(state = {}, action: Action) {
        if (action.type === ActionTypes.SetParam) {
            return action.payload
        }
        return {}
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

            return action.payload
        } else if (action.type === ActionTypes.Clear) {
            return {};
        }
        return state
    }

    public FollowerListReducer(state = {}, action: Action) {
        if (action.type === ActionTypes.Following) {
            return action.payload
        } else if (action.type === ActionTypes.ClearFollowing) {
            return {};
        }
        return state
    }

    public CurrentRequestStatus(state = {}, action: Action) {
        if (action.type === ActionTypes.AcceptOrDeclineRequest) {
            return action.payload
        }
        return state
    }


    public GetMessagesReducer(state: any = {}, action: Action) {
        if (action.type === ActionTypes.U2UMessages) {
            const Messages: MessageEntity[] = [];
           const messageProps: PlainMessage[] = action.payload.data
            if (!Array.isArray(messageProps)) {
                return {
                    isModify: 0,
                    statusCode: action.payload.statusCode,
                    statusMessage: action.payload.statusMessage,
                    data: [],
                }
            }
            messageProps.forEach((el) => {
                const newMessage = new MessageEntity({
                    message_hash: el.message_hash as string,
                    type: el.type,
                    plain_message: el.plain_message,
                    created_at: new Date(el.created_at).toString(),
                    sender: el.sender,
                    status: el.status,
                    companion: el.companion,
                })
                Messages.push(newMessage)
            })
               return {
                isModify: 0,
                statusCode: action.payload.statusCode,
                statusMessage: action.payload.statusMessage,
                data: Messages,
               }
        } else if (action.type === ActionTypes.AddFakeMessage) {
            console.log(action.payload, state ,'new mess')
            return {
                isModify: state.isModify += 1,
                statusCode: 200,
                statusMessage: "OK!",
                data: [...state.data, action.payload],
            }
        } else if (action.type === ActionTypes.SetNewStatus) {
            const index = (<MessageEntity[]>state.data).findIndex(el => el.message_hash === action.payload.message_hash)
            if (index !== -1) {
                (<MessageEntity[]>state.data)[index].status = action.payload.status;
            }
            return {
                isModify: state.isModify,
                statusCode: 200,
                statusMessage: "OK!",
                data: [...state.data],
            }
        } else if (action.type === ActionTypes.SetAllReadMessages) {
            console.log('updated statuses')
            console.log(state, state.data === void 0, !Array.isArray(state.data), action.payload)
            if (state.data === void 0 || !Array.isArray(state.data) || action.payload.type !== 0) {
                    return {
                        isModify: state.isModify,
                        statusCode: 200,
                        statusMessage: "OK!",
                        data: [...state.data],
                    }  
            } else {
                state.data.forEach((el: MessageEntity) => {
                    console.log("item, el")
                        if (el.status === MessageStatus.SentToServer) {
                            el.status = MessageStatus.ReadByUser;
                        }
                })
            }
            return {
                isModify: state.isModify,
                statusCode: 200,
                statusMessage: "OK!",
                data: [...state.data],
            } 
        } else if (action.type === ActionTypes.ClearMessages) {
            return {
                isModify: state.isModify += 1,
                statusCode: 0,
                statusMessage: "!",
                data: [],
            }
        }
        return {
            statusCode: 0,
            statusMessage: "!",
            data: state.data,
        }
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
            setParamReducer: this.SetParamReducer,
            followerListReducer: this.FollowerListReducer,
            getMessagesReducer: this.GetMessagesReducer,
            getTokenReducer: this.GetTokenReducer,
        })
    }
}

const reducers = new ReducersImpl();
export default reducers.getAllReducers()
