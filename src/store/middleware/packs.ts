import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAddPackSubmit } from 'sections/packs-page/AddNewPackModal';
import { packsAPI } from 'services/api/packs';
import {
  ICardPack,
  ICardsPacks,
  IEditPackRequest,
  IGetCardsPacksParams,
} from 'services/type';
import { handlerAsyncError } from 'utils';

export const fetchPacks = createAsyncThunk<
  ICardsPacks,
  IGetCardsPacksParams,
  { rejectValue: string }
>('card/packs', async (params, thunkApi) => {
  try {
    const response = await packsAPI.getCardsPacks({ ...params });
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});

export const addNewPack = createAsyncThunk<
  { newCardsPack: ICardPack },
  IAddPackSubmit,
  { rejectValue: string }
>('card/addNewPack', async (userData, thunkApi) => {
  try {
    const response = await packsAPI.addCardPack(userData);
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

export const editPack = createAsyncThunk<
  { updatedCardsPack: ICardPack },
  IEditPackRequest,
  { rejectValue: string }
>('card/editCardPack', async (params, thunkApi) => {
  try {
    const response = await packsAPI.editPack(params);
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});

export const asyncPackActions = {
  fetchPacks,
  addNewPack,
  deletePack,
  editPack,
};
