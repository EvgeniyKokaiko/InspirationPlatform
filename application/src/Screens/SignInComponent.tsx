import React, { RefObject, useEffect, useLayoutEffect, useState } from 'react';
import reducers, { Reducers } from '../redux/reducers/reducers';
import { View, Text, Image, TextInput, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { StylesOne } from '../Styles/StylesOne';
import { backgrounds } from '../Styles/Backgrounds';
import { images } from '../assets/images';
import { fontSizeDP, mockupHeightToDP, mockupWidthToDP } from '../Parts/utils';
import { colors } from '../Parts/colors';
import { MP } from '../Styles/MP';
import { KeyboardAvoidingComponent } from './Core/KeyboardAvoidingComponent';
import { noGoBack, StackScreens } from './Core/MainNavigationScreen';
import { BaseProps } from '../Types/Types';
import { useDispatch, useSelector } from 'react-redux';
import { actionImpl } from '../redux/actions/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { INavigation } from './Core/OverrideNavigation';
import { currentUser } from '../BLL/CurrentUserProps';

type IProps = {} & BaseProps;
type IState = {
  username: string;
  password: string;
};

const SignInComponent = (props: IProps) => {
  const [getState, setState] = useState<IState>({
    username: '',
    password: '',
  });

  const Login = async () => {
    const username = getState.username;
    const password = getState.password;
    if (username === void 0 || username === null || username === '' || username === ' ') {
      Alert.alert('Warning!', 'Username is invalid');
      return;
    }
    if (password === void 0 || password === null || password === '' || password === ' ') {
      Alert.alert('Warning!', 'Password is invalid');
      return;
    }
    await currentUser.authorize(username, password);
  };

  const goToSignUpScreen = () => {
    INavigation.navigate(StackScreens.SignUp);
  };

  noGoBack();
  return (
    <View style={[StylesOne.screenContainer, backgrounds.signIn_bg]}>
      <KeyboardAvoidingComponent>
        <View style={[StylesOne.flex_column, StylesOne.flex_ai_c, MP.mt50]}>
          <View>
            <Text style={StylesOne.logoAddition}>Welcome to</Text>
          </View>
          <View style={MP.mbminus50}>
            <Text style={StylesOne.fontLogo}>Valhalla</Text>
          </View>
          <View style={StylesOne.wh200px}>
            <Image style={StylesOne.whc_img100} source={images.logo} />
          </View>
        </View>
        <View style={StylesOne.inputContainer}>
          <TextInput
            onChangeText={(value) => setState({ ...getState, username: value })}
            placeholder="Username"
            value={getState.username}
            placeholderTextColor={colors.Placeholder}
            underlineColorAndroid={colors.Underline_rgba}
            style={StylesOne.fontInputText}
          />
          <TextInput
            onChangeText={(value) => setState({ ...getState, password: value })}
            placeholder="Password"
            value={getState.password}
            placeholderTextColor={colors.Placeholder}
            underlineColorAndroid={colors.Underline_rgba}
            style={StylesOne.fontInputText}
            secureTextEntry={true}
          />
        </View>
        <View style={[StylesOne.w100, StylesOne.flex_column, StylesOne.flex_ai_c]}>
          <TouchableOpacity onPress={Login} style={[StylesOne.SignInButton, StylesOne.shadowRed]}>
            <View style={[StylesOne.flexCenter, StylesOne.h100]}>
              <Text style={StylesOne.SignIn_textStyle}>Sign in</Text>
              <Image style={StylesOne.SignIn_image} source={images.arrowRight} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[MP.mv40]}>
            <Text style={[StylesOne.ForgotBtn]}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <View style={[StylesOne.flex_row, StylesOne.flex_jc_c]}>
          <View style={StylesOne.flex_row}>
            <Text style={[MP.mr15, StylesOne.PlainText]}>Don’t have an account?</Text>
            <TouchableOpacity onPress={goToSignUpScreen}>
              <Text style={StylesOne.SignIn_textStyle}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingComponent>
    </View>
  );
};

export default SignInComponent;
