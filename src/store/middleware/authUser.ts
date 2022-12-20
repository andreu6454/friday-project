import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  authAPI,
  GetLoginType,
  getRegisterType,
  ResponseLoginDataType,
  ResponseLogOutDataType,
  ResponseRegisterDataType,
} from '../../services/api/auth';
import { handlerAsyncError } from '../../utils/error-utils';

export const loginUser = createAsyncThunk<
  ResponseLoginDataType,
  GetLoginType,
  { rejectValue: string }
>('auth/loginUser', async (params, thunkApi) => {
  try {
    const response = await authAPI.login(params);
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});

export const registerUser = createAsyncThunk<
  ResponseRegisterDataType,
  getRegisterType,
  { rejectValue: string }
>('/auth/register', async (params, thunkApi) => {
  try {
    const response = await authAPI.register(params);
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});

export const isAuthUser = createAsyncThunk<
  ResponseLoginDataType,
  void,
  { rejectValue: string }
>('/auth/me', async (_, thunkApi) => {
  try {
    const response = await authAPI.me();
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});
export const logOutUser = createAsyncThunk<
  ResponseLogOutDataType,
  void,
  { rejectValue: string }
>('logout', async (_, thunkApi) => {
  try {
    const response = await authAPI.logOut();
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});
