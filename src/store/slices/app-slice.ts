import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RequestStatusType } from './types';

const initialState = {
  isAuth: false,
  status: 'idle' as RequestStatusType,
  error: null as null | string,
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState: initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error;
    },
  },
});

export const appReducer = appSlice.reducer;
export const setStatusAC = appSlice.actions.setStatus;
export const setErrorAC = appSlice.actions.setError;
