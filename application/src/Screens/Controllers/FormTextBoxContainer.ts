import React from "react";


class FormTextBoxContainer {
    private _view: any;
    public nigger: string = "aomine daiki"
    constructor() {}



    public set view(val: any) {
        this._view = val;
    }


   public onShoto = () => {
        this.nigger = 'Niggeri ne lyudi'
        this._view.forceUpdate();
    }

}



export {FormTextBoxContainer}