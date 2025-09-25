import { fetchGetIngredients } from './actions';
import reducer from './ingredientsSlice';
import { initialState } from './ingredientsSlice';
import { expect, test, jest } from '@jest/globals';
import { ingredientData } from './ingredientData';

describe('Проверка слайса constructorSlice', () => {
  test('экшен будет отправлен перед вызовом асинхронной функции', () => {
    const store = reducer(initialState, fetchGetIngredients.pending(''));

    expect(true).toBe(store.isLoading);
  });

  test('асинхронная функция завершится без ошибки', () => {
    const store = reducer(
      initialState,
      fetchGetIngredients.fulfilled(ingredientData, '')
    );

    expect(false).toBe(store.isLoading);
    expect(ingredientData).toEqual(store.ingredients);
  });

  test('асинхронная функция завершится с ошибкой', () => {
    const error = new Error('error_message');
    const store = reducer(
      initialState,
      fetchGetIngredients.rejected(error, '')
    );

    expect(false).toBe(store.isLoading);
    expect(error.message).toEqual(store.error);
  });
});
