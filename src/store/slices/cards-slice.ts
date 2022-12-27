import { createSlice } from '@reduxjs/toolkit';
import { deleteCard, fetchCards } from 'store/middleware/cards';

import { ICardsResponse } from './../../services/api/cards';
import { addNewCard } from './../middleware/cards';
import { RequestStatusType } from './types';

type initialStateType = {
  cardsData: Pick<
    ICardsResponse,
    'cards' | 'page' | 'pageCount' | 'cardsTotalCount' | 'packName' | 'packUserId'
  >;
  status: RequestStatusType;
  error: null | string;
  actionStatus: null | string;
};

const initialState: initialStateType = {
  cardsData: {
    cards: [],
    page: 0,
    pageCount: 10,
    cardsTotalCount: 0,
    packUserId: '',
    packName: '',
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
    setLoadingStatus: (state) => {
      state.status = 'idle';
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
          (item) => item.cardsPack_id === payload.deletedCard.cardsPack_id,
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
      });
  },
});

export const cardActions = {
  ...actions,
};

export const cardsSlice = reducer;
