import React, {memo} from 'react';
import {Text as RNText} from 'react-native';

import FONT from '@themes/fonts';
import SIZE from '@themes/size';
import {blackColor} from '@themes/colors';

const Text = props => {
  const {
    children,
    style,
    fontFamily = 'configRounded',
    weight = 'regular',
    size = 'n',
    color = blackColor,
    isUppercase,
    ...restProps
  } = props;
  const overrideFont = {
    fontFamily: FONT[fontFamily][weight],
    fontSize: SIZE[size],
    color,
  };
  let fontStyle = [style];
  if (isUppercase) {
    fontStyle = [...fontStyle, {textTransform: 'uppercase'}];
  }
  return (
    <RNText style={[fontStyle, overrideFont]} {...restProps}>
      {children}
    </RNText>
  );
};

export default memo(Text);
