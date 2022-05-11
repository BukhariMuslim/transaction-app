import axios from 'axios';

const BASE_URL = 'https://recruitment-test.flip.id/';

const api = async (method, path) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${path}`,
    });

    return response;
  } catch (e) {
    throw e;
  }
};

export const getDataTransaction = async () => {
  try {
    const response = await api('get', 'frontend-test');
    let transactions = [];
    if (response.data) {
      transactions = Object.values(response.data);
    }
    return transactions;
  } catch (e) {
    throw e;
  }
};

export default api;
