import { Dispatch } from 'redux';
import axios from 'axios';
import { Action, ActionTypes } from '../types/ActionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiURL = '192.168.1.90:8080';

interface ActionMethods {
  register(username: string, email: string, password: string): (dispatch: Dispatch<Action>) => {};
  setup(username: { data: string }, full_name: string, location: string, description: string, gender: string): (dispatch: Dispatch<Action>) => {};
  authorize(username: string, password: string): (dispatch: Dispatch<Action>) => {};
  getMe():(dispatch: Dispatch<Action>) => {};
  getMyPosts(): (dispatch: Dispatch<Action>) => {};
  addPost(caption: string, image: any, type: number): (dispatch: Dispatch<Action>) => {};
  deletePost(hash: string, username: string): (dispatch: Dispatch<Action>) => {};
  checkForConnection(): (dispatch: Dispatch<Action>) => {};
  logout(): (dispatch: Dispatch<Action>) => {};
  getNewsline(page: number): (dispatch: Dispatch<Action>) => {};
  getUser(username: string): (dispatch: Dispatch<Action>) => {};
}

class Actions implements ActionMethods {
 private readonly _serverURL: string;
  constructor(serverURL: string) {
    this._serverURL = serverURL;
  }

  private _useToken = async (callback: Function) => {
    await AsyncStorage.getItem('Access_TOKEN').then((el: string | null) => {
      try {
        if (callback !== void 0 && typeof el === 'string') {
          callback(el);
        }
      } catch (ex) {
        console.log('_useToken ex', ex);
      }
    });
  };
  public clear = () => {
    return {
      type: ActionTypes.Clear,
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
          console.log(el.status, el.data, 1444);
          dispatch({ type: ActionTypes.Register, payload: { statusCode: el.status, data: el.data } });
        });
      console.log('Register', `${apiURL}/register`);
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
          console.log(el.status, el.data, 1444);
          dispatch({ type: ActionTypes.Setup, payload: { statusCode: el.status, data: el.data.data } });
        });
    };

  public authorize = (username: string, password: string) => async (dispatch: Dispatch<Action>) => {
    console.log('asdas');
    axios
      .post(`http://${apiURL}/auth/login`, {
        username: username,
        password: password,
      })
      .then((el) => {
        console.log({ statusCode: el.status, data: el.data.data }, 'login');
        dispatch({ type: ActionTypes.Login, payload: { statusCode: el.status, data: el.data.data } });
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
        });
    });
  };

  public getMyPosts = () => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      console.log(`http://${apiURL}/posts/me`, 'api url');
      axios
        .get(`http://${apiURL}/posts/me`, {
          headers: {
            Authorization: `Bearer ${el}`,
          },
        })
        .then((el) => {
          dispatch({ type: ActionTypes.MePosts, payload: { statusCode: el.status, counter: el.data.counter, data: el.data.data } });
        });
    });
  };

  public addPost = (caption: string, image: any, type: number) => async (dispatch: Dispatch<Action>) => {
    console.log(caption, image, type, 'bebra');
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
        }).catch((el) => {dispatch({ type: ActionTypes.DeletePost, payload: { statusCode: 423 } })});
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
        });
    });
  };

  public getNewsline = (page: number) => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .get(
          `http://${apiURL}/posts/getNewsline?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${el}`,
            },
          }
        )
        .then((el) => {
          dispatch({ type: ActionTypes.NewsLine, payload: el.data });
        });
    });
  };
  public getUser = (username: string) => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
          .get(
              `http://${apiURL}/users/${username}`,
              {
                headers: {
                  Authorization: `Bearer ${el}`,
                },
              }
          )
          .then((el) => {
            dispatch({ type: ActionTypes.User, payload: el.data });
          });
    });
  }
  public makeSubscribe = (ownerId: string) => async (dispatch: Dispatch<Action>) => {
        await this._useToken( async (el: string | null) => {
            axios
                .get(
                    `http://${apiURL}/users/${ownerId}/subscribe`,
                    {
                        headers: {
                            Authorization: `Bearer ${el}`,
                        },
                    }
                )
                .then((el) => {
                    dispatch({ type: ActionTypes.Subscribe, payload: el.data });
                });
        });
  }

  public makeUnfollow = (ownerId: string) => async (dispatch: Dispatch<Action>) => {
      await this._useToken( async (el: string | null) => {
          axios
              .get(
                  `http://${apiURL}/users/${ownerId}/unfollow`,
                  {
                      headers: {
                          Authorization: `Bearer ${el}`,
                      },
                  }
              )
              .then((el) => {
                  dispatch({ type: ActionTypes.Unfollow, payload: el.data });
              });
      });
  }
}

export const actionImpl = new Actions(apiURL);