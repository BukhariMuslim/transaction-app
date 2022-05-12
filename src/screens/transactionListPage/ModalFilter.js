import React, {memo} from 'react';
import {View, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Button, Text} from '@components';
import {container} from '@themes/styles';
import {primaryColor, whiteColor, modalBackgroundColor} from '@themes/colors';
import {FILTER} from '@utils/constants';

const ModalFilter = props => {
  const {onPress, isShowModal, sortValue, onModalClose} = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isShowModal}
      presentationStyle="overFullScreen"
      onRequestClose={onModalClose}>
      <View style={style.modalContainer}>
        <View style={style.modalContentContainer}>
          {Object.keys(FILTER).map((e, i) => (
            <Button
              key={`button_${i}`}
              style={[style.buttonRadio, style.buttonMarginBottom]}
              onPress={() => onPress(e)}>
              <Icon
                name={`ios-radio-button-${sortValue === e ? 'on' : 'off'}`}
                color={primaryColor}
                size={24}
              />
              <Text style={style.buttonText} weight="semibold" size="l">
                {FILTER[e]}
              </Text>
            </Button>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const style = {
  modalContainer: {
    ...container,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: modalBackgroundColor,
  },
  modalContentContainer: {
    backgroundColor: whiteColor,
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 32,
  },
  buttonRadio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 6,
  },
  buttonMarginBottom: {
    marginBottom: 16,
  },
};

export default memo(ModalFilter);
