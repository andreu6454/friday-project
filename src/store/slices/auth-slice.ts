import { createSlice } from '@reduxjs/toolkit';

import { loginUser, registerUser } from '../middleware/authUser';
import { isAuthUser } from './../middleware/authUser';
import { RequestStatusType } from './types';

type initialStateType = {
  isAuth: boolean;
  status: RequestStatusType;
  error: null | string;
  isRegistered: boolean;
};

const initialState: initialStateType = {
  isAuth: false,
  status: 'idle',
  error: null,
  isRegistered: false,
};

const { reducer, actions } = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    setErrorMsg: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.error = payload as string;
      })
      //////////////
      .addCase(registerUser.fulfilled, (state) => {
        state.isRegistered = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.error = payload as string;
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
      });
  },
});

export const { setErrorMsg } = actions;

export const authSlice = reducer;
