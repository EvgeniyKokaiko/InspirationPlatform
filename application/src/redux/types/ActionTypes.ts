export enum ActionTypes {
    Register = "Register",
    Setup = "Setup",
    Clear = "Clear",
    Login = "Login",
    Me = "ME_GET_USERDATA",
    MePosts = "ME_GET_POSTS",
    AddPost = "ADD_NEW_POST",
    Check = "CHECK_FOR_CONNECTION"
}


export interface Action {
    type: string;
    payload?: any;
}