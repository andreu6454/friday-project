import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { asyncPackActions } from './../store/middleware/packs';
import { useAppSelector } from './../store/store';
import { useActions } from './useActions';

export const usePacksTableData = () => {
  const { fetchPacks } = useActions(asyncPackActions);

  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category');
  const currentPageCount = searchParams.get('pageCount') || '10';

  const error = useAppSelector((state) => state.packs.error);
  const cardData = useAppSelector((state) => state.packs.packData);
  const loading = useAppSelector((state) => state.packs.status);
  const totalCount = useAppSelector((state) => state.packs.packData.cardPacksTotalCount);

  const userId = useAppSelector((state) => state.user.user._id);

  const isLoadingPack = loading === 'loading';
  const isMineCategory = activeCategory === 'my';

  useEffect(() => {
    if (![...searchParams].length) {
      fetchPacks({
        page: 1,
        pageCount: 10,
        user_id: '',
        packName: '',
        min: 0,
        max: 100,
      });
    }
  }, []);

  useEffect(() => {
    if (cardData.cardPacks.length < 10) {
      const currentParams = Object.fromEntries([...searchParams]);
      setSearchParams({ ...currentParams, page: '1' });
    }
  }, [cardData.cardPacks]);

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    if ([...searchParams].length) {
      fetchPacks({
        ...currentParams,
        user_id: isMineCategory ? userId : '',
        pageCount: +currentPageCount,
      });
    }
  }, [searchParams]);

  return {
    totalCount,
    cardData,
    isLoadingPack,
    error,
  };
};
