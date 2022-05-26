import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ManageAccountState } from './Controllers/ManageAccountContainer';
import { StylesOne } from '../Styles/StylesOne';
import { MP } from '../Styles/MP';
import { St } from '../Styles/StylesTwo';
import { images } from '../assets/images';
import { StylesFour } from '../Styles/StylesFour';
import ReusableModalSegment from './segments/ReusableModalSegment';
import SelectSegment from './segments/SelectSegment';
import ModalManagementSegment from "./segments/ModalManagementSegment";

type IProps = {
  state: ManageAccountState;
  setState: Function;
  avatarURL: string;
  openModal(flag: boolean, type?: ManageAccountState | null | string): string | void;
  modalVisible: boolean;
  getIsPrivate(): string;
  onBackPress():void;

};

export enum SelectTitles {
    Avatar = 'Avatar',
    Full_Name = 'Full Name',
    Gender = 'Gender',
    Is_Private = 'Is Private',
    Email = 'Email',
    About_self = 'About self',
    Location = 'Location',
    Personal_Site = 'Personal Site',
    Date_Of_Birth = 'Date Of Birth',
}

const ManageAccountComponent = (state: IProps) => {
  return (
    <View style={[StylesOne.screenContainer, MP.ph15]}>
      <View style={[StylesOne.w100]}>
        <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>
          <TouchableOpacity onPress={state.onBackPress} style={StylesOne.image24}>
            <Image style={[StylesOne.wh100, StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
          </TouchableOpacity>
          <Text style={StylesOne.CheckBox_text}>Manage Account</Text>
          <View></View>
        </View>
      </View>
      <View style={[StylesOne.flex_column, StylesOne.flex_jc_c, StylesOne.flex_ai_c, MP.mt40]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => state.openModal(true, SelectTitles.Avatar)}
          style={[StylesFour.manageAcc_photoContainer, StylesFour.flex_flexFullCenter]}
        >
          <View style={[StylesFour.manageAcc_photoBlur, StylesFour.flex_flexFullCenter]}>
            <Image style={StylesOne.wh35} source={images.camera} />
          </View>
          <Image style={StylesFour.manageAcc_avatar} source={{ uri: state.avatarURL }} />
        </TouchableOpacity>
      </View>
      <View style={MP.mt40}>
        <SelectSegment onPress={() => state.openModal(true, SelectTitles.Full_Name)} secondTitle={state.state.originalData?.full_name} title={SelectTitles.Full_Name} />
        <SelectSegment onPress={() => state.openModal(true, SelectTitles.Gender)} secondTitle={state.state.originalData?.gender} title={SelectTitles.Gender} />
        <SelectSegment onPress={() => state.openModal(true, SelectTitles.Is_Private)} secondTitle={state.getIsPrivate()} title={SelectTitles.Is_Private} />
        <SelectSegment onPress={() => state.openModal(true, SelectTitles.Email)} secondTitle={state.state.originalData?.email} title={SelectTitles.Email} />
        <SelectSegment onPress={() => state.openModal(true, SelectTitles.About_self)} secondTitle={state.state.originalData?.description} title={SelectTitles.About_self} />
        <SelectSegment onPress={() => state.openModal(true, SelectTitles.Location)} secondTitle={state.state.originalData?.location} title={SelectTitles.Location} />
        <SelectSegment onPress={() => state.openModal(true, SelectTitles.Personal_Site)} secondTitle={state.state.originalData?.personal_site} title={SelectTitles.Personal_Site} />
        <SelectSegment onPress={() => state.openModal(true, SelectTitles.Date_Of_Birth)} secondTitle={state.state.originalData?.date_of_birth} title={SelectTitles.Date_Of_Birth} />
      </View>
      <ReusableModalSegment setModalVisible={state.openModal} modalVisibility={state.modalVisible}>
        {state.state.type === null ? <></> : <ModalManagementSegment originalData={state.state.originalData} type={state.state.type} />}
      </ReusableModalSegment>
    </View>
  );
};

export default ManageAccountComponent;
