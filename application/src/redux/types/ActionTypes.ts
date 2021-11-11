export enum ActionTypes {
    Register = "Register",
    Setup = "Setup",
    Clear = "Clear",
}


export interface Action {
    type: string;
    payload?: any;
}