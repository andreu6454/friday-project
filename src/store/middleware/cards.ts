import { createAsyncThunk } from '@reduxjs/toolkit';

import { handlerAsyncError } from '../../utils';
import { cardsAPI, ICardsPacks, IGetCardsPacksParams } from './../../services/api/cards';

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
