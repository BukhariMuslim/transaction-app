import React, {useRef, useEffect, memo} from 'react';
import {Animated, Easing, View} from 'react-native';

import Text from './Text';
import {whiteColor, placeholderColor} from '../themes/colors';

const Toast = props => {
  const {text, isVisible, hide} = props;
  const opacityRef = useRef(new Animated.Value(0));
  const timeout = useRef();
  useEffect(() => {
    if (isVisible) {
      Animated.timing(opacityRef.current, {
        duration: 300,
        easing: Easing.ease,
        toValue: 1,
        useNativeDriver: true,
      }).start();
      timeout.current = setTimeout(hide, 1500);
      return () => {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
      };
    } else {
      Animated.timing(opacityRef.current, {
        duration: 450,
        easing: Easing.ease,
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [hide, isVisible]);
  return (
    <Animated.View
      style={[style.toastContainer, {opacity: opacityRef.current}]}>
      <View style={style.toastContentContainer}>
        <Text color={whiteColor}>{text}</Text>
      </View>
    </Animated.View>
  );
};

const style = {
  toastContainer: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  toastContentContainer: {
    backgroundColor: placeholderColor,
    opacity: 1,
    padding: 8,
    borderRadius: 16,
  },
};

export default memo(Toast);
