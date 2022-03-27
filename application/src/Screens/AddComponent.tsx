import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
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
import { LabelView } from './segments/LabelView';
import { StylesFour } from '../Styles/StylesFour';

type IProps = {};

type IState = {
  caption: string;
  btnDisabled: boolean;
  files: Asset[];
  isUpdate: number;
  labelText: string;
};

const AddComponent: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const type = 2;
  const [getState, setState] = useState<IState>({
    caption: '',
    btnDisabled: true,
    files: [],
    isUpdate: 0,
    labelText: '',
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
      let listLength = `0 of ${response.assets?.length}`;
      setState({ ...getState, btnDisabled: false, files: [...(response.assets as Asset[])], isUpdate: getState.isUpdate + 1, labelText: listLength });
    });
  };

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;
    let selected = Math.round(contentOffset / viewSize);
    setState({ ...getState, labelText: `${selected + 1} of ${getState.files.length}` });
  };

  const onPostAdd = () => {
    dispatch(actionImpl.addPost(getState.caption, getState.files as Asset[], type));
    setState({ ...getState, btnDisabled: true, caption: '', files: [], labelText: '' });
  };

  return (
    <View style={[StylesOne.screenContainer]}>
      <HeaderSegment headerTitle="New Post" />
      <ScrollView style={[StylesOne.inputContainer, MP.mt20, MP.mb100]}>
        <View style={[StylesOne.w100, MP.mb10]}>
          <LabelView
            defaultText={getState.labelText}
            styles={{ text: [StylesFour.headerCarouselText, { color: 'black' }], container: [StylesOne.flexCenter] }}
          />
        </View>
        <View style={[StylesOne.w100]}>
          <FSCarouselComponent onMomentumScrollEnd={onMomentumScrollEnd} assets={getState.files} isUpdate={getState.isUpdate} />
        </View>
        <View style={[MP.mv20, StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_c]}>
          <TouchableOpacity onPress={openImagePicker} style={St.addPhotoBtn}>
            <Image style={St.wh80} source={images.plus} />
          </TouchableOpacity>
        </View>
        <View style={[MP.ph15]}>
        <TextInput
          placeholder="Caption"
          multiline
          maxLength={2000}
          value={getState.caption}
          placeholderTextColor={colors.Placeholder}
          underlineColorAndroid={colors.Underline_rgba_black}
          style={[StylesOne.fontInputText_black]}
          onChangeText={(val) => setState({ ...getState, caption: val })}
        />
</View>
        <View style={[MP.mt50, StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_c, MP.mb20]}>
          <BaseButton disabled={getState.btnDisabled} icon={images.arrowRight} onPress={onPostAdd} title={'Add Post'} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddComponent;
