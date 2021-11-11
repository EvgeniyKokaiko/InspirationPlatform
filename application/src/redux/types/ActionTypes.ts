export enum ActionTypes {
    Register = "Register",
    Setup = "Setup",
    Clear = "Clear",
    Login = "Login",
}


export interface Action {
    type: string;
    payload?: any;
}