import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { images } from '../../assets/images';
import { currentUser } from '../../BLL/CurrentUserProps';
import { colors } from '../../Parts/colors';
import { dateParser } from '../../Parts/utils';
import { actionImpl, apiURL } from '../../redux/actions';
import { MP } from '../../Styles/MP';
import { StylesFour } from '../../Styles/StylesFour';
import { StylesOne } from '../../Styles/StylesOne';
import { Comment } from '../../Types/Models';
import Avatar from './Avatar';
import { FormTextBox, FormTextBoxProps } from './FormTextBox';

type IProps = {} & Comment;

type IState = {
  commentValue: string;
  inputValue: string;
  isUpdate: boolean;
};

export function CommentItemView(props: IProps): JSX.Element {
  const [getState, setState] = useState<IState>({
    commentValue: props.comment_string,
    inputValue: 'zxczxc',
    isUpdate: false,
  });
  const dispatch = useDispatch();
  const getDate = dateParser(props.created_at);
  const avatarURL = `http://${apiURL}/storage/${props.creator}/avatar/avatar.png`;

  const isMyComment = currentUser.currentUserId === props.creator;

  const formboxProps: FormTextBoxProps = {
    multiline: true,
    onChange: (value: string) => setState({...getState, inputValue: value}),
    currentValue: getState.inputValue,
    placeholder: getState.commentValue,
    style: {container: [StylesOne.w100, {height: 40}], input: StylesOne.wh100},
    placeholderColor: colors.Placeholder,
    underline: colors.SignIn_BG,
  }


  const onRemovePress = () => {
    const body = {
      post_hash: props.post_hash,
      comment_hash: props.comment_hash,
    };
    dispatch(actionImpl.deleteComment(body.post_hash, body.comment_hash));
  };

  const onUpdatePress = () => {
    setState({ ...getState, commentValue: getState.commentValue, isUpdate: true });
  }

  const onUpdateCancelPress = () => {
    setState({ ...getState, commentValue: getState.commentValue, isUpdate: false });
  }

  const onUpdateSavePress = () => {
    if (getState.inputValue.length < 5) {
      Alert.alert("Warning!", "Length of your comment can't be less than 5 characters!")
      return;
  }
    const body = {
      post_hash: props.post_hash,
      comment_hash: props.comment_hash,
      data: {
        comment: getState.inputValue,
      },
    };
    dispatch(actionImpl.updateComment(body.post_hash, body.comment_hash, body.data));
    setState({ ...getState, commentValue: getState.inputValue, isUpdate: false });
  };

  const onManagePress = () => {
    Alert.alert('Comment editing', 'Choose action', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: onRemovePress,
        style: 'destructive',
      },
      {
        text: 'Update',
        onPress: onUpdatePress,
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={[StylesOne.w100, MP.mb10]}>
      <View style={[StylesOne.flex_row]}>
        <Avatar icon={{ uri: avatarURL }} size={40} />
        <View style={[StylesOne.w58, MP.ml5]}>
          <View>
            <Text numberOfLines={1} style={StylesFour.commentName_title}>
              {props.creator}
            </Text>
          </View>
          <View>
            <Text numberOfLines={1} style={StylesFour.commentfName_title}>
              {props.full_name}
            </Text>
          </View>
        </View>
        <View style={[StylesOne.w28]}>
          <Text style={StylesFour.commentDate_title}>{getDate}</Text>
          {isMyComment && (
            <View style={[StylesOne.w100, StylesOne.flex_row, StylesOne.flex_jc_fe]}>
              {!getState.isUpdate ? (
                <TouchableOpacity onPress={onManagePress} activeOpacity={0.4} style={[StylesOne.h100]}>
                  <Text style={[StylesFour.commentRemoveBtn_title]}>Manage</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity onPress={onUpdateSavePress} activeOpacity={0.4} style={[StylesOne.h100]}>
                    <Text style={[StylesFour.commentRemoveBtn_title, MP.mr10]}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onUpdateCancelPress} activeOpacity={0.4} style={[StylesOne.h100]}>
                    <Text style={[StylesFour.commentRemoveBtn_title]}>Cancel</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        </View>
      </View>
      {!getState.isUpdate ? <View style={[StylesOne.w100, MP.mt5]}>
        <Text style={StylesFour.commentComment_title}>{getState.commentValue}</Text>
      </View> : (
        <View style={[StylesOne.w100, MP.mt5]}>
          <FormTextBox {...formboxProps} />
        </View>
      )}
    </View>
  );
}
