import { combineReducers } from 'redux';
import { Action, ActionTypes } from '../types/ActionTypes';
import { Comment, PlainMessage } from '../../Types/Models';
import { MessageStatus } from '../../Types/enums';
import { homeEntityProps, HomePostEntity } from '../../BLL/entity/HomePostEntity';
import { MessageStorage } from '../../BLL/MessageStorage';
import { Alert } from 'react-native';

export interface Reducers {
  registerReducer: any;
  setupReducer: any;
  loginReducer: any;
  meReducer: any;
}

const emptyReducerObj = {
  statusMessage: 'Nothing',
  statusCode: 0,
  data: {},
};

const emptyReducerArray = {
  statusMessage: 'Nothing',
  statusCode: 0,
  data: [],
};

export interface Store {
  meReducer: any;
  mePostsReducer: any;
  checkForConnectionReducer: any;
  getNewsLineReducer: any;
  GetMyNewsLineReducer: any;
  getUserDataReducer: any;
  postDelete: any;
  subscribeReducer: any;
  unfollowReducer: any;
  requestListReducer: any;
  currentRequestStatus: any;
  logoutReducer: any;
  setParamReducer: any;
  followerListReducer: any;
  getMessagesReducer: any;
  getTokenReducer: any;
  getPostWithLikesReducer: any;
  searchUserByNameReducer: any;
  commentsReducer: any;
  notificationsReducer: any;
}

class ReducersImpl {
  public async GetTokenReducer(state = '', action: Action) {
    if (action.type === ActionTypes.GetToken) {
      return action.payload;
    }
    return state;
  }

  public MeReducer(state = {}, action: Action) {
    if (action.type === ActionTypes.Me) {
      return action.payload;
    } else if (action.type === ActionTypes.Clear) {
      return [];
    }
    return state;
  }

  public MePostsReducer(state: any = {}, action: Action) {
    if (action.type === ActionTypes.MePosts) {
      if (action.payload.statusCode === 200) {
        const entities = action.payload.data.map((el: homeEntityProps) => {
          return new HomePostEntity({ ...el });
        });
        return {
          statusCode: action.payload.statusCode,
          data: entities,
        };
      }
    } else if (action.type === ActionTypes.Clear) {
      return [];
    }
    return state;
  }

  public GetNewsLineReducer(state = [], action: Action) {
    if (action.type === ActionTypes.NewsLine) {
      return [action.payload];
    }
    return state;
  }

  public GetMyNewsLineReducer(
    state: any = {
      isModify: 0,
    },
    action: Action
  ) {
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
          statusMessage: 'Closed!',
          data: [],
        };
      }
      const rawData: homeEntityProps[] = action.payload.data;
      rawData.forEach((homePost: homeEntityProps) => {
        const newHomePost = new HomePostEntity(homePost);
        result.data.push(newHomePost);
      });
      return result;
    } else if (action.type === ActionTypes.Clear) {
      return {
        isModify: state.isModify + 1,
        pages: 0,
        statusCode: 0,
        statusMessage: '',
        data: [],
      };
    }
    return {
      isModify: 0,
      pages: 0,
      statusCode: 0,
      statusMessage: '',
      data: state,
    };
  }

  public GetUserData(state: any = {}, action: Action) {
    if (action.type === ActionTypes.User) {
      const posts = action.payload.data?.userPosts;
      let entities = [];
      if (Array.isArray(posts)) {
        entities = action.payload.data?.userPosts.map((el: homeEntityProps) => {
          return new HomePostEntity({ ...el });
        });
      }
      const ls = action.payload.data;
      return {
        data: {
          counts: {
            owner_count: ls?.counts?.owner_count,
            subscriber_count: ls?.counts?.subscriber_count,
          },
          isPrivate: ls?.isPrivate,
          isSubscribe: ls?.isSubscribe,
          isSubscribed: ls?.isSubscribed,
          userData: ls?.userData,
          userPosts: entities,
        },
      };
    }
    return state;
  }

  public StatelessReducers(state = {}, action: Action) {
    if (action.type === ActionTypes.Check) {
      return action.payload;
    }
    if (action.type === ActionTypes.AddPost) {
      return action.payload;
    }
    if (action.type === ActionTypes.SetAvatar) {
      return action.payload;
    }
    return state;
  }

  public SetParamReducer(state = {}, action: Action) {
    if (action.type === ActionTypes.SetParam) {
      return action.payload;
    }
    return {};
  }

  public LogoutReducer(state = {}, action: Action) {
    if (action.type === ActionTypes.Logout) {
      return action.payload;
    }
    return state;
  }

  public PostDeleteReducer(state = { statusCode: 0 }, action: Action) {
    if (action.type === ActionTypes.DeletePost) {
      return action.payload;
    }
    return state;
  }

  public MakeSubscribeReducer(state = { statusCode: 0 }, action: Action) {
    if (action.type === ActionTypes.Subscribe) {
      return action.payload;
    }
    if (action.type === ActionTypes.Clear) {
      return { statusCode: 0 };
    }
    return state;
  }

  public MakeUnfollowReducer(state = { statusCode: 0 }, action: Action) {
    if (action.type === ActionTypes.Unfollow) {
      return action.payload;
    }
    return state;
  }

  public RequestListReducer(state = {}, action: Action) {
    if (action.type === ActionTypes.RequestList) {
      return action.payload;
    } else if (action.type === ActionTypes.Clear) {
      return {};
    }
    return state;
  }

  public FollowerListReducer(state = {}, action: Action) {
    if (action.type === ActionTypes.Following) {
      return action.payload;
    } else if (action.type === ActionTypes.ClearFollowing) {
      return {};
    }
    return state;
  }

  public CurrentRequestStatus(state = {}, action: Action) {
    if (action.type === ActionTypes.AcceptOrDeclineRequest) {
      return action.payload;
    }
    return state;
  }

  public GetPostWithLikesReducer(state: any = {}, action: Action) {
    if (action.type === ActionTypes.GetPost) {
      if (action.payload.statusCode === 200) {
        const newPostEntity = new HomePostEntity({ ...(action.payload.data || {}) });
        return {
          isModify: state.isModify + 1 || 1,
          statusCode: action.payload.statusCode,
          statusMessage: action.payload.statusMessage,
          data: newPostEntity as HomePostEntity,
        };
      } else {
        return {
          isModify: state.isModify + 1 || 1,
          statusCode: action.payload.statusCode,
          statusMessage: action.payload.statusMessage,
          data: {},
        };
      }
    }
    return {
      isModify: 0,
      statusCode: 0,
      statusMessage: '',
      data: {},
    };
  }
  //rename to messageReducer!
  public GetMessagesReducer(
    state: {
      isModify: number;
      statusCode: number;
      statusMessage: string;
      data: MessageStorage;
      isMessageUpdate: number;
      totalPages: number;
      pageSize: number;
      pageIndex: number;
    } = {
      isModify: 0,
      statusCode: 0,
      statusMessage: '',
      data: new MessageStorage(),
      isMessageUpdate: 0,
      totalPages: 0,
      pageSize: 0,
      pageIndex: 0,
    },
    action: Action
  ) {
    if (action.type === ActionTypes.U2UMessages) {
      const storage = new MessageStorage();
      const messageProps: PlainMessage[] = action.payload.data.items;
      if (!Array.isArray(messageProps)) {
        return {
          isModify: 0,
          statusCode: action.payload.statusCode,
          statusMessage: action.payload.statusMessage,
          data: new MessageStorage(),
          totalPages: 0,
          pageSize: 0,
          pageIndex: 0,
        };
      }
      storage.init(messageProps);
      return {
        isModify: 0,
        statusCode: action.payload.statusCode,
        statusMessage: action.payload.statusMessage,
        data: storage,
        isMessageUpdate: 0,
        totalPages: action.payload.data.totalPages,
        pageSize: action.payload.data.pageSize,
        pageIndex: action.payload.data.pageIndex,
      };
    } else if (action.type === ActionTypes.U2UMessagesPage) {
      const isValidMessages = action.payload.statusCode === 200 && Array.isArray(action.payload.data.items);
      if (isValidMessages) {
        state.data.addToEnd(action.payload.data.items);
      }
      return {
        isModify: isValidMessages ? state.isModify + 1 : state.isModify,
        statusCode: isValidMessages ? 200 : 400,
        statusMessage: 'OK!',
        data: state.data,
        isMessageUpdate: 0,
        totalPages: isValidMessages ? action.payload.data.totalPages : state.totalPages,
        pageSize: isValidMessages ? action.payload.data.pageSize : state.pageSize,
        pageIndex: isValidMessages ? action.payload.data.pageIndex : state.pageIndex,
      };
    } else if (action.type === ActionTypes.AddFakeMessage) {
      if (state.data instanceof MessageStorage) {
        state.data.add(action.payload);
      }
      return {
        isModify: (state.isModify += 1),
        statusCode: 200,
        statusMessage: 'OK!',
        data: state.data,
        isMessageUpdate: 0,
        totalPages: state.totalPages,
        pageSize: state.pageSize,
        pageIndex: state.pageIndex,
      };
    } else if (action.type === ActionTypes.SetNewStatus) {
      if (state.data instanceof MessageStorage) {
        const index = state.data.get(action.payload.message_hash);
        state.data.update(index, 'status', action.payload.status);
      }
      return {
        isModify: state.isModify,
        statusCode: 200,
        statusMessage: 'OK!',
        data: state.data,
        isMessageUpdate: state.isMessageUpdate + 1,
        totalPages: state.totalPages,
        pageSize: state.pageSize,
        pageIndex: state.pageIndex,
      };
    } else if (action.type === ActionTypes.SetAllReadMessages) {
      if (!(state.data instanceof MessageStorage) || action.payload.type !== 0) {
        return {
          isModify: state.isModify,
          statusCode: 200,
          statusMessage: 'OK!',
          data: state.data,
          totalPages: state.totalPages,
          pageSize: state.pageSize,
          pageIndex: state.pageIndex,
        };
      } else {
        if (state.data instanceof MessageStorage) {
          state.data.updateAll('status', MessageStatus.SentToServer, MessageStatus.ReadByUser);
        }
      }
      return {
        isModify: state.isModify,
        statusCode: 200,
        statusMessage: 'OK!',
        data: state.data,
        isMessageUpdate: state.isMessageUpdate + 1,
        totalPages: state.totalPages,
        pageSize: state.pageSize,
        pageIndex: state.pageIndex,
      };
    } else if (action.type === ActionTypes.ClearMessages) {
      return {
        isModify: 0,
        statusCode: 0,
        statusMessage: '',
        data: new MessageStorage(),
        isMessageUpdate: 0,
        totalPages: 0,
        pageSize: 0,
        pageIndex: 0,
      };
    }
    return state;
  }

  private SearchUserByNameReducer(state: any = {}, action: Action) {
    if (action.type === ActionTypes.SearchUser) {
      return action.payload;
    }
    return state;
  }

  private CommentsReducer(
    state: { statusCode: number; statusMessage: string; data: Array<Comment>; isModify: number } = {
      statusCode: 0,
      statusMessage: '',
      data: [],
      isModify: 0,
    },
    action: Action
  ) {
    switch (action.type) {
      case ActionTypes.GetComments:
        return { ...action.payload, isModify: state.isModify + 1 };
      case ActionTypes.CreateComment:
        if (action.payload.statusCode === 200 && typeof action.payload.data === 'object') {
          state.data.push(action.payload.data);
          return { ...state, isModify: state.isModify + 1 };
        }
        return state;
      case ActionTypes.RemoveComment:
        if (action.payload.statusCode === 200) {
          const items = state.data.filter((item) => item.comment_hash !== action.payload.comment_hash);
          return { ...state, data: items };
        }
        return state;
      case ActionTypes.UpdateComment:
        if (action.payload.statusCode === 200) {
          const index = state.data.findIndex((comment) => comment.comment_hash == action.payload.comment_hash);
          if (index !== -1 && state.data.at(index) !== void 0) {
            state.data.at(index)!.comment_string = action.payload.body.comment;
            return { ...state, isModify: state.isModify + 1 };
          }
          return state;
        }
        break;
      case ActionTypes.ClearComments:
        const initialState = {
          statusCode: 200,
          statusMessage: '',
          data: [],
          isModify: 0,
        };
        return { ...initialState };
    }
    return state;
  }

  public GetNotificationsReducer(state = emptyReducerArray, action: Action) {
    if (action.type === ActionTypes.GetNotifications) {
      if (action.payload && action.payload.statusCode === 200) {
        return {
          statusCode: action.payload?.statusCode || 0,
          statusMessage: action.payload?.statusMessage || '',
          data: action.payload?.data || [],
        };
      } else {
        Alert.alert('Notifications', 'Something went wrong :(');
        return state;
      }
    }
    return state;
  }

  public getAllReducers = () => {
    return combineReducers({
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
      getPostWithLikesReducer: this.GetPostWithLikesReducer,
      searchUserByNameReducer: this.SearchUserByNameReducer,
      commentsReducer: this.CommentsReducer,
      notificationsReducer: this.GetNotificationsReducer,
    });
  };
}

const reducers = new ReducersImpl();
export default reducers.getAllReducers();
