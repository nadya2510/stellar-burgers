import { RootState } from '@store';
export const selectIsLoading = (state: RootState) =>
  state.ingredientsSlice.isLoading;
export const selectIngredients = (state: RootState) =>
  state.ingredientsSlice.ingredients;
export const selectConstructorItems = (state: RootState) =>
  state.constructorSlice.constructorItems;

export const selectUser = (state: RootState) => state.userSlice.user;

export const selectIsAuthChecked = (state: RootState) =>
  state.userSlice.isAuthChecked;

export const selectOrderRequest = (state: RootState) => state.orderSlice.isLoad;

export const selectOrderModalData = (state: RootState) =>
  state.orderSlice.orderData;
export const selectOrderList = (state: RootState) => state.orderSlice.orderList;
export const selectOrderTotal = (state: RootState) => state.orderSlice.total;
export const selectOrderTotalToday = (state: RootState) =>
  state.orderSlice.totalToday;
export const selectOrderError = (state: RootState) => state.orderSlice.error;
