import { createAsyncThunk } from '@reduxjs/toolkit';

import { handlerAsyncError } from '../../utils';
import {
  cardsAPI,
  ICardPack,
  ICardsPacks,
  IGetCardsPacksParams,
} from './../../services/api/cards';

export const fetchCardPacks = createAsyncThunk<
  ICardsPacks,
  IGetCardsPacksParams,
  { rejectValue: string }
>('card/packs', async (params, thunkApi) => {
  try {
    const response = await cardsAPI.getCardsPacks({ ...params });
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});

export const addNewCardPack = createAsyncThunk<
  { newCardsPack: ICardPack },
  void,
  { rejectValue: string }
>('card/addNewPack', async (_, thunkApi) => {
  try {
    const response = await cardsAPI.addCardPack();
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});

export const deleteCardPack = createAsyncThunk<
  { deletedCardsPack: ICardPack },
  { id: string },
  { rejectValue: string }
>('card/deleteCardPack', async ({ id }, thunkApi) => {
  try {
    const response = await cardsAPI.deleteCardPack(id);
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});
