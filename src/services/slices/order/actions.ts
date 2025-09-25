import {
  orderBurgerApi,
  getOrdersApi,
  getFeedsApi,
  getOrderByNumberApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBurgerOrder = createAsyncThunk(
  'order/fetchBurgerOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const fetchOrdersList = createAsyncThunk(
  'order/fetchOrdersList',
  async () => getOrdersApi()
);

export const fetchOrdersListAll = createAsyncThunk(
  'order/fetchOrdersListAll',
  async () => getFeedsApi()
);

export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchOrderByNumber',
  async (data: number) => getOrderByNumberApi(data)
);
