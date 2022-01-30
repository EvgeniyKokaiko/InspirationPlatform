export enum ActionTypes {
    Register = "Register",
    Setup = "Setup",
    Clear = "Clear",
    Login = "Login",
    Me = "ME_GET_USERDATA",
    MePosts = "ME_GET_POSTS",
    AddPost = "ADD_NEW_POST",
    DeletePost = "DELETE_MY_POST",
    Check = "CHECK_FOR_CONNECTION",
    Logout = "LOGOUT_ME",
    NewsLine = "GET_NEWSLINE",
    MyNewsLine = "GET_MY_OWN_NEWSLINE",
    User = "GET_USER_DATA",
    Subscribe = "MAKE_SUBSCRIBE",
    Unfollow = "MAKE_UNFOLLOW",
    RequestList = "GET_REQUEST_LIST",
    AcceptOrDeclineRequest = "ACCEPT_OR_DECLINE_REQUEST",
    SetAvatar = "SET_NEW_AVATAR",
    SetParam = "SET_NEW_PARAMETER",
}


export interface Action {
    type: string;
    payload?: any;
}