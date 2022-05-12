import React, {memo} from 'react';
import {TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Button from '@components/Button';
import Text from '@components/Text';
import {whiteColor, placeholderColor, primaryColor} from '@themes/colors';
import {container} from '@themes/styles';
import FONT from '@themes/fonts';

const SEARCH_PLACE_HOLDER = 'Cari nama, bank, atau nominal';

const SearchBar = props => {
  const {value, sortValue, onChangeText, onSortPress} = props;
  const onClearPress = () => {
    onChangeText();
  };
  return (
    <View style={style.container}>
      <Icon name="ios-search" color={placeholderColor} size={24} />
      <TextInput
        style={style.searchInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={SEARCH_PLACE_HOLDER}
        placeholderTextColor={placeholderColor}
      />
      {value.length > 0 ? (
        <Button style={style.closeButton} onPress={onClearPress}>
          <Icon name="ios-close" size={24} color={placeholderColor} />
        </Button>
      ) : null}
      <Button style={style.sortButton} onPress={onSortPress}>
        <Text size="l" weight="bold" color={primaryColor}>
          {sortValue}
        </Text>
        <Icon name="ios-chevron-down-outline" size={24} color={primaryColor} />
      </Button>
    </View>
  );
};

const style = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: whiteColor,
    margin: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  searchInput: {
    ...container,
    fontFamily: FONT.configRounded.regular,
    fontSize: 14,
    marginHorizontal: 8,
  },
  closeButton: {
    marginRight: 8,
  },
  sortButton: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export default memo(SearchBar);
