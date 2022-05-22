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
            return  this.emptyResponse;
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
            return  this.emptyResponse;
        }
    }
}