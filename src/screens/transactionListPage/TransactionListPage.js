import React, {useState, useCallback, useEffect} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import ListTransactionItem from './ListTransactionItem';
import ModalFilter from './ModalFilter';
import {Text, Toast, SearchBar} from '../../components';
import {container} from '../../themes/styles';
import {backgroundColor, placeholderColor} from '../../themes/colors';
import {getDataTransaction} from '../../utils/api';
import {compareByKey, compareByDateKey} from '../../utils/helper';
import {FILTER} from '../../utils/constants';
import {updateData} from '../../stores/transaction';

const fetchData = async (dispatch, setIsRefreshing, onError) => {
  setIsRefreshing(true);
  try {
    const collection = await getDataTransaction();
    setIsRefreshing(false);
    dispatch(updateData(collection));
  } catch (e) {
    setIsRefreshing(false);
    onError(e);
  }
};

const TransactionListPage = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortValue, setSortValue] = useState(FILTER.URUTKAN);
  const [toastIsVisible, setToastIsVisible] = useState(false);
  const [toastText, setToastText] = useState('');
  const hide = useCallback(() => {
    setToastIsVisible(false);
  }, []);
  const onError = errorText => {
    setToastText(errorText);
    setToastIsVisible(true);
  };
  useEffect(() => {
    fetchData(dispatch, setIsRefreshing, onError);
  }, [dispatch]);
  const onRefresh = () => {
    fetchData(dispatch, setIsRefreshing, onError);
  };
  let data = useSelector(state => {
    let tempData = [...state.transaction.data];
    switch (FILTER[sortValue]) {
      case FILTER.NAMA_A_Z:
        tempData = tempData.sort((first, next) =>
          compareByKey(first, next, 'beneficiary_name', true),
        );
        break;
      case FILTER.NAMA_Z_A:
        tempData = tempData.sort((first, next) =>
          compareByKey(first, next, 'beneficiary_name', false),
        );
        break;
      case FILTER.TANGGAL_TERBARU:
        tempData = tempData.sort((first, next) =>
          compareByDateKey(first, next, 'created_at', false),
        );
        break;
      case FILTER.TANGGAL_TERLAMA:
        tempData = tempData.sort((first, next) =>
          compareByDateKey(first, next, 'created_at', true),
        );
        break;
      case FILTER.URUTKAN:
      default:
        break;
    }
    return tempData;
  });
  const isDataExists = data.length > 0;
  const searchVal = searchValue.toLowerCase();
  if (searchVal !== '') {
    data = data.filter(
      e =>
        e.beneficiary_name.toLowerCase().indexOf(searchVal) > -1 ||
        e.sender_bank.toLowerCase().indexOf(searchVal) > -1 ||
        e.beneficiary_bank.toLowerCase().indexOf(searchVal) > -1 ||
        e.amount.toString(10).indexOf(searchVal) > -1,
    );
  }
  const onSearch = (val = '') => {
    setSearchValue(val);
  };
  const onPressAction = id => {
    navigation.navigate('transactionDetailPageScreen', {id});
  };
  const onSortPress = () => {
    setIsShowModal(true);
  };
  const onModalClose = () => {
    setIsShowModal(false);
  };
  const onModalSelect = filter => {
    setSortValue(filter);
    setIsShowModal(false);
  };
  return (
    <SafeAreaView style={style.container}>
      <SearchBar
        value={searchValue}
        onChangeText={onSearch}
        sortValue={FILTER[sortValue]}
        onSortPress={onSortPress}
      />
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={itemProp => (
            <ListTransactionItem {...itemProp} onPressAction={onPressAction} />
          )}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          keyExtractor={item => item.id}
        />
      ) : (
        <View style={style.emptyContainer}>
          <Icon
            name="ios-trail-sign-outline"
            color={placeholderColor}
            size={128}
          />
          <Text>
            {isDataExists
              ? `"${searchValue}" tidak ditemukan`
              : 'Belum ada transaksi'}
          </Text>
        </View>
      )}
      <Toast isVisible={toastIsVisible} hide={hide} text={toastText} />
      <ModalFilter
        onPress={onModalSelect}
        isShowModal={isShowModal}
        sortValue={sortValue}
        onModalClose={onModalClose}
      />
    </SafeAreaView>
  );
};

const style = {
  container: {
    ...container,
    backgroundColor: backgroundColor,
  },
  emptyContainer: {
    ...container,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default TransactionListPage;
