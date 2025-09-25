import {
  moveIngredient,
  addIngredient,
  removeIngredient,
  clearConstructorOrdert
} from './constructorSlice';
import reducer from './constructorSlice';
import { expect, test, jest } from '@jest/globals';
import {
  mockBun,
  mockIngredient1,
  mockIngredient2,
  ingredientAdd,
  bunAdd
} from './constructorData';

const initialState = {
  constructorItems: {
    bun: mockBun,
    ingredients: [mockIngredient1, mockIngredient2]
  }
};

describe('Проверка слайса constructorSlice', () => {
  test('добавления ингредиента', () => {
    const store = reducer(initialState, addIngredient(ingredientAdd));

    const expectedIngredients = [mockIngredient1, mockIngredient2];
    expectedIngredients.push(ingredientAdd);
    const receivedIngredients = store.constructorItems.ingredients.map(
      (item) => {
        return { ...item, id: item._id };
      }
    );

    expect(receivedIngredients).toEqual(expectedIngredients);
  });

  test('замена булки', () => {
    const store = reducer(initialState, addIngredient(bunAdd));
    const receivedBun = store.constructorItems.bun;
    expect(receivedBun).toEqual(bunAdd);
  });

  test('изменения порядка ингредиентов в начинке (вниз)', () => {
    const indexIngredients = 0;
    const store = reducer(
      initialState,
      moveIngredient({ index: indexIngredients, move: 'down' })
    );

    const receivedIngredients = store.constructorItems.ingredients;
    const expectedIngredients = [mockIngredient2, mockIngredient1];

    expect(receivedIngredients).toEqual(expectedIngredients);
  });

  test('изменения порядка ингредиентов в начинке (верх)', () => {
    const indexIngredients = 1;
    const store = reducer(
      initialState,
      moveIngredient({ index: indexIngredients, move: 'up' })
    );

    const receivedIngredients = store.constructorItems.ingredients;
    const expectedIngredients = [mockIngredient2, mockIngredient1];

    expect(receivedIngredients).toEqual(expectedIngredients);
  });

  test('удаления ингредиента', () => {
    const store = reducer(initialState, removeIngredient(mockIngredient1));

    const expectedIngredients = [mockIngredient2];
    const receivedIngredients = store.constructorItems.ingredients.map(
      (item) => {
        return { ...item, id: item._id };
      }
    );
    expect(receivedIngredients).toEqual(expectedIngredients);
  });

  test('удаления булки', () => {
    const store = reducer(
      initialState,
      removeIngredient({ ...mockBun, id: mockBun._id })
    );

    const expectedBun = mockBun;
    const receivedBun = store.constructorItems.bun;
    expect(receivedBun).toEqual(expectedBun);
  });

  test('очистка конструктора', () => {
    const store = reducer(initialState, clearConstructorOrdert());

    const expected = {
      bun: null,
      ingredients: []
    };
    const received = store.constructorItems;
    expect(received).toEqual(expected);
  });
});
