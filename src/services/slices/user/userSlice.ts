import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { login, logout, fetchUpdateUser, fetchRegisterUser } from './actions';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  errorText: string | null;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  errorText: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  selectors: {
    selectorUser: (state) => state.user,
    selectorIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.user = { name: '', email: '' };
        state.errorText = action.error.message ?? null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.user = { name: '', email: '' };
        state.errorText = action.error.message ?? null;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.user;
        }
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.errorText = action.error.message!;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        console.log('fetchRegisterUser');
      });
  }
});

export const { setIsAuthChecked, setUser } = userSlice.actions;
export default userSlice.reducer;
