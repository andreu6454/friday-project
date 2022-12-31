import { createSlice } from '@reduxjs/toolkit';
import { ICardsResponse } from 'services/type';
import { deleteCard, fetchCards } from 'store/middleware/cards';
import { editPack } from 'store/middleware/packs';

import { addNewCard, updateCardGrade } from './../middleware/cards';
import { RequestStatusType } from './types';

type initialStateType = {
  cardsData: Omit<ICardsResponse, 'maxGrade' | 'minGrade'>;
  status: RequestStatusType;
  error: null | string;
  actionStatus: null | string;
};

const initialState: initialStateType = {
  cardsData: {
    cards: [],
    page: 1,
    pageCount: 10,
    cardsTotalCount: 0,
    packUserId: '',
    packName: '',
    private: false,
  },
  status: 'loading' as RequestStatusType,
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
    setError: (state, { payload }) => {
      state.error = payload;
    },
    clearCardsData: (state) => {
      state.cardsData.cards = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCards.fulfilled, (state, { payload }) => {
        state.cardsData = payload;
        state.error = null;
        state.status = 'succeeded';
      })
      .addCase(fetchCards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCards.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.status = 'failed';
      })
      /////////////
      .addCase(addNewCard.fulfilled, (state, { payload }) => {
        state.cardsData.cards.unshift(payload.newCard);
        state.actionStatus = 'Card successfully added';
        state.status = 'succeeded';
      })
      .addCase(addNewCard.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewCard.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.status = 'failed';
      })
      /////////////
      .addCase(deleteCard.fulfilled, (state, { payload }) => {
        const findIndexCard = state.cardsData.cards.findIndex(
          (pack) => pack.cardsPack_id === payload.deletedCard.cardsPack_id,
        );
        if (findIndexCard > -1) {
          state.cardsData.cards.splice(findIndexCard, 1);
        }
        state.status = 'succeeded';
        state.actionStatus = 'CardPack successfully deleted';
      })
      .addCase(deleteCard.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCard.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.status = 'failed';
      })
      ///////////////////////
      .addCase(updateCardGrade.fulfilled, (state, { payload }) => {
        const findIndexCard = state.cardsData.cards.findIndex(
          (card) => card._id === payload.updatedGrade.card_id,
        );
        if (findIndexCard > -1) {
          state.cardsData.cards[findIndexCard].shots = payload.updatedGrade.shots;
        }
        state.status = 'succeeded';
      })
      .addCase(updateCardGrade.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCardGrade.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.status = 'failed';
      })
      /////////////////////////
      .addCase(editPack.fulfilled, (state, { payload }) => {
        state.cardsData.packName = payload.updatedCardsPack.name;
      });
  },
});

export const cardActions = {
  ...actions,
};

export const cardsSlice = reducer;
