import React from 'react';
import {View} from 'react-native';

import {Button, Text} from '../../components';
import {
  blackColor,
  whiteColor,
  primaryColor,
  secondaryColor,
} from '../../themes/colors';
import {container} from '../../themes/styles';
import {typecast} from '../../utils/helper';
import {Transaction} from '../../models';

const SUCCESS = 'SUCCESS';

const ListTransactionItem = ({item, index, onPressAction}) => {
  let statusText = '';
  const transactionItem = typecast(Transaction, item);
  switch (transactionItem.status) {
    case 'SUCCESS':
      statusText = 'Berhasil';
      break;
    case 'PENDING':
    default:
      statusText = 'Pengecekan';
      break;
  }
  const formattedDate = transactionItem.getFormattedCreateDate;

  const formattedAmmount = transactionItem.getFormattedAmmount;

  const onPress = () => {
    onPressAction(transactionItem.id);
  };
  return (
    <Button
      style={[
        style.container,
        {
          borderColor:
            transactionItem.status === SUCCESS ? secondaryColor : primaryColor,
        },
      ]}
      onPress={onPress}>
      <View style={container}>
        <Text style={style.marginBottom} isUppercase weight="bold" size="xl">
          {transactionItem.sender_bank} &#10132;{' '}
          {transactionItem.beneficiary_bank}
        </Text>
        <Text style={style.marginBottom} isUppercase size="l">
          {transactionItem.beneficiary_name}
        </Text>
        <Text size="l">
          {formattedAmmount} &#8226; {formattedDate}
        </Text>
      </View>
      <View
        style={[
          style.statusContainer,
          transactionItem.status === SUCCESS
            ? style.statusSuccessContainer
            : style.statusPendingContainer,
        ]}>
        <Text
          weight="medium"
          color={transactionItem.status === SUCCESS ? whiteColor : blackColor}>
          {statusText}
        </Text>
      </View>
    </Button>
  );
};

const style = {
  container: {
    ...container,
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 6,
    padding: 8,
    backgroundColor: whiteColor,
    borderLeftWidth: 6,
    borderColor: primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusSuccessContainer: {
    backgroundColor: secondaryColor,
  },
  statusPendingContainer: {
    backgroundColor: whiteColor,
    borderColor: primaryColor,
    borderWidth: 1,
  },
  statusContainer: {
    flex: 0,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  marginBottom: {
    marginBottom: 4,
  },
};

export default ListTransactionItem;
