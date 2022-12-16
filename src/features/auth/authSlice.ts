import { createSlice } from '@reduxjs/toolkit';

import { loginUser } from './middleware/authUser';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

type initialStateType = {
  isAuth: boolean;
  status: RequestStatusType;
  error: null | string;
};

const initialState: initialStateType = {
  isAuth: false,
  status: 'idle',
  error: null,
};

const { reducer, actions } = createSlice({
  name: 'auth',
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
      });
  },
});

export const { setErrorMsg } = actions;

export const authSlice = reducer;
