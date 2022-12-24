import { createSlice } from '@reduxjs/toolkit';

import { ICardPack, ICardsPacks } from './../../services/api/cards';
import { addNewCardPack, deleteCardPack, fetchCardPacks } from './../middleware/cards';
import { RequestStatusType } from './types';

interface initialStateType {
  cardsData: ICardsPacks;
  status: RequestStatusType;
  error: null | string;
  actionStatus: null | string;
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
  actionStatus: null,
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
    setActionStatus: (state) => {
      state.actionStatus = null;
    },
    setError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCardPacks.fulfilled, (state, { payload }) => {
        state.error = null;
        state.cardsData = payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCardPacks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCardPacks.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.status = 'failed';
      })
      /////////////
      .addCase(addNewCardPack.fulfilled, (state, { payload }) => {
        state.cardsData.cardPacks.unshift(payload.newCardsPack);
        state.actionStatus = 'CardPack successfully added';
        state.status = 'succeeded';
      })
      .addCase(addNewCardPack.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewCardPack.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.status = 'failed';
      })
      /////////////
      .addCase(deleteCardPack.fulfilled, (state, { payload }) => {
        const findIndexPack = state.cardsData.cardPacks.findIndex(
          (item) => item._id === payload.deletedCardsPack._id,
        );
        if (findIndexPack > -1) {
          state.cardsData.cardPacks.splice(findIndexPack, 1);
        }
        state.status = 'succeeded';
        state.actionStatus = 'CardPack successfully deleted';
      })
      .addCase(deleteCardPack.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCardPack.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.status = 'failed';
      });
  },
});

export const { setNewPage, setPageCount, setActionStatus, setError } = actions;

export const cardPacksSlice = reducer;
