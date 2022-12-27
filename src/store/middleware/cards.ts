import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICardParams, ICardsResponse } from 'services/api/cards';
import { handlerAsyncError } from 'utils';

import { cardsAPI, IAddNewCardRequest, ICard } from './../../services/api/cards';

export const fetchCards = createAsyncThunk<
  ICardsResponse,
  ICardParams,
  { rejectValue: string }
>('card/fetchCards', async (params, thunkApi) => {
  try {
    const response = await cardsAPI.getCards({ ...params });
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});

export const addNewCard = createAsyncThunk<
  { newCard: ICard },
  IAddNewCardRequest,
  { rejectValue: string }
>('card/addNewCard', async ({ cardsPack_id }, thunkApi) => {
  try {
    const response = await cardsAPI.addNewCard({
      cardsPack_id,
    });
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});

export const deleteCard = createAsyncThunk<
  { deletedCard: ICard },
  IAddNewCardRequest,
  { rejectValue: string }
>('card/deleteCard', async ({ cardsPack_id }, thunkApi) => {
  try {
    const response = await cardsAPI.addNewCard({
      cardsPack_id,
    });
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});

export const asyncCardActions = {
  deleteCard,
  addNewCard,
  fetchCards,
};
