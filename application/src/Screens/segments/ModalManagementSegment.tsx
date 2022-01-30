import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import { SelectTitles } from '../ManageAccountComponent';
import { ManageAccountState } from '../Controllers/ManageAccountContainer';
import {St} from "../../Styles/StylesTwo";
import {images} from "../../assets/images";
import {StylesOne} from "../../Styles/StylesOne";
import {StylesFour} from "../../Styles/StylesFour";
import {MP} from "../../Styles/MP";
import {ImagePickerResponse, launchImageLibrary} from "react-native-image-picker";
import {Asset} from "../../Types/Models";
import {apiURL} from "../../redux/actions";
import Avatar from "./Avatar";
import {mockupHeightToDP, mockupWidthToDP} from "../../Parts/utils";
import {useDispatch} from "react-redux";
import {settingsImpl} from "../../redux/actions/settings";

type IProps = {
  type: ManageAccountState | null | string;
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
  const [getState, setState] = useState<IState>({
    files: {uri: undefined},
    avatar: "",
    dateOfBirth: -1,
    description: -1,
    fName: -1,
    gender: -1,
    isPrivate: -1,
    location: -1,
    personalSite: -1,
    email: -1,
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

  const setAvatar = () => {
    dispatch(settingsImpl.setNewAvatar(getState.files))
    console.log('set avatar', getState.files)
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
          <Text style={{ color: 'black' }}>Gender</Text>
          <TouchableOpacity disabled={getState.avatar === ""} style={[MP.mt40, getState.avatar !== "" ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button, StylesOne.flex_row, StylesOne.flex_jc_c, StylesOne.flex_ai_c]}>
            <Text style={[getState.avatar !== "" ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Set</Text>
          </TouchableOpacity>
        </View>
      );
    case SelectTitles.Is_Private:
      return (
        <View>
          <Text style={{ color: 'black' }}>Is_Private</Text>
          <TouchableOpacity disabled={getState.avatar === ""} style={[MP.mt40, getState.avatar !== "" ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button, StylesOne.flex_row, StylesOne.flex_jc_c, StylesOne.flex_ai_c]}>
            <Text style={[getState.avatar !== "" ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Set</Text>
          </TouchableOpacity>
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
