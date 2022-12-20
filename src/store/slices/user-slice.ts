import { createSlice } from '@reduxjs/toolkit';

import { ResponseLoginDataType } from '../../services/api';
import { getUserData } from '../middleware/user';

const initialState = {
  user: {} as ResponseLoginDataType,
};

const { reducer, actions } = createSlice({
  name: 'userSlice',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserData.fulfilled, (state, { payload }) => {
      state.user = payload as ResponseLoginDataType;
    });
  },
});

export const userSlice = reducer;
