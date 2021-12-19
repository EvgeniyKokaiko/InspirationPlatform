import React from "react";
import {View, Text, Button, ScrollView, FlatList} from "react-native";
import {StylesOne} from "../Styles/StylesOne";
import {MP} from "../Styles/MP";
import Input from "./segments/Input";
import UserMenuPost from "./segments/UserMenuPost";

type IProps = {
    search: string;
    setSearch(prev: any): void;
    onChange(e: any): void
}

const MenuComponent: React.FC<IProps> = (state) => {
    return (
        <View style={[StylesOne.screenContainer, MP.ph15]}>
            <View>
                <Input placeholder="Search" currentValue={state.search} onChange={state.onChange}  />
            </View>
            <ScrollView>
                <UserMenuPost />
                <UserMenuPost />
                <UserMenuPost />
            </ScrollView>
        </View>
    )
}


export default MenuComponent