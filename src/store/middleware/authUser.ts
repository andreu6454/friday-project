import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from 'services/api/auth';
import {
  GetForgotPasswordDataType,
  GetLoginType,
  getRegisterType,
  GetSetNewPasswordDataType,
  ResponseLoginDataType,
  ResponseLogOutDataType,
  ResponseNewPassword,
  ResponseRegisterDataType,
} from 'services/type';
import { setIsForgotEmail } from 'store/slices';
import { handlerAsyncError } from 'utils/error-utils';

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
>('user/logout', async (_, thunkApi) => {
  try {
    const response = await authAPI.logOut();
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});

export const forgotPassword = createAsyncThunk<
  ResponseNewPassword,
  GetForgotPasswordDataType,
  { rejectValue: string }
>('/auth/forgot', async (params, thunkApi) => {
  try {
    const response = await authAPI.forgot(params);
    await thunkApi.dispatch(setIsForgotEmail(params.email));
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});

export const setNewPassword = createAsyncThunk<
  ResponseNewPassword,
  GetSetNewPasswordDataType,
  { rejectValue: string }
>('/auth/set-new-password', async (params, thunkApi) => {
  try {
    const response = await authAPI.newPassword(params);
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});

export const authAsyncActions = {
  setNewPassword,
  forgotPassword,
  logOutUser,
  loginUser,
  registerUser,
  isAuthUser,
};
