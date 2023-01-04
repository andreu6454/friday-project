import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { asyncCardActions } from 'store/middleware/cards';
import { useAppSelector } from 'store/store';

import { useActions } from './useActions';

export const useCardsTableData = () => {
  const [searchParams] = useSearchParams();

  const cards = useAppSelector((state) => state.cards.cardsData.cards);
  const totalCount = useAppSelector((state) => state.cards.cardsData.cardsTotalCount);

  const packName = useAppSelector((state) => state.cards.cardsData.packName);

  const { id } = useParams();
  const { fetchCards } = useActions(asyncCardActions);

  const page = searchParams.get('page') || '1';
  const pageCount = searchParams.get('page') || '10';

  useEffect(() => {
    if (![...searchParams].length && id) {
      fetchCards({
        cardsPack_id: id,
        page: Number(page),
        pageCount: Number(pageCount),
      });
    }
  }, []);

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    if ([...searchParams].length && id) {
      fetchCards({ ...currentParams, cardsPack_id: id });
    }
  }, [searchParams]);

  return {
    totalCount,
    cards,
    packName,
    id,
  };
};
