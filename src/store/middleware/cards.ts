import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICardParams, ICardsResponse } from 'services/api/cards';
import { cardsAPI, GradeType, IAddNewCardRequest, ICard } from 'services/api/cards';
import { handlerAsyncError } from 'utils';

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
>('card/addNewCard', async (newCard, thunkApi) => {
  try {
    const response = await cardsAPI.addNewCard(newCard);
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
      grade: 0,
    });
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});

export const updateCardGrade = createAsyncThunk<
  { updatedGrade: GradeType },
  { grade: number; card_id: string },
  { rejectValue: string }
>('card/updateCard', async ({ grade, card_id }, thunkApi) => {
  try {
    const response = await cardsAPI.grade(grade, card_id);
    return response.data;
  } catch (error) {
    return handlerAsyncError(error, thunkApi);
  }
});

export const asyncCardActions = {
  deleteCard,
  addNewCard,
  updateCardGrade,
  fetchCards,
};
