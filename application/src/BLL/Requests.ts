import axios from "axios";
import { apiURL } from "../redux/actions";
import { BaseResponse } from "../Types/Types";
import { currentUser } from "./CurrentUserProps";

export class Requests {

    private static emptyResponse = {
        statusCode: 554,
        statusMessage: 'Error',
        data: {},
    }

    public static async onLikePress(owner: string, imageHash: string): Promise<BaseResponse> {
        try {
            const authorizationToken = currentUser.token;
            const response: BaseResponse = await axios.get(`http://${apiURL}/likes/${owner}/${imageHash}/like`, {
                headers: {
                    Authorization: `Bearer ${authorizationToken}`,
                },
            })
            return response.data
        } catch (ex) {
            return this.emptyResponse;
        }
    }


    public static async getLikesCount(posthash: string): Promise<BaseResponse> {
        try {
            const authorizationToken = currentUser.token;
            const response: BaseResponse = await axios.get(`http://${apiURL}/likes/getLikes/${posthash}`, {
                headers: {
                    Authorization: `Bearer ${authorizationToken}`,
                },
            })
            return response.data
        } catch (ex) {
            return this.emptyResponse;
        }
    }

    public static register = async (data: { name: string, email: string, password: string, fName: string, location: string, about: string, gender: string, birth: string, site: string }): Promise<BaseResponse> => {
        const body = {
            name: data.name,
            email: data.email,
            password: data.password,
            fName: data.fName,
            location: data.location,
            about: data.about,
            gender: data.gender,
            birth: data.birth,
            site: data.site,
        }
        const response = await axios.post(`http://${apiURL}/auth/register`, body)
        return response.data
    }

    public static authorize = async (username: string, password: string): Promise<BaseResponse> => {
        const response = await axios.post(`http://${apiURL}/auth/login`, {
            username: username,
            password: password,
        })
        return response.data;
    };
}