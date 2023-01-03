import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { filterActions } from 'store/slices/fliter-slice';

import { asyncPackActions } from './../store/middleware/packs';
import { useAppSelector } from './../store/store';
import { useActions } from './useActions';

export const usePacksTableData = () => {
  const { fetchPacks } = useActions(asyncPackActions);

  const error = useAppSelector((state) => state.packs.error);
  const cardData = useAppSelector((state) => state.packs.packData);
  const loading = useAppSelector((state) => state.packs.status);

  /// filters
  const page = useAppSelector((state) => state.filter.page);
  const pageCount = useAppSelector((state) => state.filter.pageCount);
  const totalCount = useAppSelector((state) => state.filter.totalCount);
  const minMax = useAppSelector((state) => state.filter.minMax);
  const category = useAppSelector((state) => state.filter.category);
  const searchValue = useAppSelector((state) => state.filter.searchValue);
  const userId = useAppSelector((state) => state.user.user._id);

  const currentCategory = category === 'my' ? userId : '';

  const isLoadingPack = loading === 'loading';

  useEffect(() => {
    fetchPacks({
      page: page,
      pageCount: pageCount,
      user_id: currentCategory,
      packName: searchValue,
      min: minMax[0],
      max: minMax[1],
    });
  }, [pageCount, page, category, minMax, searchValue]);

  return {
    totalCount,
    cardData,
    isLoadingPack,
    error,
  };
};
