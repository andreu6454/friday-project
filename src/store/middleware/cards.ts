import { createAsyncThunk } from '@reduxjs/toolkit';
import { cardsAPI } from 'services/api';
import {
  GradeType,
  IAddNewCardRequest,
  ICard,
  ICardParams,
  ICardsResponse,
} from 'services/type';
import { RootState } from 'store/store';
import { handlerAsyncError } from 'utils';

export const fetchCards = createAsyncThunk<
  ICardsResponse,
  ICardParams,
  { rejectValue: string }
>('card/fetchCards', async (params, thunkApi) => {
  try {
    const response = await cardsAPI.getCards({ ...params });
    const { packs } = thunkApi.getState() as RootState;
    const { cardPacks } = packs.packData;

    const findIndexPack = cardPacks.findIndex((pack) => pack._id === params.cardsPack_id);
    if (findIndexPack > -1) {
      //return data with packName
      return { ...response.data, packName: cardPacks[findIndexPack].name };
    }
    return { ...response.data, packName: 'No pack Name' };
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
