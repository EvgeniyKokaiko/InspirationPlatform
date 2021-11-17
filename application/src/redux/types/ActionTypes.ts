export enum ActionTypes {
    Register = "Register",
    Setup = "Setup",
    Clear = "Clear",
    Login = "Login",
    Me = "ME"
}


export interface Action {
    type: string;
    payload?: any;
}