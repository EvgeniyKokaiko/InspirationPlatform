import React, { useState } from 'react';
import { ActivityIndicator, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native';
import { colors } from '../../../Parts/colors';
import { mockupHeightToDP, DEVICE_WIDTH } from '../../../Parts/utils';
import { apiURL } from '../../../redux/actions';
import { StylesOne } from '../../../Styles/StylesOne';

type IProps = {
  carouselData: {
    data_count: number;
    owner: string;
    post_hash: string;
  };
  onMomentumScrollEnd?(event: NativeSyntheticEvent<NativeScrollEvent>): void;
};

type IState = {
  isLoading: boolean;
  ref: React.RefObject<ScrollView>;
};

function SingleCarouselComponent(props: IProps): JSX.Element {
  const [getState, setState] = useState<IState>({
    isLoading: false,
    ref: React.createRef<ScrollView>(),
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

  const renderList = () => {
    const result = [];

    for (let i = 0; i < props.carouselData.data_count; i++) {
      const dataPath = `http://${apiURL}/storage/${props.carouselData.owner}/posts/${props.carouselData.post_hash}/${i}.png`;
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
              source={{ uri: dataPath }}
            />
        </View>
      );
    }
    return result;
  };

  return (
    <View style={[{ height: mockupHeightToDP(600), width: DEVICE_WIDTH }, StylesOne.flex1, StylesOne.flexCenter, {backgroundColor: colors.Dark}]}>
      <ScrollView
        scrollEventThrottle={20}
        bounces={true}
        scrollEnabled={true}
        onMomentumScrollEnd={onMomentumScrollEnd}
        pagingEnabled
        ref={getState.ref}
        horizontal
      >
        {renderList()}
      </ScrollView>
    </View>
  );
}

export { SingleCarouselComponent };
