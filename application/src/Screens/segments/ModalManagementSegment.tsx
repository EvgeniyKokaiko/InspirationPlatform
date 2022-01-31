import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Alert, Switch} from 'react-native';
import { SelectTitles } from '../ManageAccountComponent';
import { ManageAccountState } from '../Controllers/ManageAccountContainer';
import {St} from "../../Styles/StylesTwo";
import {images} from "../../assets/images";
import {StylesOne} from "../../Styles/StylesOne";
import {StylesFour} from "../../Styles/StylesFour";
import {MP} from "../../Styles/MP";
import {ImagePickerResponse, launchImageLibrary} from "react-native-image-picker";
import {Asset, User} from "../../Types/Models";
import {apiURL} from "../../redux/actions";
import Avatar from "./Avatar";
import {mockupHeightToDP, mockupWidthToDP} from "../../Parts/utils";
import {useDispatch} from "react-redux";
import {settingsImpl} from "../../redux/actions/settings";
import {Picker} from "@react-native-picker/picker";
import {colors} from "../../Parts/colors";
import CheckBox from "@react-native-community/checkbox";

type IProps = {
  type: ManageAccountState | null | string;
  originalData: User | any;
};


type IState = {
  files: Asset;
  avatar: string;
  dateOfBirth: string | number,
  description: string | number,
  fName: string | number,
  gender: string | number,
  isPrivate: string | number,
  location: string | number,
  personalSite: string | number,
  email: string | number,
}

const ModalManagementSegment = (props: IProps) => {
  const dispatch = useDispatch();
  const [getState, setState] = useState<IState | any>({
    files: {uri: undefined},
    avatar: "",
    dateOfBirth: props.originalData.date_of_birth,
    description: props.originalData.description,
    fName: props.originalData.full_name,
    gender: props.originalData.gender,
    isPrivate: props.originalData.is_private,
    location: props.originalData.location,
    personalSite: props.originalData.personal_site,
    email: props.originalData.email,
  })


  const openImagePicker = async () => {
    setState({...getState, files: {uri: undefined}, avatar: ''})
    await launchImageLibrary({mediaType: "photo", selectionLimit: 1, quality: 1}, (response) => {
      if (response.didCancel) {
        return
      }
        setState({...getState, files: response.assets![0], avatar: (response.assets![0].uri as string)})
        console.log(getState, "AAAA" ,response.assets![0], "RES")
    })
  }


  const setNewValue = (param: string, value: string | number| boolean) => {
          dispatch(settingsImpl.setParam(param, value))
  }

  const setAvatar = () => {
    dispatch(settingsImpl.setNewAvatar(getState.files))
  }


const valueGetter = (param: string, originalParam: string) => {
      if (getState[param] === props.originalData[originalParam]) {
          return getState[param]
      } else {
          return props.originalData[originalParam]
      }
}

  switch (props.type) {
    case SelectTitles.Avatar:
      return (
        <View style={[StylesOne.flex_column, StylesOne.flex_ai_c]}>
          <Text style={[StylesFour.myNewsLine_caption, MP.mb20]}>Select new Avatar</Text>
          <TouchableOpacity onPress={openImagePicker} style={[St.addPhotoBtn, MP.mb20]}>
            <Image style={[St.wh80, {tintColor: 'white'}]} source={getState.avatar !== "" ? images.close : images.camera} />
          </TouchableOpacity>
          <View style={[{width: '100%', height: getState.avatar !== "" ? mockupHeightToDP(400) : 0}]}>
            {getState.avatar !== "" ? <Image style={{width: '100%', height: "100%"}} source={{uri: `${getState.avatar}?asd=${Date.now()}`}} />  : <></>}
          </View>
          <TouchableOpacity onPress={setAvatar} disabled={getState.avatar === ""} style={[MP.mt40, getState.avatar !== "" ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button, StylesOne.flex_row, StylesOne.flex_jc_c, StylesOne.flex_ai_c]}>
            <Text style={[getState.avatar !== "" ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Set</Text>
          </TouchableOpacity>
        </View>
      );
    case SelectTitles.Full_Name:
      return (
        <View style={[StylesOne.flex_column, StylesOne.flex_ai_c]}>
          <TouchableOpacity disabled={getState.avatar === ""} style={[MP.mt40, getState.avatar !== "" ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button, StylesOne.flex_row, StylesOne.flex_jc_c, StylesOne.flex_ai_c]}>
            <Text style={[getState.avatar !== "" ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Set</Text>
          </TouchableOpacity>
        </View>
      );
    case SelectTitles.Gender:
      return (
        <View>
            <View style={[StylesOne.DropdownStyles, MP.plm20]}>
                <Picker selectedValue={getState.gender}
                        onValueChange={(val) =>
                            setState({...getState, gender: val})}
                        dropdownIconColor={colors.SignIn_Font}
                        itemStyle={StylesOne.fontInputText_black}
                        dropdownIconRippleColor={colors.transparent}
                        mode="dropdown">
                    <Picker.Item style={StylesOne.fontInputText_black} label="Male" value="Male" />
                    <Picker.Item style={StylesOne.fontInputText_black} label="Female" value="Female" />
                    <Picker.Item style={StylesOne.fontInputText_black} label="Unrecognized" value="Unrecognized" />
                    <Picker.Item style={StylesOne.fontInputText_black} label="Digigender" value="Digigender" />
                </Picker>
                <View style={StylesOne.borderBottom} />
            </View>
            <View style={[StylesOne.w100, StylesOne.flex_column, StylesOne.flex_ai_c]}>
          <TouchableOpacity onPress={() => setNewValue("gender", getState.gender)} disabled={getState.gender === -1} style={[MP.mt40, getState.gender !== -1 ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button, StylesOne.flex_row, StylesOne.flex_jc_c, StylesOne.flex_ai_c]}>
            <Text style={[getState.gender !== -1 ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Set</Text>
          </TouchableOpacity>
            </View>
        </View>
      );
    case SelectTitles.Is_Private:
      return (
        <View>
            <View style={[StylesOne.flex_column, StylesOne.flex_ai_c]}>
          <Text style={[StylesFour.myNewsLine_caption, MP.mb20]}>Set Your Privacy</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={"#f5dd4b"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(val) =>
                    setState({...getState, isPrivate: val})}
                value={!!getState.isPrivate}
            />
            </View>
            <View style={[StylesOne.w100, StylesOne.flex_column, StylesOne.flex_ai_c]}>
          <TouchableOpacity onPress={() => setNewValue("is_private", Boolean(getState.isPrivate))} disabled={getState.isPrivate === -1} style={[MP.mt40, getState.isPrivate !== -1 ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button, StylesOne.flex_row, StylesOne.flex_jc_c, StylesOne.flex_ai_c]}>
            <Text style={[getState.isPrivate !== -1 ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Set</Text>
          </TouchableOpacity>
            </View>
        </View>
      );
    case SelectTitles.Email:
      return (
        <View>
          <Text style={{ color: 'black' }}>Email</Text>
          <TouchableOpacity disabled={getState.avatar === ""} style={[MP.mt40, getState.avatar !== "" ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button, StylesOne.flex_row, StylesOne.flex_jc_c, StylesOne.flex_ai_c]}>
            <Text style={[getState.avatar !== "" ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Set</Text>
          </TouchableOpacity>
        </View>
      );
    case SelectTitles.About_self:
      return (
        <View>
          <Text style={{ color: 'black' }}>About_self</Text>
          <TouchableOpacity disabled={getState.avatar === ""} style={[MP.mt40, getState.avatar !== "" ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button, StylesOne.flex_row, StylesOne.flex_jc_c, StylesOne.flex_ai_c]}>
            <Text style={[getState.avatar !== "" ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Set</Text>
          </TouchableOpacity>
        </View>
      );
    case SelectTitles.Location:
      return (
        <View>
          <Text style={{ color: 'black' }}>Location</Text>
          <TouchableOpacity disabled={getState.avatar === ""} style={[MP.mt40, getState.avatar !== "" ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button, StylesOne.flex_row, StylesOne.flex_jc_c, StylesOne.flex_ai_c]}>
            <Text style={[getState.avatar !== "" ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Set</Text>
          </TouchableOpacity>
        </View>
      );
    case SelectTitles.Personal_Site:
      return (
        <View>
          <Text style={{ color: 'black' }}>Personal_Site</Text>
          <TouchableOpacity disabled={getState.avatar === ""} style={[MP.mt40, getState.avatar !== "" ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button, StylesOne.flex_row, StylesOne.flex_jc_c, StylesOne.flex_ai_c]}>
            <Text style={[getState.avatar !== "" ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Set</Text>
          </TouchableOpacity>
        </View>
      );
    case SelectTitles.Date_Of_Birth:
      return (
        <View>
          <Text style={{ color: 'black' }}>Date_Of_Birth</Text>
          <TouchableOpacity disabled={getState.avatar === ""} style={[MP.mt40, getState.avatar !== "" ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button, StylesOne.flex_row, StylesOne.flex_jc_c, StylesOne.flex_ai_c]}>
            <Text style={[getState.avatar !== "" ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Set</Text>
          </TouchableOpacity>
        </View>
      );
    default:
      return <></>;
  }
};

export default ModalManagementSegment;
