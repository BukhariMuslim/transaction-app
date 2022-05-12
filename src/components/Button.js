import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';

import Text from '@components/Text';
import {blackColor} from '@themes/colors';

const Button = props => {
  const {children, style, text, textStyle, ...restProps} = props;
  const fontFamily = textStyle?.fontFamily || 'configRounded';
  const weight = textStyle?.weight || 'regular';
  const size = textStyle?.size || 'n';
  const color = textStyle?.color || blackColor;
  const fontStyle = {
    fontFamily,
    weight,
    size,
    color,
  };
  return (
    <TouchableOpacity style={style} {...restProps}>
      {children ? children : <Text {...fontStyle}>{text}</Text>}
    </TouchableOpacity>
  );
};

export default memo(Button);
