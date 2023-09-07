import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { baseService } from "./baseService";

const token = process.env.REACT_APP_API_TOKEN;

export const getStocks = createAsyncThunk("ShareSlice/getStocks", async () => {
  const response = await baseService.get(`stock/aapl/quote?token=${token}`);
  const data = Object.entries(response.data);

  const values = data.filter(
    (e) => e.length > 0 && e[1] !== null && e[1] !== 0 && e[1] !== true
  );

  const arrayOfObjects = values.map(function (subArray) {
    return {
      name: subArray[0],
      value: subArray[1],
    };
  });

  return arrayOfObjects;
});

interface ShareSliceState {
  items: [] | any;
  status: string;
  error: any | null;
}

const initialState: ShareSliceState = {
  items: [],
  status: "idle",
  error: null,
};

export const dataSlice = createSlice({
  name: "ShareSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStocks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStocks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getStocks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;

export const selectData = (state: RootState) => state.data.items;

export const selectObj = createSelector(selectData, (data) => {
  const obj = data.reduce((acc: any, item: any) => {
    acc[item.name] = item.value;
    return acc;
  }, {});

  return obj;
});
