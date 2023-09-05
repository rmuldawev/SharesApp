import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = 'pk_987404f82f2e4d039503ec72d0fdc68f'
const baseService = axios.create({
    baseURL: 'https://cloud.iexapis.com/stable/',
  });


  export const getShares = createAsyncThunk('ShareSlice/getShares', async () => {
    const response = await baseService.get(`stock/aapl/quote?token=${token}`);
    const data = Object.entries(response.data)

    const values = data.filter(
      (e) => e.length > 0 && e[1] !== null 
      && e[1] !== 0
    );
  
    const arrayOfObjects = values.map(function (subArray) {
      return {
        name: subArray[0],
        value: subArray[1],
      };
    });
    return arrayOfObjects;
    // return data
  });

  interface ShareSliceState {
    items:  [] | any;
    status: string;
    error: any | null;
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
      .addCase(getShares.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;

export const selectData = (state: RootState) => state.data.items
