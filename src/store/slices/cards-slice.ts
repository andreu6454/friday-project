import { createSlice } from '@reduxjs/toolkit';

import { ICardsPacks } from './../../services/api/cards';
import { fetchCardPacks } from './../middleware/cards';
import { RequestStatusType } from './types';

type initialStateType = {
  cardsData: ICardsPacks | null;
  status: RequestStatusType;
  error: null | string;
};

const initialState: initialStateType = {
  cardsData: null,
  status: 'idle' as RequestStatusType,
  error: null,
};

const { reducer, actions } = createSlice({
  name: 'cardsSlice',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCardPacks.fulfilled, (state, { payload }) => {
        state.cardsData = payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCardPacks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCardPacks.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.status = 'failed';
      });
  },
});

export const cardPacksSlice = reducer;
