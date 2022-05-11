import {createSlice} from '@reduxjs/toolkit';

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    data: [],
  },
  reducers: {
    updateData: (state, data) => {
      state.data = data.payload;
    },
  },
});

export const {updateData} = transactionSlice.actions;

export default transactionSlice.reducer;
