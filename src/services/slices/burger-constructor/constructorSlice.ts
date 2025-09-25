import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  TConstructorItems,
  TIngredient,
  TConstructorIngredient
} from '@utils-types';
import { nanoid } from 'nanoid';

export type TConstructorSliceState = {
  constructorItems: TConstructorItems;
};

const initialState: TConstructorSliceState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push({
          ...action.payload,
          id: nanoid()
        });
      }
    },
    removeIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      if (action.payload.type !== 'bun') {
        state.constructorItems.ingredients =
          state.constructorItems.ingredients.filter(
            (b) => b.id !== action.payload.id
          );
      }
    },

    moveIngredient(
      state,
      action: PayloadAction<{ index: number; move: 'up' | 'down' }>
    ) {
      let indexNew = 0;
      const curent = state.constructorItems.ingredients[action.payload.index];

      if (action.payload.move === 'up') {
        indexNew = action.payload.index - 1;
      } else {
        indexNew = action.payload.index + 1;
      }

      state.constructorItems.ingredients[action.payload.index] =
        state.constructorItems.ingredients[indexNew];
      state.constructorItems.ingredients[indexNew] = curent;
    },
    clearConstructorOrdert(state) {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    }
  }
});
export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructorOrdert
} = constructorSlice.actions;

export default constructorSlice.reducer;
//export default constructorSlice.reducer;
