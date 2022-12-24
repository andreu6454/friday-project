import { createSlice } from '@reduxjs/toolkit';

import { ICardPack, ICardsPacks } from './../../services/api/cards';
import { fetchCardPacks } from './../middleware/cards';
import { RequestStatusType } from './types';

interface initialStateType {
  cardsData: ICardsPacks;
  status: RequestStatusType;
  error: null | string;
}

const initialState: initialStateType = {
  cardsData: {
    cardPacks: [] as ICardPack[],
    cardPacksTotalCount: 100,
    maxCardsCount: 100,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
  },
  status: 'idle' as RequestStatusType,
  error: null,
};

const { reducer, actions } = createSlice({
  name: 'cardsSlice',
  initialState: initialState,
  reducers: {
    setNewPage: (state, { payload }) => {
      if (state.cardsData) {
        state.cardsData.page = payload;
      }
    },
    setPageCount: (state, { payload }) => {
      if (state.cardsData) {
        state.cardsData.pageCount = payload;
      }
    },
  },
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

export const { setNewPage, setPageCount } = actions;

export const cardPacksSlice = reducer;
