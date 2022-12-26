import { createSlice } from '@reduxjs/toolkit';

import {
  forgotPassword,
  loginUser,
  logOutUser,
  registerUser,
  setNewPassword,
} from '../middleware/authUser';
import { isAuthUser } from './../middleware/authUser';
import { RequestStatusType } from './types';

type initialStateType = {
  isAuth: boolean;
  status: RequestStatusType;
  error: null | string;
  isRegistered: boolean;
  isForgotEmail: string | null;
  isPasswordChanged: boolean;
};

const initialState: initialStateType = {
  isAuth: false,
  status: 'idle',
  error: null,
  isRegistered: false,
  isForgotEmail: null,
  isPasswordChanged: false,
};

const { reducer, actions } = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    setIsForgotEmail: (state, { payload }) => {
      state.isForgotEmail = payload;
    },
    setErrorMsg: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.fulfilled, (state) => {
        state.isAuth = true;
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.status = 'failed';
      })
      //////////////
      .addCase(registerUser.fulfilled, (state) => {
        state.isRegistered = true;
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.status = 'failed';
      })
      //////////////
      .addCase(isAuthUser.fulfilled, (state) => {
        state.isAuth = true;
        state.status = 'succeeded';
      })
      .addCase(isAuthUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(isAuthUser.rejected, (state) => {
        state.status = 'failed';
      })
      //////////////
      .addCase(logOutUser.fulfilled, (state) => {
        state.isAuth = false;
        state.status = 'succeeded';
      })
      .addCase(logOutUser.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.status = 'failed';
      })
      //////////////
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.status = 'failed';
      })
      //////////////
      .addCase(setNewPassword.fulfilled, (state) => {
        state.isPasswordChanged = true;
        state.status = 'succeeded';
      })
      .addCase(setNewPassword.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.status = 'failed';
      });
  },
});

export const { setErrorMsg, setIsForgotEmail } = actions;

export const authActions = { ...actions };
export const authSlice = reducer;
