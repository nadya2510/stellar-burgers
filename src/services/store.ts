import { configureStore, combineSlices } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import {
  constructorSlice,
  ingredientsSlice,
  userSlice,
  orderSlice
} from '@slices';

export const rootReducer = combineSlices({
  constructorSlice: constructorSlice.reducer,
  ingredientsSlice: ingredientsSlice.reducer,
  userSlice: userSlice.reducer,
  orderSlice: orderSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
