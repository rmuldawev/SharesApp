import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = 'pk_987404f82f2e4d039503ec72d0fdc68f'
const baseService = axios.create({
    baseURL: 'https://cloud.iexapis.com/stable/',
  });


  export const getShares = createAsyncThunk('ShareSlice/getShares', async () => {
    const response = await baseService.get(`stock/aapl/quote?token=${token}`);
    return response.data;
  });

  interface ShareSliceState {
    items: any[];
    status: string;
    error: string | null;
  }

  const initialState: ShareSliceState = {
    items: [],
    status: 'idle',
    error: null,
  };

export const dataSlice = createSlice({
  name: 'ShareSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShares.pending, (state) => {
        state.status = 'loading'; 
      })
      .addCase(getShares.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.items = action.payload;
      })
      // .addCase(getShares.rejected, (state, action) => {
      //   state.status = 'failed'; // Устанавливаем статус ошибки
      //   state.error = action.error.message;
      // });
  },
});

export default dataSlice.reducer;

export const selectData = (state: RootState) => state.data.items
// export const selectShares = (state:RootState) => state.data.items
// export const selectShares = (state:RootState) => state.data.items;
