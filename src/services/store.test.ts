import { rootReducer, store } from './store';

describe('Инициализация rootReducer', () => {
  test('Вызов rootReducer с undefined состоянием и экшеном, который не обрабатывается ни одним редьюсером', () => {
    const expected = store.getState();
    const actual = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(expected).toEqual(actual);
  });
});
