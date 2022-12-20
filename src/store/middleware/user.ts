import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  authAPI,
  ResponseLoginDataType,
  ResponseUpdateUserDataType,
} from '../../services/api';
import { handlerAsyncError } from '../../utils';

export const getUserData = createAsyncThunk<
  ResponseLoginDataType,
  void,
  { rejectValue: string }
>('getUserData', async (_, thunkApi) => {
  try {
    const response = await authAPI.me();
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});

export const changeUserName = createAsyncThunk<
  ResponseUpdateUserDataType,
  { name: string },
  { rejectValue: string }
>('changeUserName', async (params, thunkApi) => {
  try {
    const response = await authAPI.updateUser(params.name);
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});
export const changeUserAvatar = createAsyncThunk<
  ResponseUpdateUserDataType,
  { avatar: string },
  { rejectValue: string }
>('changeUserAvatar', async (params, thunkApi) => {
  try {
    const response = await authAPI.updateUser(params.avatar);
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});
