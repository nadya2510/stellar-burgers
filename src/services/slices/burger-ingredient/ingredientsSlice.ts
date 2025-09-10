import { fetchGetIngredients } from './actions';
import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsSliceState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

export const initialState: TIngredientsSliceState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchGetIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchGetIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export default ingredientsSlice.reducer;
