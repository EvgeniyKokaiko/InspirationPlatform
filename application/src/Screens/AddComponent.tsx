import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView } from 'react-native';
import { StylesOne } from '../Styles/StylesOne';
import { MP } from '../Styles/MP';
import { St } from '../Styles/StylesTwo';
import { images } from '../assets/images';
import { colors } from '../Parts/colors';
import { launchImageLibrary } from 'react-native-image-picker';
import { Asset } from '../Types/Models';
import { useDispatch } from 'react-redux';
import { actionImpl } from '../redux/actions';
import BaseButton from './segments/BaseButton';
import { SingleCarouselComponent } from './segments/Carousel/SingleCarouselComponent';
import { FSCarouselComponent } from './segments/Carousel/FSCarouselComponent';
import { HeaderSegment } from './segments/Header/HeaderSegment';

type IProps = {};

type IState = {
  caption: string;
  btnDisabled: boolean;
  files: Asset[];
  isUpdate: number;
};

const AddComponent: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const type = 2;
  const [getState, setState] = useState<IState>({
    caption: '',
    btnDisabled: true,
    files: [],
    isUpdate: 0,
  });
  //owner, like_id from token on server

  const validatePhotos = (assets: Asset[]): number => {
    let nonPhotos = 0;
    for (let [index, asset] of assets.entries()) {
      if (!asset.type?.includes('image')) {
        nonPhotos++;
        assets.splice(index, 1);
      }
    }
    return nonPhotos;
  };

  const openImagePicker = async () => {
    await launchImageLibrary({ mediaType: 'photo', selectionLimit: 10, quality: 1 }, (response) => {
      if (response.didCancel) {
        return Alert.alert('Oops,', 'Something went wrong');
      }
      console.log(response.assets, 'asssetedasd');
      const nonIndex = validatePhotos(response.assets as Asset[]);
      if (nonIndex !== 0) {
        Alert.alert('Warning!', 'You push non photos to a post, and it was removed');
      }
      setState({ ...getState, btnDisabled: false, files: [...(response.assets as Asset[])], isUpdate: getState.isUpdate + 1 });
    });
  };

  const onPostAdd = () => {
    dispatch(actionImpl.addPost(getState.caption, getState.files as Asset[], type));
    setState({ ...getState, btnDisabled: true, caption: '', files: [] });
  };

  return (
    <View style={[StylesOne.screenContainer]}>
      <HeaderSegment headerTitle="New Post" />
      <ScrollView style={[StylesOne.inputContainer, MP.mt20, MP.mb100]}>
        <View style={[StylesOne.w100]}>
          <FSCarouselComponent assets={getState.files} isUpdate={getState.isUpdate} />
        </View>
        <View style={[MP.mv20, StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_c]}>
          <TouchableOpacity onPress={openImagePicker} style={St.addPhotoBtn}>
            <Image style={St.wh80} source={images.plus} />
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Caption"
          multiline
          placeholderTextColor={colors.Placeholder}
          underlineColorAndroid={colors.Underline_rgba_black}
          style={[StylesOne.fontInputText_black]}
          onChangeText={(val) => setState({ ...getState, caption: val })}
        />

        <View style={[MP.mt50, StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_c, MP.mb20]}>
          <BaseButton disabled={getState.btnDisabled} icon={images.arrowRight} onPress={onPostAdd} title={'Add Post'} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddComponent;
