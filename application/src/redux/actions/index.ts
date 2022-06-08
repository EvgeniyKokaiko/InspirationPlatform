import { Dispatch } from 'redux';
import axios from 'axios';
import { Action, ActionTypes } from '../types/ActionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseAction } from './BaseAction';
//90 - 92 = MAC OS
export const apiURL = '192.168.1.90:8080';

interface ActionMethods {
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

  public ClearComments = () => {
    return {
      type: ActionTypes.ClearComments,
    };
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
        .catch((ex) => {
          dispatch({ type: ActionTypes.User, payload: { statusCode: 423, statusMessage: ex } });
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

  public getMessages =
    (companion: string, page: number | string, isInit: boolean = false) =>
    async (dispatch: Dispatch<Action>) => {
      await this._useToken(async (el: string | null) => {
        axios
          .get(`http://${apiURL}/messaging/get-messages/${companion}?page=${page}&init=${isInit}`, {
            headers: {
              Authorization: `Bearer ${el}`,
            },
          })
          .then((el) => {
            console.log(el.data, 'messages response');
            dispatch({ type: isInit ? ActionTypes.U2UMessages : ActionTypes.U2UMessagesPage, payload: el.data });
          })
          .catch((err) => {
            console.log(err, 'messages response error');
            dispatch({ type: isInit ? ActionTypes.U2UMessages : ActionTypes.U2UMessagesPage, payload: { statusCode: 423 } });
          });
      });
    };

  public likePost = (imageHash: string, owner: string, type: string) => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .get(`http://${apiURL}/likes/${owner}/${imageHash}/like`, {
          headers: {
            Authorization: `Bearer ${el}`,
          },
        })
        .then((el) => {
          console.log(el.data, 'messages response');
          dispatch({ type: type, payload: el.data });
        })
        .catch((err) => {
          console.log(err, 'messages response error');
          dispatch({ type: type, payload: { statusCode: 423 } });
        });
    });
  };
  public getPostWithLikesAndSub = (imageHash: string) => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .get(`http://${apiURL}/posts/getPost/${imageHash}`, {
          headers: {
            Authorization: `Bearer ${el}`,
          },
        })
        .then((el) => {
          dispatch({ type: ActionTypes.GetPost, payload: el.data });
        })
        .catch((err) => {
          console.log(err, 'messages response error');
          dispatch({ type: ActionTypes.GetPost, payload: { statusCode: 423 } });
        });
    });
  };
  public searchUserByName = (searchVal: string) => async (dispatch: Dispatch<Action>) => {
    axios
      .put(`http://${apiURL}/search/search_user?search=${searchVal}`)
      .then((el) => {
        dispatch({ type: ActionTypes.SearchUser, payload: el.data });
      })
      .catch((err) => {
        console.log(err, 'messages response error');
        dispatch({ type: ActionTypes.SearchUser, payload: { statusCode: 423 } });
      });
  };

  public getComments = (post_hash: string) => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .get(`http://${apiURL}/comments/${post_hash}/get`, {
          headers: {
            Authorization: `Bearer ${el}`,
          },
        })
        .then((el) => {
          dispatch({ type: ActionTypes.GetComments, payload: el.data });
        })
        .catch((err) => {
          console.log(err, 'messages response error');
          dispatch({ type: ActionTypes.GetComments, payload: { statusCode: 423 } });
        });
    });
  };

  public addComment = (post_hash: string, body: { comment: string }) => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .post(`http://${apiURL}/comments/${post_hash}/add`, body, {
          headers: {
            Authorization: `Bearer ${el}`,
          },
        })
        .then((el) => {
          dispatch({ type: ActionTypes.CreateComment, payload: el.data });
        })
        .catch((err) => {
          console.log(err, 'messages response error');
          dispatch({ type: ActionTypes.CreateComment, payload: { statusCode: 423 } });
        });
    });
  };

  public deleteComment = (post_hash: string, comment_hash: string) => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .delete(`http://${apiURL}/comments/${post_hash}/${comment_hash}/delete`, {
          headers: {
            Authorization: `Bearer ${el}`,
          },
        })
        .then((el) => {
          dispatch({ type: ActionTypes.RemoveComment, payload: { ...el.data, comment_hash: comment_hash } });
        })
        .catch((err) => {
          console.log(err, 'messages response error');
          dispatch({ type: ActionTypes.RemoveComment, payload: { statusCode: 423 } });
        });
    });
  };

  public updateComment = (post_hash: string, comment_hash: string, body: { comment: string }) => async (dispatch: Dispatch<Action>) => {
    await this._useToken(async (el: string | null) => {
      axios
        .put(`http://${apiURL}/comments/${post_hash}/${comment_hash}/update`, body, {
          headers: {
            Authorization: `Bearer ${el}`,
          },
        })
        .then((el) => {
          dispatch({ type: ActionTypes.UpdateComment, payload: { body, comment_hash, ...el.data } });
        })
        .catch((err) => {
          console.log(err, 'messages response error');
          dispatch({ type: ActionTypes.UpdateComment, payload: { statusCode: 423 } });
        });
    });
  };
  public getNotifications = (pageSize: number, pageIndex: number) => async (dispatch: Dispatch<Action>) => {
    const body = {
      pageSize: pageSize,
      pageIndex: pageIndex,
    };
    await this._useToken(async (token: string | null) => {
      axios
        .post(`http://${apiURL}/notifications/get-notifications`, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          dispatch({ type: ActionTypes.GetNotifications, payload: response.data });
        })
        .catch((error) => {
          dispatch({ type: ActionTypes.UpdateComment, payload: { statusCode: 423, statusMessage: error } });
        });
    });
  };
}

export const actionImpl = new Actions(apiURL);
