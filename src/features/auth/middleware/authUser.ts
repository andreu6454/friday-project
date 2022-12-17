import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  authAPI,
  GetLoginType,
  ResponseLoginDataType,
} from './../../../services/api/auth';
import { handlerAsyncError } from './../utils/error-utils';

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
