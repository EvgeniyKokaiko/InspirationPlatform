import React from 'react';
import { View, Text } from 'react-native';
import { SelectTitles } from '../ManageAccountComponent';
import { ManageAccountState } from '../Controllers/ManageAccountContainer';

type IProps = {
  type: ManageAccountState | null | string;
};

const ModalManagementSegment = (props: IProps) => {
  switch (props.type) {
    case SelectTitles.Avatar:
      return (
        <View>
          <Text style={{ color: 'black' }}>Avatar</Text>
        </View>
      );
    case SelectTitles.Full_Name:
      return (
        <View>
          <Text style={{ color: 'black' }}>FName</Text>
        </View>
      );
    case SelectTitles.Gender:
      return (
        <View>
          <Text style={{ color: 'black' }}>Gender</Text>
        </View>
      );
    case SelectTitles.Is_Private:
      return (
        <View>
          <Text style={{ color: 'black' }}>Is_Private</Text>
        </View>
      );
    case SelectTitles.Email:
      return (
        <View>
          <Text style={{ color: 'black' }}>Email</Text>
        </View>
      );
    case SelectTitles.About_self:
      return (
        <View>
          <Text style={{ color: 'black' }}>About_self</Text>
        </View>
      );
    case SelectTitles.Location:
      return (
        <View>
          <Text style={{ color: 'black' }}>Location</Text>
        </View>
      );
    case SelectTitles.Personal_Site:
      return (
        <View>
          <Text style={{ color: 'black' }}>Personal_Site</Text>
        </View>
      );
    case SelectTitles.Date_Of_Birth:
      return (
        <View>
          <Text style={{ color: 'black' }}>Date_Of_Birth</Text>
        </View>
      );
    default:
      return <></>;
  }
};

export default ModalManagementSegment;
