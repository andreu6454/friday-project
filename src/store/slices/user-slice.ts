import { createSlice } from '@reduxjs/toolkit';
import { ResponseLoginDataType } from 'services/type';
import { isAuthUser, loginUser, logOutUser } from 'store/middleware/authUser';
import { changeUserAvatar, changeUserName } from 'store/middleware/user';

const initialState = {
  user: {} as ResponseLoginDataType,
};

const { reducer, actions } = createSlice({
  name: 'userSlice',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(isAuthUser.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(changeUserName.fulfilled, (state, { payload }) => {
        state.user.name = payload.updatedUser.name;
      })
      .addCase(changeUserAvatar.fulfilled, (state, { payload }) => {
        state.user.avatar = payload.updatedUser.avatar;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.user = {} as ResponseLoginDataType;
      });
  },
});

export const userSlice = reducer;
