import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

import {
  fetchBurgerOrder,
  fetchOrdersListAll,
  fetchOrdersList,
  fetchOrderByNumber
} from './actions';

type TOrderSliceState = {
  isLoad: boolean;
  orderData: TOrder | null;
  orderList: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
};

const initialState: TOrderSliceState = {
  isLoad: false,
  orderData: null,
  orderList: [],
  total: 0,
  totalToday: 0,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrdert(state) {
      state.isLoad = false;
      state.orderData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBurgerOrder.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(fetchBurgerOrder.rejected, (state, action) => {
        state.isLoad = false;
      })
      .addCase(fetchBurgerOrder.fulfilled, (state, action) => {
        state.orderData = action.payload.order;
        state.isLoad = false;
      })
      .addCase(fetchOrdersListAll.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(fetchOrdersListAll.rejected, (state, action) => {
        state.isLoad = false;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchOrdersListAll.fulfilled, (state, action) => {
        state.orderList = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoad = false;
      })
      .addCase(fetchOrdersList.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(fetchOrdersList.rejected, (state, action) => {
        state.isLoad = false;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchOrdersList.fulfilled, (state, action) => {
        state.orderList = action.payload;
        state.isLoad = false;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoad = false;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderData = action.payload.orders[0];
        state.isLoad = false;
      });
  }
});

export const { clearOrdert } = orderSlice.actions;

export default orderSlice.reducerPath;
