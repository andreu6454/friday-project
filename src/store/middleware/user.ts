import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from 'services/api';
import { ResponseUpdateUserDataType } from 'services/type';
import { handlerAsyncError } from 'utils';

export const changeUserName = createAsyncThunk<
  ResponseUpdateUserDataType,
  { name: string },
  { rejectValue: string }
>('user/changeUserName', async (params, thunkApi) => {
  try {
    const response = await authAPI.updateUser(params.name, '');
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});

export const changeUserAvatar = createAsyncThunk<
  ResponseUpdateUserDataType,
  { avatar: string },
  { rejectValue: string }
>('user/changeUserAvatar', async (params, thunkApi) => {
  try {
    const response = await authAPI.updateUser('', params.avatar);
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});
