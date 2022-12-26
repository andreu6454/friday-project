import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  ICardPack,
  ICardsPacks,
  IGetCardsPacksParams,
  packsAPI,
} from '../../services/api/packs';
import { handlerAsyncError } from '../../utils';
import { cardActions } from '../slices';

export const fetchPacks = createAsyncThunk<
  ICardsPacks,
  IGetCardsPacksParams,
  { rejectValue: string }
>('card/packs', async (params, thunkApi) => {
  try {
    const response = await packsAPI.getCardsPacks({ ...params });
    thunkApi.dispatch(cardActions.setLoadingStatus());
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});

export const addNewPack = createAsyncThunk<
  { newCardsPack: ICardPack },
  void,
  { rejectValue: string }
>('card/addNewPack', async (_, thunkApi) => {
  try {
    const response = await packsAPI.addCardPack();
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});

export const deletePack = createAsyncThunk<
  { deletedCardsPack: ICardPack },
  { id: string },
  { rejectValue: string }
>('card/deleteCardPack', async ({ id }, thunkApi) => {
  try {
    const response = await packsAPI.deletePack(id);
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});

export const asyncPackActions = {
  fetchPacks,
  addNewPack,
  deletePack,
};
