import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { View, Text, Image, TouchableOpacity, Alert, Switch, TextInput } from 'react-native';
import { SelectTitles } from '../ManageAccountComponent';
import { ManageAccountState } from '../Controllers/ManageAccountContainer';
import { St } from '../../Styles/StylesTwo';
import { images } from '../../assets/images';
import { StylesOne } from '../../Styles/StylesOne';
import { StylesFour } from '../../Styles/StylesFour';
import { MP } from '../../Styles/MP';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { Asset, User } from '../../Types/Models';
import { apiURL } from '../../redux/actions';
import Avatar from './Avatar';
import { mockupHeightToDP, mockupWidthToDP } from '../../Parts/utils';
import {useDispatch, useSelector} from 'react-redux';
import { settingsImpl } from '../../redux/actions/settings';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../../Parts/colors';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-date-picker';

type IProps = {
  type: ManageAccountState | null | string;
  originalData: User | any;
};

type IState = {
  files: Asset;
  avatar: string;
  dateOfBirth: string | number;
  description: string | number;
  fName: string | number;
  gender: string | number;
  isPrivate: string | number;
  location: string | number;
  personalSite: string | number;
  email: string | number;
  city: string;
  country: string;
};

const ModalManagementSegment = (props: IProps) => {
  const dispatch = useDispatch();
  const store: any = useSelector((store) => store)
  const [getState, setState] = useState<IState | any>({
    files: { uri: undefined },
    avatar: '',
    dateOfBirth: new Date(),
    description: props.originalData.description,
    fName: props.originalData.full_name,
    gender: props.originalData.gender,
    isPrivate: props.originalData.is_private,
    location: props.originalData.location,
    city: `${getLocation()[0]}`,
    country: `${getLocation()[1]}`,
    personalSite: props.originalData.personal_site,
    email: props.originalData.email,
  });
  const [forcer, setForcer] = useState(0);

  function getLocation() {
    const currentLocation: string = props.originalData.location;
    const splitted: string[] = currentLocation.split(',');
    if (splitted.length === 2) {
      const city: string = splitted[0];
      const country: string = splitted[1];
      return [city, country];
    }
    return ['nope', 'nope'];
  }

  const openImagePicker = async () => {
    setState({ ...getState, files: { uri: undefined }, avatar: '' });
    await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1, quality: 1 }, (response) => {
      if (response.didCancel) {
        return;
      }
      setState({ ...getState, files: response.assets![0], avatar: response.assets![0].uri as string });
    });
  };

  const setNewValue = (param: string, value: string | number | boolean) => {
    dispatch(settingsImpl.setParam(param, value));
      setForcer((prev) => prev += 1)
  }

  const setAvatar = () => {
    dispatch(settingsImpl.setNewAvatar(getState.files));
  };

  function getFullLocation(city: string, country: string) {
    return `${city}, ${country}`;
  }

  const valueGetter = (param: string, originalParam: string) => {
    if (getState[param] === props.originalData[originalParam]) {
      return getState[param];
    } else {
      return props.originalData[originalParam];
    }
  };

  useEffect(() => {
      if (store.setParamReducer.statusCode === 423) {
          Alert.alert("Oops", "Something went wrong")
      }

  }, [store.setParamReducer])

  function setLocation(val: string, param: string) {
    const fixedValue = val.split(' ')[0];
    if (param === 'city') {
      setState({ ...getState, city: fixedValue });
    }
    if (param === 'country') {
      setState({ ...getState, country: fixedValue });
    }
  }

  function tryToChangePersonalSite() {
    //TODO make validate for is site valid
    setNewValue('personal_site', getState.personalSite);
  }

  switch (props.type) {
    case SelectTitles.Avatar:
      return (
        <View style={[StylesOne.flex_column, StylesOne.flex_ai_c]}>
          <Text style={[StylesFour.myNewsLine_caption, MP.mb20]}>Select new Avatar</Text>
          <TouchableOpacity onPress={openImagePicker} style={[St.addPhotoBtn, MP.mb20]}>
            <Image style={[St.wh80, { tintColor: 'white' }]} source={getState.avatar !== '' ? images.close : images.camera} />
          </TouchableOpacity>
          <View style={[{ width: '100%', height: getState.avatar !== '' ? mockupHeightToDP(400) : 0 }]}>
            {getState.avatar !== '' ? (
              <Image style={{ width: '100%', height: '100%' }} source={{ uri: `${getState.avatar}?asd=${Date.now()}` }} />
            ) : (
              <></>
            )}
          </View>
          <TouchableOpacity
            onPress={setAvatar}
            disabled={getState.avatar === ''}
            style={[
              MP.mt40,
              getState.avatar !== '' ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button,
              StylesOne.flex_row,
              StylesOne.flex_jc_c,
              StylesOne.flex_ai_c,
            ]}
          >
            <Text style={[getState.avatar !== '' ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Set</Text>
          </TouchableOpacity>
        </View>
      );
    case SelectTitles.Full_Name:
      return (
        <View>
            <Text style={[StylesFour.myNewsLine_caption, MP.mb20, {textAlign: 'center'}]}>Set Your Full Name</Text>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor={colors.Placeholder}
            underlineColorAndroid={colors.Underline_rgba_black}
            style={StylesOne.fontInputText_black}
            onChangeText={(val) => setState({...getState, fName: val})}
            value={getState.fName}
            multiline
            maxLength={150}
          />
          <View style={[StylesOne.flex_column, StylesOne.flex_ai_c]}>
            <TouchableOpacity
              onPress={() => setNewValue("full_name", getState.fName)}
              disabled={getState.fName === ''}
              style={[
                MP.mt40,
                getState.fName !== '' ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button,
                StylesOne.flex_row,
                StylesOne.flex_jc_c,
                StylesOne.flex_ai_c,
              ]}
            >
              <Text style={[getState.fName !== '' ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Set</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    case SelectTitles.Gender:
      return (
        <View>
          <View style={[StylesOne.DropdownStyles, MP.plm20]}>
              <Text style={[StylesFour.myNewsLine_caption, MP.mb20, {textAlign: 'center'}]}>Set Your Gender</Text>
            <Picker
              selectedValue={getState.gender}
              onValueChange={(val) => setState({ ...getState, gender: val })}
              dropdownIconColor={colors.SignIn_Font}
              itemStyle={StylesOne.fontInputText_black}
              dropdownIconRippleColor={colors.transparent}
              mode="dropdown"
            >
              <Picker.Item style={StylesOne.fontInputText_black} label="Male" value="Male" />
              <Picker.Item style={StylesOne.fontInputText_black} label="Female" value="Female" />
              <Picker.Item style={StylesOne.fontInputText_black} label="Unrecognized" value="Unrecognized" />
              <Picker.Item style={StylesOne.fontInputText_black} label="Digigender" value="Digigender" />
            </Picker>
            <View style={StylesOne.borderBottom} />
          </View>
          <View style={[StylesOne.w100, StylesOne.flex_column, StylesOne.flex_ai_c]}>
            <TouchableOpacity
              onPress={() => setNewValue('gender', getState.gender)}
              disabled={getState.gender === -1}
              style={[
                MP.mt40,
                getState.gender !== -1 ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button,
                StylesOne.flex_row,
                StylesOne.flex_jc_c,
                StylesOne.flex_ai_c,
              ]}
            >
              <Text style={[getState.gender !== -1 ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Set</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    case SelectTitles.Is_Private:
      return (
        <View>
          <View style={[StylesOne.flex_column, StylesOne.flex_ai_c]}>
            <Text style={[StylesFour.myNewsLine_caption, MP.mb20, {textAlign: 'center'}]}>Set Your Privacy</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={'#f5dd4b'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={(val) => setState({ ...getState, isPrivate: val })}
              value={!!getState.isPrivate}
            />
          </View>
          <View style={[StylesOne.w100, StylesOne.flex_column, StylesOne.flex_ai_c]}>
            <TouchableOpacity
              onPress={() => setNewValue('is_private', Boolean(getState.isPrivate))}
              disabled={getState.isPrivate === -1}
              style={[
                MP.mt40,
                getState.isPrivate !== -1 ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button,
                StylesOne.flex_row,
                StylesOne.flex_jc_c,
                StylesOne.flex_ai_c,
              ]}
            >
              <Text style={[getState.isPrivate !== -1 ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Set</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    case SelectTitles.Email:
      return (
          <View>
              <Text style={[StylesFour.myNewsLine_caption, MP.mb20, {textAlign: 'center'}]}>Set Your Email</Text>
              <TextInput
                  placeholder="Your Email"
                  placeholderTextColor={colors.Placeholder}
                  underlineColorAndroid={colors.Underline_rgba_black}
                  style={StylesOne.fontInputText_black}
                  onChangeText={(val) => setState({ ...getState, email: val })}
                  value={getState.email}
                  multiline
                  maxLength={500}
              />
              <View style={[StylesOne.w100, StylesOne.flex_column, StylesOne.flex_ai_c]}>
                  <TouchableOpacity
                      onPress={() => {
                          setNewValue('email', getState.email);
                      }}
                      disabled={getState.description === -1}
                      style={[
                          MP.mt40,
                          getState.description !== -1 ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button,
                          StylesOne.flex_row,
                          StylesOne.flex_jc_c,
                          StylesOne.flex_ai_c,
                      ]}
                  >
                      <Text style={[getState.avatar !== -1 ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Set</Text>
                  </TouchableOpacity>
              </View>
          </View>
      );
    case SelectTitles.About_self:
      return (
        <View>
            <Text style={[StylesFour.myNewsLine_caption, MP.mb20, {textAlign: 'center'}]}>Set description about yourself</Text>
          <TextInput
            placeholder="Describe yourself"
            placeholderTextColor={colors.Placeholder}
            underlineColorAndroid={colors.Underline_rgba_black}
            style={StylesOne.fontInputText_black}
            onChangeText={(val) => setState({ ...getState, description: val })}
            value={getState.description}
            multiline
            maxLength={500}
          />
          <View style={[StylesOne.w100, StylesOne.flex_column, StylesOne.flex_ai_c]}>
            <TouchableOpacity
              onPress={() => {
                setNewValue('description', getState.description);
              }}
              disabled={getState.description === -1}
              style={[
                MP.mt40,
                getState.description !== -1 ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button,
                StylesOne.flex_row,
                StylesOne.flex_jc_c,
                StylesOne.flex_ai_c,
              ]}
            >
              <Text style={[getState.avatar !== -1 ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Set</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    case SelectTitles.Location:
      return (
        <View>
            <Text style={[StylesFour.myNewsLine_caption, MP.mb20, {textAlign: 'center'}]}>Set Your Location</Text>
          <TextInput
            placeholder="City"
            placeholderTextColor={colors.Placeholder}
            underlineColorAndroid={colors.Underline_rgba_black}
            style={StylesOne.fontInputText_black}
            onChangeText={(val) => setLocation(val, 'city')}
            value={getState.city}
            multiline
            maxLength={500}
          />
          <TextInput
            placeholder="Country"
            placeholderTextColor={colors.Placeholder}
            underlineColorAndroid={colors.Underline_rgba_black}
            style={StylesOne.fontInputText_black}
            onChangeText={(val) => setLocation(val, 'country')}
            value={getState.country}
            multiline
            maxLength={500}
          />
          <View style={[StylesOne.w100, StylesOne.flex_column, StylesOne.flex_ai_c]}>
            <TouchableOpacity
              onPress={() => {
                setNewValue('location', getFullLocation(getState.city, getState.country));
              }}
              disabled={getState.description === -1}
              style={[
                MP.mt40,
                getState.description !== -1 ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button,
                StylesOne.flex_row,
                StylesOne.flex_jc_c,
                StylesOne.flex_ai_c,
              ]}
            >
              <Text style={[getState.avatar !== -1 ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Set</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    case SelectTitles.Personal_Site:
      return (
        <View>
            <Text style={[StylesFour.myNewsLine_caption, MP.mb20, {textAlign: 'center'}]}>Set Your Personal Site</Text>
          <TextInput
            placeholder="Personal Site"
            placeholderTextColor={colors.Placeholder}
            underlineColorAndroid={colors.Underline_rgba_black}
            style={StylesOne.fontInputText_black}
            onChangeText={(val) => setState({ ...getState, personalSite: val })}
            value={getState.personalSite}
            multiline
            maxLength={500}
          />
          <View style={[StylesOne.w100, StylesOne.flex_column, StylesOne.flex_ai_c]}>
            <TouchableOpacity
              onPress={tryToChangePersonalSite}
              disabled={getState.personalSite === ''}
              style={[
                MP.mt40,
                getState.personalSite !== '' ? StylesOne.SendBtn_active_button : StylesOne.SendBtn_inactive_button,
                StylesOne.flex_row,
                StylesOne.flex_jc_c,
                StylesOne.flex_ai_c,
              ]}
            >
              <Text style={[getState.personalSite !== '' ? StylesOne.SendBtn_active_text : StylesOne.SendBtn_inactive_text]}>Set</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    case SelectTitles.Date_Of_Birth:
      return (
        <View>
            <Text style={[StylesFour.myNewsLine_caption, MP.mb20, {textAlign: 'center'}]}>Set Your Birth</Text>
          <DatePicker
            mode={'date'}
            date={getState.dateOfBirth}
            onDateChange={(val) => {
              setState({ ...getState, dateOfBirth: val });
            }}
          />
          <View style={[StylesOne.w100, StylesOne.flex_column, StylesOne.flex_ai_c]}>
            <TouchableOpacity
              onPress={() => setNewValue('date_of_birth', +Date.parse(getState.dateOfBirth))}
              style={[MP.mt40, StylesOne.SendBtn_active_button, StylesOne.flex_row, StylesOne.flex_jc_c, StylesOne.flex_ai_c]}
            >
              <Text style={[StylesOne.SendBtn_active_text]}>Set</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    default:
      return <></>;
  }
};

export default ModalManagementSegment;
