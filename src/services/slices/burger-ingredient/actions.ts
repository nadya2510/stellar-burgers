import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGetIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);
