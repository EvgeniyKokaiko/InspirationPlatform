export enum ActionTypes {
    Register = "Register",
}


export interface Action {
    type: string;
    payload?: any;
}