import React, {ReactNode} from "react";
import {NavigationProp} from "@react-navigation/native";

export type Component = any


export interface BaseProps {
    navigation?: any;
    route?: any;
}

export enum AsyncStorageKeys {
    //TODO перенести сюда все ключи асинк сторейджа
}


export type PropChildren = {
    children?: ReactNode;
};