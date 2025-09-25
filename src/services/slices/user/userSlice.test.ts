import {
  initialStatUser,
  setIsAuthChecked,
  setUser,
  selectorUser,
  selectorIsAuthChecked
} from './userSlice';
import {
  login,
  logout,
  fetchUpdateUser,
  fetchRegisterUser,
  checkUserAuth
} from './actions';
import reducer from './userSlice';
import { expect, test, jest } from '@jest/globals';
import * as api from '@api';
import { configureStore } from '@reduxjs/toolkit';
import { mockUser, mockLoginDate, mockAuthResponse } from './userData';

afterAll(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe('Проверка слайса userSlice', () => {
  test('заполнение user', () => {
    const store = reducer(initialStatUser, setUser(mockUser));
    expect(store.user).toEqual(mockUser);
  });

  test('заполнение isAuthChecked', () => {
    const store = reducer(initialStatUser, setIsAuthChecked(true));
    expect(store.isAuthChecked).toEqual(true);
  });

  //-----login
  test('экшен будет отправлен перед вызовом асинхронной функции login', () => {
    const store = reducer(initialStatUser, login.pending('', mockLoginDate));

    expect(false).toBe(store.isAuthChecked);
  });

  test('асинхронная функция завершится без ошибки login', () => {
    const store = reducer(
      initialStatUser,
      login.fulfilled(mockAuthResponse, '', mockLoginDate)
    );

    expect(true).toBe(store.isAuthChecked);
    expect(mockUser).toEqual(store.user);
  });

  test('асинхронная функция завершится с ошибкой login', () => {
    const error = new Error('error_message');
    const store = reducer(
      initialStatUser,
      login.rejected(error, '', mockLoginDate)
    );
    const userError = { name: '', email: '' };

    expect(false).toBe(store.isAuthChecked);
    expect(error.message).toEqual(store.errorText);
    expect(userError).toEqual(store.user);
  });
  //-----logout
  test('асинхронная функция завершится без ошибки logout', () => {
    const store = reducer(initialStatUser, logout.fulfilled(undefined, ''));
    expect(null).toEqual(store.user);
  });
  //-----fetchUpdateUser
  test('асинхронная функция завершится без ошибки fetchUpdateUser', () => {
    const store = reducer(
      initialStatUser,
      fetchUpdateUser.fulfilled(mockAuthResponse, '', mockLoginDate)
    );

    expect(mockUser).toEqual(store.user);
  });

  test('асинхронная функция завершится с ошибкой fetchUpdateUser', () => {
    const error = new Error('error_message');
    const store = reducer(
      initialStatUser,
      fetchUpdateUser.rejected(error, '', mockLoginDate)
    );
    const userError = { name: '', email: '' };

    expect(error.message).toEqual(store.errorText);
    expect(userError).toEqual(store.user);
  });
  //-----fetchRegisterUser
  test('асинхронная функция завершится без ошибки fetchRegisterUser', () => {
    const store = reducer(
      initialStatUser,
      fetchRegisterUser.fulfilled(mockAuthResponse, '', mockUser)
    );
    expect(true).toBe(store.isAuthChecked);
    expect(mockUser).toEqual(store.user);
  });

  test('асинхронная функция завершится с ошибкой fetchRegisterUser', () => {
    const error = new Error('error_message');
    const store = reducer(
      initialStatUser,
      fetchRegisterUser.rejected(error, '', mockUser)
    );

    expect(error.message).toEqual(store.errorText);
  });
  //-----checkUserAuth
  test('проверка авторизации checkUserAuth- токена нет', async () => {
    const getUserApiMock = jest
      .spyOn(api, 'getUserApi')
      .mockImplementation(() =>
        Promise.resolve({
          success: true,
          user: mockUser
        })
      );

    const isTokenExists = jest
      .spyOn(api, 'isTokenExists')
      .mockImplementation(() => true);

    const store = configureStore({
      reducer: reducer,
      preloadedState: initialStatUser
    });
    // ожидаем завершение выполнения асинхронного экшена
    await store.dispatch(checkUserAuth());

    const receivedUser = selectorUser({ user: store.getState() });
    const receivedIsAuthChecked = selectorIsAuthChecked({
      user: store.getState()
    });
    expect(getUserApiMock).toHaveBeenCalled();
    expect(receivedIsAuthChecked).toBe(true);
    expect(receivedUser).toEqual(mockUser);
  });

  test('проверка авторизации checkUserAuth- токен есть', async () => {
    const isTokenExists = jest
      .spyOn(api, 'isTokenExists')
      .mockImplementation(() => false);

    const store = configureStore({
      reducer: reducer,
      preloadedState: initialStatUser
    });

    await store.dispatch(checkUserAuth());
    const receivedIsAuthChecked = selectorIsAuthChecked({
      user: store.getState()
    });

    expect(receivedIsAuthChecked).toBe(true);
  });
});
