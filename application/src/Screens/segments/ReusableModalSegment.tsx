import React, { ReactNode, useState } from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { StylesFour } from '../../Styles/StylesFour';
import { PropChildren } from '../../Types/Types';
import { images } from '../../assets/images';
import { StylesOne } from '../../Styles/StylesOne';

type IState = {};

type IProps = {
  modalVisibility: boolean;
  setModalVisible(flag: boolean): void;
} & PropChildren;

const ReusableModalSegment = (props: IProps) => {
  const [getState, setState] = useState<IState>({});
  return (
    <Modal animationType="fade" transparent={true} visible={props.modalVisibility} style={StylesFour.centeredView}>
      <View style={StylesFour.modalBg}>
        <View style={StylesFour.centeredView}>
          <View style={StylesFour.modalView}>
            <View style={[StylesOne.w100, StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_fe]}>
              <TouchableOpacity onPress={() => props.setModalVisible(false)} style={[StylesOne.wh25]}>
                <Image style={[StylesOne.wh100]} source={images.close} />
              </TouchableOpacity>
            </View>
            <View>{props.children}</View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReusableModalSegment;
