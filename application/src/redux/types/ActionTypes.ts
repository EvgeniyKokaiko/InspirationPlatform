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
    User = "GET_USER_DATA",
}


export interface Action {
    type: string;
    payload?: any;
}