import { createSlice } from '@reduxjs/toolkit';
import { ICardPack, ICardsPacks } from 'services/type';
import { addNewPack, deletePack, editPack, fetchPacks } from 'store/middleware/packs';

import { RequestStatusType } from './types';

interface initialStateType {
  packData: ICardsPacks;
  status: RequestStatusType;
  error: null | string;
  actionStatus: null | string;
}

const initialState: initialStateType = {
  packData: {
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
      if (state.packData) {
        state.packData.page = payload;
      }
    },
    setPageCount: (state, { payload }) => {
      if (state.packData) {
        state.packData.pageCount = payload;
      }
    },
    setActionStatus: (state) => {
      state.actionStatus = null;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPacks.fulfilled, (state, { payload }) => {
        state.error = null;
        state.packData = payload;
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
        state.packData.cardPacks.unshift(payload.newCardsPack);
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
        const findIndexPack = state.packData.cardPacks.findIndex(
          (item) => item._id === payload.deletedCardsPack._id,
        );
        if (findIndexPack > -1) {
          state.packData.cardPacks.splice(findIndexPack, 1);
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
      })
      /////////////
      .addCase(editPack.fulfilled, (state, { payload }) => {
        const findIndexPack = state.packData.cardPacks.findIndex(
          (item) => item._id === payload.updatedCardsPack._id,
        );
        if (findIndexPack > -1) {
          state.packData.cardPacks[findIndexPack].name = payload.updatedCardsPack.name;
          state.packData.cardPacks[findIndexPack].deckCover =
            payload.updatedCardsPack.deckCover;
        }
        state.status = 'succeeded';
        state.actionStatus = 'CardPack successfully edited';
      });
  },
});

export const packActions = { ...actions };

export const packsSlice = reducer;
