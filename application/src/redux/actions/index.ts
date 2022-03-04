import { Dispatch } from 'redux';
import axios from 'axios';
import { Action, ActionTypes } from '../types/ActionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseAction } from './BaseAction';

export const apiURL = '192.168.1.160:8080';

interface ActionMethods {
  register(username: string, email: string, password: string): (dispatch: Dispatch<Action>) => {};
  setup(username: { data: string }, full_name: string, location: string, description: string, gender: string): (dispatch: Dispatch<Action>) => {};
  authorize(username: string, password: string): (dispatch: Dispatch<Action>) => {};
  getMe(): (dispatch: Dispatch<Action>) => {};
  getMyPosts(): (dispatch: Dispatch<Action>) => {};
  addPost(caption: string, image: any, type: number): (dispatch: Dispatch<Action>) => {};
  deletePost(hash: string, username: string): (dispatch: Dispatch<Action>) => {};
  checkForConnection(): (dispatch: Dispatch<Action>) => {};
  logout(): (dispatch: Dispatch<Action>) => {};
  getNewsline(page: number): (dispatch: Dispatch<Action>) => {};
  getUser(username: string): (dispatch: Dispatch<Action>) => {};
}

class Actions extends BaseAction implements ActionMethods {
  constructor(serverURL: string) {
    super(serverURL);
  }

  public clear = () => {
    return {
      type: ActionTypes.Clear,
    };
  };

  public ClearFollowing = () => {
    return {
      type: ActionTypes.ClearFollowing,
    };
  };

  public register = (username: string, email: string, password: string) => async (dispatch: Dispatch<Action>) => {
    try {
      axios
        .post(`http://${apiURL}/auth/register`, {
          username,
          email,
          password,
        })
        .then((el) => {
          dispatch({ type: ActionTypes.Register, payload: { statusCode: el.status, data: el.data } });
        })
        .catch(() => {
          dispatch({ type: ActionTypes.Register, payload: { statusCode: 423 } });
        });
    } catch (ex) {
      console.log('register ex', ex);
    }
  };

  public setup =
    (username: { data: string }, full_name: string, location: string, description: string, gender: string) => async (dispatch: Dispatch<Action>) => {
      axios
        .post(`http://${apiURL}/auth/setup`, {
          username: username.data,
          full_name: full_name,
          location: location,
          description: description,
          gender: gender,
        })
        .then((el) => {
          dispatch({ type: ActionTypes.Setup, payload: { statusCode: el.data.statusCode } });
        })
        .catch(() => {
          dispatch({ type: ActionTypes.Setup, payload: { statusCode: 423 } });
        });
    };

  public authorize = (username: string, password: string) => async (dispatch: Dispatch<Action>) => {
    axios
      .post(`http://${apiURL}/auth/login`, {
        username: username,
        password: password,
      })
      .then((el) => {
        dispatch({ type: ActionTypes.Login, payload: { statusCode: el.status, data: el.data.data } });
      })
      .catch(() => {
        dispatch({ type: ActionTypes.Login, payload: { statusCode: 423 } });
      });
  };

  public getMe = () => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .get(`http://${apiURL}/users/me`, {
          headers: {
            Authorization: `Bearer ${el}`,
          },
        })
        .then((el) => {
          dispatch({
            type: ActionTypes.Me,
            payload: { statusCode: el.status, data: el.data.data, avatar: el.data.avatar },
          });
        })
        .catch((el) => {
          dispatch({ type: ActionTypes.Me, payload: { statusCode: 423 } });
        });
    });
  };

  public getMyPosts = () => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .get(`http://${apiURL}/posts/me`, {
          headers: {
            Authorization: `Bearer ${el}`,
          },
        })
        .then((el) => {
          dispatch({ type: ActionTypes.MePosts, payload: { statusCode: el.status, counter: el.data.counter, data: el.data.data } });
        })
        .catch((el) => {
          dispatch({ type: ActionTypes.MePosts, payload: { statusCode: 423 } });
        });
    });
  };

  public addPost = (caption: string, image: any, type: number) => async (dispatch: Dispatch<Action>) => {
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('type', type);
    // formData.append('date_of_creation', `2021-12-05`); //TODO реализовать добавление текущей даты
    for (let i = 0; i < image.length; i++) {
      formData.append('image', {
        uri: image[i].uri,
        name: image[i].fileName,
        type: image[i].type,
      });
    }
    await this._useToken(async (el: string | null) => {
      axios
        .post(`http://${apiURL}/posts/add`, formData, {
          headers: {
            Authorization: `Bearer ${el}`,
            'Content-type': 'multipart/form-data',
          },
        })
        .then((el) => {
          dispatch({ type: ActionTypes.AddPost, payload: { statusCode: el.status } });
        })
        .catch((el) => {
          dispatch({ type: ActionTypes.AddPost, payload: { statusCode: 423 } });
        });
    });
  };

  public deletePost = (hash: string, username: string) => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .post(
          `http://${apiURL}/posts/delete`,
          { hash, username },
          {
            headers: {
              Authorization: `Bearer ${el}`,
            },
          }
        )
        .then((el) => {
          dispatch({ type: ActionTypes.DeletePost, payload: { statusCode: el.status } });
        })
        .catch(() => {
          dispatch({ type: ActionTypes.DeletePost, payload: { statusCode: 423 } });
        });
    });
  };

  public checkForConnection = () => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .get(`http://${apiURL}/users/check`, {
          headers: {
            Authorization: `Bearer ${el}`,
          },
        })
        .then((el) => {
          dispatch({ type: ActionTypes.Check, payload: { statusCode: el.status } });
        })
        .catch(() => {
          dispatch({ type: ActionTypes.Check, payload: { statusCode: 423 } });
        });
    });
  };

  public logout = () => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .get(`http://${apiURL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${el}`,
          },
        })
        .then((el) => {
          dispatch({ type: ActionTypes.Logout, payload: { statusCode: el.status } });
        })
        .catch(() => {
          dispatch({ type: ActionTypes.Logout, payload: { statusCode: 423 } });
        });
    });
  };

  public getNewsline = (page: number) => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .get(`http://${apiURL}/posts/getNewsline?page=${page}`, {
          headers: {
            Authorization: `Bearer ${el}`,
          },
        })
        .then((el) => {
          dispatch({ type: ActionTypes.NewsLine, payload: el.data });
        })
        .catch(() => {
          dispatch({ type: ActionTypes.NewsLine, payload: { statusCode: 423 } });
        });
    });
  };
  public getMyNewsLine = (page: number) => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .get(`http://${apiURL}/posts/getMyNewsLine?page=${page}`, {
          headers: {
            Authorization: `Bearer ${el}`,
          },
        })
        .then((el) => {
          dispatch({ type: ActionTypes.MyNewsLine, payload: el.data });
        })
        .catch(() => {
          dispatch({ type: ActionTypes.MyNewsLine, payload: { statusCode: 423 } });
        });
    });
  };

  public getUser = (username: string) => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .get(`http://${apiURL}/users/${username}`, {
          headers: {
            Authorization: `Bearer ${el}`,
          },
        })
        .then((el) => {
          dispatch({ type: ActionTypes.User, payload: el.data });
        })
        .catch(() => {
          dispatch({ type: ActionTypes.User, payload: { statusCode: 423 } });
        });
    });
  };
  public makeSubscribe = (ownerId: string) => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .get(`http://${apiURL}/users/${ownerId}/subscribe`, {
          headers: {
            Authorization: `Bearer ${el}`,
          },
        })
        .then((el) => {
          dispatch({ type: ActionTypes.Subscribe, payload: el.data });
        })
        .catch(() => {
          dispatch({ type: ActionTypes.Subscribe, payload: { statusCode: 423 } });
        });
    });
  };

  public makeUnfollow = (ownerId: string) => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .get(`http://${apiURL}/users/${ownerId}/unfollow`, {
          headers: {
            Authorization: `Bearer ${el}`,
          },
        })
        .then((el) => {
          dispatch({ type: ActionTypes.Unfollow, payload: el.data });
        })
        .catch(() => {
          dispatch({ type: ActionTypes.Unfollow, payload: { statusCode: 423 } });
        });
    });
  };
  public getRequestList = () => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .get(`http://${apiURL}/users/requestList`, {
          headers: {
            Authorization: `Bearer ${el}`,
          },
        })
        .then((el) => {
          dispatch({ type: ActionTypes.RequestList, payload: el.data });
        })
        .catch(() => {
          dispatch({ type: ActionTypes.RequestList, payload: { statusCode: 423 } });
        });
    });
  };

  public acceptOrDeclineRequest = (status: boolean, owner: string) => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .post(
          `http://${apiURL}/users/${owner}/acceptRequest`,
          { status },
          {
            headers: {
              Authorization: `Bearer ${el}`,
            },
          }
        )
        .then((el) => {
          dispatch({ type: ActionTypes.AcceptOrDeclineRequest, payload: el.data });
        })
        .catch(() => {
          dispatch({ type: ActionTypes.AcceptOrDeclineRequest, payload: { statusCode: 423 } });
        });
    });
  };

  public getFollowerList = (userId: string, listType: number) => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .get(`http://${apiURL}/users/${userId}/${listType === 1 ? 'following' : 'followers'}`, {
          headers: {
            Authorization: `Bearer ${el}`,
          },
        })
        .then((el) => {
          dispatch({ type: ActionTypes.Following, payload: el.data });
        })
        .catch(() => {
          dispatch({ type: ActionTypes.Following, payload: { statusCode: 423 } });
        });
    });
  };
  public getMessages = (companion: string) => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .get(`http://${apiURL}/messaging/get-messages/${companion}`, {
          headers: {
            Authorization: `Bearer ${el}`,
          },
        })
        .then((el) => {
          console.log(el.data, 'messages response');
          dispatch({ type: ActionTypes.U2UMessages, payload: el.data });
        })
        .catch((err) => {
          console.log(err, 'messages response error');
          dispatch({ type: ActionTypes.U2UMessages, payload: { statusCode: 423 } });
        });
    });
  };
}

export const actionImpl = new Actions(apiURL);
