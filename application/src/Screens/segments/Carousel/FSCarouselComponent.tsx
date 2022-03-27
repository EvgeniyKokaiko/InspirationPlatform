import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { colors } from '../../../Parts/colors';
import { mockupHeightToDP, DEVICE_WIDTH, DEVICE_HEIGHT } from '../../../Parts/utils';
import { apiURL } from '../../../redux/actions';
import { StylesOne } from '../../../Styles/StylesOne';

type IProps = {
  assets: Asset[]
  isUpdate: number;
  onMomentumScrollEnd?(event: NativeSyntheticEvent<NativeScrollEvent>): void;
};

type IState = {
  isLoading: boolean;
  ref: React.RefObject<ScrollView>;
  isUpdate: number;
};

function FSCarouselComponent(props: IProps): JSX.Element {
  const [getState, setState] = useState<IState>({
    isLoading: false,
    ref: React.createRef<ScrollView>(),
    isUpdate: props.isUpdate,
  });

  const onLoadStart = () => {
    setState({ ...getState, isLoading: true });
  };

  const onLoad = () => {};

  const onLoadEnd = () => {
    setState({ ...getState, isLoading: false });
  };

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    props.onMomentumScrollEnd && props.onMomentumScrollEnd(event)
  }

  useEffect(() => {
    setState({...getState, isUpdate: getState.isUpdate + 1})
  }, [props.isUpdate])

  const renderList = () => {
    const result = [];

    for (let i = 0; i < props.assets.length; i++) {
      result.push(
        <View key={i} style={[StylesOne.wImageCarousel]}>
          {getState.isLoading && (
            <View style={[StylesOne.wh100, StylesOne.flexCenter, StylesOne.absolute]}>
              <ActivityIndicator size={75} color={colors.Primary_Red} />
            </View>
          )}
            <Image
              onLoadStart={onLoadStart}
              onLoad={onLoad}
              onLoadEnd={onLoadEnd}
              style={[StylesOne.wh100, { resizeMode: 'cover' }]}
              source={{ uri: props.assets[i].uri }}
            />
        </View>
      );
    }
    return result;
  };


  if (props.assets.length <= 0) {
      return (<></>)
  } 

  return (
    <View style={[{ height: mockupHeightToDP(DEVICE_HEIGHT - 250), width: DEVICE_WIDTH }, StylesOne.flex1, StylesOne.flexCenter, {backgroundColor: colors.Dark}]}>
      <ScrollView
        scrollEventThrottle={20}
        bounces={true}
        scrollEnabled={true}
        pagingEnabled
        onMomentumScrollEnd={onMomentumScrollEnd}
        ref={getState.ref}
        horizontal
      >
        {renderList()}
      </ScrollView>
    </View>
  );
}

export { FSCarouselComponent };
