import React from 'react';
import { Image, Modal, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { images } from '../../../assets/images';
import { ImageStyles } from '../../../Styles/Images';
import { MP } from '../../../Styles/MP';
import { StylesFour } from '../../../Styles/StylesFour';
import { safeAreaInsetsTop, StylesOne } from '../../../Styles/StylesOne';
import { LabelView } from '../LabelView';

type IProps = {
  visible: boolean;
  hideModal(): void;
  defaultHeaderText: string;
  onMomentumScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>): void;
  scrollContainerRef: React.RefObject<ScrollView>;
};

const CarouselComponent = (state: IProps) => {
  function renderList() {
    return <View style={{ width: '100%', height: '80%', backgroundColor: 'red' }} />;
  }

  return (
    <Modal visible={state.visible} animationType={'fade'} style={[]}>
      <View style={[styles.modalView, { paddingTop: safeAreaInsetsTop }]}>
        <View style={[StylesOne.w100, StylesOne.flex_row, StylesOne.flex_ai_c, MP.pv15]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={state.hideModal}
            style={[StylesOne.minWidth15, StylesOne.h100, StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_fs, MP.pl15]}
          >
            <View>
              <Image style={[ImageStyles.imageDoubleAvatar, ImageStyles.tintColorWhite]} source={images.arrowLeft} />
            </View>
          </TouchableOpacity>
          <View style={[StylesOne.width70, StylesOne.flex_row, StylesOne.flex_jc_c]}>
            <LabelView
              styles={{
                text: [StylesFour.headerCarouselText],
                container: [StylesOne.h100],
              }}
              defaultText={state.defaultHeaderText}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={state.hideModal}
            style={[StylesOne.minWidth15, StylesOne.h100, StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_fs, MP.pl15]}
          >
            <View>
              <Image style={[ImageStyles.imageDoubleAvatar, ImageStyles.tintColorWhite]} source={images.burger} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={[StylesOne.flex1, StylesOne.flexCenter]}>
          <ScrollView
            scrollEventThrottle={20}
            bounces={true}
            scrollEnabled={true}
            onMomentumScrollEnd={state.onMomentumScrollEnd}
            pagingEnabled
            ref={state.scrollContainerRef}
            horizontal
          >
            {renderList()}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export { CarouselComponent };
