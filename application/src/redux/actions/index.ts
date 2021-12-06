import {Dispatch} from "redux";
import axios from "axios"
import {Action, ActionTypes} from "../types/ActionTypes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Asset} from "../../Types/Models";
import {Platform} from "react-native";


export const apiUrl = "192.168.1.80:8080";

export const Register = (username: string, email: string, password: string) => async (dispatch: Dispatch<Action>) => {
    try {
       const response = await axios.post(`http://${apiUrl}/auth/register`, {
           username,
           email,
           password,
       }).then(el => {
           console.log(el.status, el.data, 1444)
           dispatch({type: ActionTypes.Register, payload: {statusCode: el.status, data:el.data}})
       })
        console.log("Register", `${apiUrl}/register`)

    } catch (ex) {
        console.log("register ex", ex)
    }
}


export const Setup = (username: {data: string}, full_name: string, location: string, description: string, gender: string) => async (dispatch: Dispatch<Action>) => {
    console.log(username, 5555)
    await axios.post(`http://${apiUrl}/auth/setup`, {
        username:username.data,
        full_name:full_name,
        location:location,
        description:description,
        gender:gender,
    }).then((el) => {
        console.log(el.status, el.data, 1444)
        dispatch({type: ActionTypes.Setup, payload: {statusCode: el.status, data: el.data.data}})
    })
}


export const Authorize = (username: string, password: string) => async (dispatch: Dispatch<Action>) => {
    console.log('asdas')
        await axios.post(`http://${apiUrl}/auth/login`, {
            username: username,
            password: password,
        }).then(el => {
            console.log({statusCode: el.status, data: el.data.data}, "login")
            dispatch({type: ActionTypes.Login, payload: {statusCode: el.status, data: el.data.data}})
        })
}


export const getMe = () => async (dispatch: Dispatch<Action>) => {
     await AsyncStorage.getItem("Access_TOKEN").then( async (el) => {
         await axios.get(`http://${apiUrl}/users/me`, {
            headers: {
                "Authorization": `Bearer ${el}`
            }
        }).then(el => {
            console.log('getMe ex', el.data)
            dispatch({type: ActionTypes.Me, payload: {statusCode: el.status, data: el.data.data, avatar: el.data.avatar}})
         })
    })

}


export const getMyPosts = () => async (dispatch: Dispatch<Action>) => {
    console.log("getMyPosts")
    await AsyncStorage.getItem("Access_TOKEN").then( async (el) => {
        await axios.get(`http://${apiUrl}/posts/me`, {
            headers: {
                "Authorization": `Bearer ${el}`
            }
        }).then(el => {
            console.log(data => console.log(data, "data"))
            dispatch({type: ActionTypes.MePosts, payload: {statusCode: el.status, counter: el.data.counter ,data: el.data.data}})
        })
    })
}

export const addPost = (caption: string, image: any, type: number) => async (dispatch: Dispatch<Action>) => {
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("type", type);
    formData.append("date_of_creation", `2021-12-05`) //TODO реализовать добавление текущей даты
    for (let i = 0;i< image.length ; i++) {
        formData.append('image', {
            uri: image[i].uri,
            name: image[i].fileName,
            type: image[i].type
        });
    }
    await AsyncStorage.getItem("Access_TOKEN").then( async (el) => {
        await axios.post(`http://${apiUrl}/posts/add`, formData, {
            headers: {
                "Authorization": `Bearer ${el}`,
                "Content-type": "multipart/form-data",
            },
            }

        ).then(el => {
            dispatch({type: ActionTypes.AddPost, payload: {statusCode: el.status}})
        })
    })
}


export const checkForConnection = () => async (dispatch: Dispatch<Action>) => {
    await AsyncStorage.getItem("Access_TOKEN").then( async (el) => {
        await axios.get(`http://${apiUrl}/users/check`, {
            headers: {
                "Authorization": `Bearer ${el}`
            }
        }).then(el => {
            dispatch({type: ActionTypes.Check, payload: {statusCode: el.status}})
        })
    })
}


export const Clear = () => {
    return {
        type: ActionTypes.Clear,
    }
}


