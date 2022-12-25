import { createSlice } from '@reduxjs/toolkit';

import { ICardPack, ICardsPacks } from '../../services/api/packs';
import { addNewPack, deletePack, fetchPacks } from '../middleware/packs';
import { cardActions } from './cards-slice';
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
  name: 'packsSlice',
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
      .addCase(fetchPacks.fulfilled, (state, { payload }) => {
        state.error = null;
        state.cardsData = payload;
        state.status = 'succeeded';
      })
      .addCase(fetchPacks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPacks.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.status = 'failed';
      })
      /////////////
      .addCase(addNewPack.fulfilled, (state, { payload }) => {
        state.cardsData.cardPacks.unshift(payload.newCardsPack);
        state.actionStatus = 'CardPack successfully added';
        state.status = 'succeeded';
      })
      .addCase(addNewPack.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewPack.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.status = 'failed';
      })
      /////////////
      .addCase(deletePack.fulfilled, (state, { payload }) => {
        const findIndexPack = state.cardsData.cardPacks.findIndex(
          (item) => item._id === payload.deletedCardsPack._id,
        );
        if (findIndexPack > -1) {
          state.cardsData.cardPacks.splice(findIndexPack, 1);
        }
        state.status = 'succeeded';
        state.actionStatus = 'CardPack successfully deleted';
      })
      .addCase(deletePack.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePack.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.status = 'failed';
      });
  },
});

export const packActions = { ...actions };

export const packsSlice = reducer;
