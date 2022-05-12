import {MONTH} from '@utils/constants';

export const compareByKey = (first, next, key, isReverse) => {
  if (first[key] < next[key]) {
    return isReverse ? -1 : 1;
  }
  if (first[key] > next[key]) {
    return isReverse ? 1 : -1;
  }
  return 0;
};

export const compareByDateKey = (first, next, key, isReverse) => {
  var firstItem = stringToDate(first[key]);
  var nextItem = stringToDate(next[key]);
  if (firstItem < nextItem) {
    return isReverse ? -1 : 1;
  }
  if (firstItem > nextItem) {
    return isReverse ? 1 : -1;
  }
  return 0;
};

export const stringToDate = str => new Date(str.replace(' ', 'T'));

export const formatDate = date => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  // disabled toLocaleDateString due to RN issue on android https://github.com/facebook/react-native/issues/19737
  // return date?.toLocaleDateString('id-ID', dateOptions);
  return `${day} ${MONTH[month]} ${year}`;
};

export const formatDateString = str => formatDate(stringToDate(str));

// disabled toLocaleString due to RN issue on android https://github.com/facebook/react-native/issues/19737
export const formatNumber = str => str?.toLocaleString('id-ID');

export const formatCurrency = (str, symbol = 'Rp') =>
  `${symbol}${thousandFormatter(str)}`;

export const typecast = (Class, objc) => {
  let t = new Class();
  return Object.assign(t, objc);
};

export const typecastCollection = (Class, collection) => {
  let dataList = [];
  if (collection.length > 0) {
    dataList = collection.map(d => typecast(Class, d));
  }
  return dataList;
};

export const thousandFormatter = number =>
  number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
