import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, setIsAuthChecked } from './userSlice';
import {
  TRegisterData,
  getUserApi,
  updateUserApi,
  logoutApi,
  loginUserApi,
  TLoginData,
  registerUserApi,
  isTokenExists
} from '@api';
import { deleteCookie } from '../../../utils/cookie';

const clearTokens = () => {
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
};

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (isTokenExists()) {
      getUserApi()
        .then((user) => dispatch(setUser(user.user)))
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

export const login = createAsyncThunk('user/login', async (data: TLoginData) =>
  loginUserApi(data)
);

export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  clearTokens();
});

export const fetchCheckUserAuth = createAsyncThunk('user/get', async () =>
  getUserApi()
);

export const fetchUpdateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const fetchRegisterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);
