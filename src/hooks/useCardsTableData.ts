import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICard } from 'services/type';
import { asyncCardActions } from 'store/middleware/cards';
import { cardActions } from 'store/slices/cards-slice';
import { useAppSelector } from 'store/store';
import { formateDate } from 'utils/formateDate';

import { useActions } from './useActions';

export const useCardsTableData = () => {
  const status = useAppSelector((state) => state.cards.status);
  const cards = useAppSelector((state) => state.cards.cardsData.cards);
  const totalCount = useAppSelector((state) => state.cards.cardsData.cardsTotalCount);
  const page = useAppSelector((state) => state.cards.cardsData.page);
  const pageCount = useAppSelector((state) => state.cards.cardsData.pageCount);
  const packUserId = useAppSelector((state) => state.cards.cardsData.packUserId);
  const loginUserId = useAppSelector((state) => state.user.user._id);
  const packName = useAppSelector((state) => state.cards.cardsData.packName);

  const isLoadingStatus = status === 'loading';
  const isUserPackOwner = packUserId === loginUserId;

  const { id } = useParams();

  const { fetchCards } = useActions(asyncCardActions);
  const { setNewPage, setPageCount, clearCardsData } = useActions(cardActions);

  const renderActionsCells = (cards ? cards : []).map((el: ICard) => ({
    ...el,
    id: el._id,
    updated: formateDate(el.updated),
  }));

  useEffect(() => {
    if (id) {
      fetchCards({ cardsPack_id: id, page, pageCount });
    }

    return () => {
      /// clean cards data on unmount
      clearCardsData();
    };
  }, [page, pageCount]);

  return {
    page,
    pageCount,
    totalCount,
    isLoadingStatus,
    renderActionsCells,
    setNewPage,
    setPageCount,
    cards,
    status,
    isUserPackOwner,
    packName,
    id,
  };
};
