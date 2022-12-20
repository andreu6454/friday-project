import { createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI, ResponseLoginDataType } from '../../services/api';
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
