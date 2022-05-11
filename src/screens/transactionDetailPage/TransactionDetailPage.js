import React, {useEffect, useRef, useState, useCallback} from 'react';
import {Animated, Clipboard, Easing, SafeAreaView, View} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {Button, Text} from '../../components';
import {container} from '../../themes/styles';
import {
  backgroundColor,
  placeholderColor,
  whiteColor,
  primaryColor,
  secondaryColor,
} from '../../themes/colors';
import {typecast} from '../../utils/helper';
import {Transaction} from '../../models';

const TransactionDetailPage = props => {
  const {
    navigation,
    route: {
      params: {id},
    },
  } = props;
  const transactionData = useSelector(state =>
    typecast(
      Transaction,
      state.transaction.data.find(e => e.id === id),
    ),
  );
  const onCopyPress = () => {
    Clipboard.setString(`#${transactionData.id}`);
    setToastIsVisible(true);
  };
  const onClosePress = () => {
    navigation.goBack();
  };
  const formattedAmmount = transactionData.getFormattedAmmount;
  const formattedDate = transactionData.getFormattedCreateDate;
  let headerBackground = '';
  let statusText = '';
  switch (transactionData.status) {
    case 'SUCCESS':
      headerBackground = style.successBackground;
      statusText = 'Berhasil';
      break;
    case 'PENDING':
    default:
      headerBackground = style.pendingBackground;
      statusText = 'Pengecekan';
      break;
  }
  const opacityRef = useRef(new Animated.Value(0));
  const timeout = useRef();
  const [toastIsVisible, setToastIsVisible] = useState(false);
  const hide = useCallback(() => {
    setToastIsVisible(false);
  }, []);
  useEffect(() => {
    if (toastIsVisible) {
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
  }, [hide, toastIsVisible]);
  const toastText = 'ID transaksi berhasil disalin';
  const [toggleDetail, setToggleDetail] = useState(true);
  const animatedRef = useRef(new Animated.Value(1)).current;
  const onToggleDetail = () => {
    if (toggleDetail) {
      Animated.timing(animatedRef, {
        duration: 300,
        toValue: 0,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedRef, {
        duration: 300,
        toValue: 1,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
    setToggleDetail(!toggleDetail);
  };
  const [bodySectionHeight, setBodySectionHeight] = useState(0);
  const toggleText = toggleDetail ? 'Tutup' : 'Lihat';
  const bodyHeight = animatedRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  });
  const onLayoutDetail = event => {
    setBodySectionHeight(event.nativeEvent.layout.height);
  };
  return (
    <SafeAreaView style={style.container}>
      <View style={headerBackground}>
        <Button style={style.closeButton} onPress={onClosePress}>
          <Icon name="ios-close" color={whiteColor} size={32} />
        </Button>
        <Icon
          style={style.sentIcon}
          name="ios-send-sharp"
          color={whiteColor}
          size={65}
        />
        <Text
          style={style.statusText}
          weight="medium"
          size="xl"
          color={whiteColor}>
          {statusText}
        </Text>
      </View>
      <View>
        <View
          style={[style.detailContainer, style.rowContainer, style.firstRow]}>
          <Text style={style.spaceContainer} size="xl" weight="medium">
            {`ID TRANSAKSI: #${transactionData.id}`}
          </Text>
          <Button style={style.copyButton} onPress={onCopyPress}>
            <Icon name="ios-copy-outline" color={primaryColor} size={14} />
          </Button>
        </View>
        <View
          style={[style.detailContainer, style.rowContainer, style.secondRow]}>
          <Text style={style.spaceContainer} size="xl" weight="medium">
            DETAIL TRANSAKSI
          </Text>
          <Button
            style={style.copyButton}
            onPress={onToggleDetail}
            textStyle={style.closeText}
            text={toggleText}
          />
        </View>
        <Animated.View
          style={[
            style.detailContainer,
            style.bodyBackground,
            {height: bodyHeight},
          ]}>
          <View onLayout={onLayoutDetail} style={style.bodyContainer}>
            <Text
              style={style.spaceContainer}
              weight="bold"
              size="xl"
              isUppercase>
              {transactionData.sender_bank} &#10132;{' '}
              {transactionData.beneficiary_bank}
            </Text>
            <View style={[style.rowContainer, style.spaceContainer]}>
              <View style={container}>
                <Text weight="medium" size="xl" isUppercase>
                  {transactionData.beneficiary_name}
                </Text>
                <Text size="xl">{transactionData.account_number}</Text>
              </View>
              <View style={container}>
                <Text weight="medium" size="xl" isUppercase>
                  NOMINAL
                </Text>
                <Text size="xl">{formattedAmmount}</Text>
              </View>
            </View>
            <View style={[style.rowContainer, style.spaceContainer]}>
              <View style={container}>
                <Text weight="medium" size="xl" isUppercase>
                  BERITA TRANSFER
                </Text>
                <Text size="xl">{transactionData.remark}</Text>
              </View>
              <View style={container}>
                <Text weight="medium" size="xl" isUppercase>
                  KODE UNIK
                </Text>
                <Text size="xl">{transactionData.unique_code}</Text>
              </View>
            </View>
            <View style={style.spaceContainer}>
              <Text weight="medium" size="xl" isUppercase>
                WAKTU DIBUAT
              </Text>
              <Text size="xl">{formattedDate}</Text>
            </View>
          </View>
        </Animated.View>
      </View>
      <Animated.View
        style={[style.toastContainer, {opacity: opacityRef.current}]}>
        <View style={style.toastContentContainer}>
          <Text color={whiteColor}>{toastText}</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const style = {
  container: {
    ...container,
    backgroundColor: backgroundColor,
  },
  bodyBackground: {
    overflow: 'hidden',
  },
  bodyContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 0,
  },
  successBackground: {
    backgroundColor: secondaryColor,
  },
  pendingBackground: {
    backgroundColor: primaryColor,
  },
  closeButton: {
    marginTop: 16,
    marginLeft: 16,
  },
  sentIcon: {
    alignSelf: 'center',
    marginTop: 32,
  },
  copyButton: {
    marginLeft: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceContainer: {
    paddingVertical: 16,
  },
  firstRow: {
    marginBottom: 1,
  },
  detailContainer: {
    backgroundColor: whiteColor,
    paddingHorizontal: 16,
  },
  closeText: {
    color: primaryColor,
    weight: 'medium',
    size: 'xl',
  },
  secondRow: {
    borderBottomWidth: 1,
    borderColor: placeholderColor,
    justifyContent: 'space-between',
  },
  statusText: {
    textAlign: 'center',
    marginBottom: 32,
  },
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

export default TransactionDetailPage;
