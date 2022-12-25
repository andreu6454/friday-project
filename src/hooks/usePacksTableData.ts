import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ICardPack } from './../services/api/packs';
import { asyncPackActions } from './../store/middleware/packs';
import { packActions } from './../store/slices/packs-slice';
import { useAppSelector } from './../store/store';
import { formateDate } from './../utils/formateDate';
import { useActions } from './useActions';

export const usePacksTableData = () => {
  const [search, setSearch] = useSearchParams();

  const cardData = useAppSelector((state) => state.packs.cardsData);
  const loading = useAppSelector((state) => state.packs.status);
  const page = useAppSelector((state) => state.packs.cardsData.page);
  const pageCount = useAppSelector((state) => state.packs.cardsData.pageCount);
  const totalCount = useAppSelector((state) => state.packs.cardsData.cardPacksTotalCount);

  const { setNewPage, setPageCount } = useActions(packActions);
  const { fetchPacks, addNewPack } = useActions(asyncPackActions);

  const category = search.get('category');
  const packName = search.get('search_term') || '';
  const min = search.get('min') || '';
  const max = search.get('max') || '';

  const userId = useAppSelector((state) => state.user.user._id);
  const fetchActiveCategory = category === 'my' ? userId : '';
  const loadingStatus = loading === 'loading';
  const isActiveCategory = category === 'all';

  useEffect(() => {
    if (!category) {
      search.set('category', 'all');
      setSearch(search);
      return;
    }

    fetchPacks({
      page: page,
      pageCount: pageCount,
      user_id: fetchActiveCategory,
      packName: packName,
      max: +max,
      min: +min,
    });
  }, [search, pageCount, page]);

  const renderActionsCells = (cardData ? cardData.cardPacks : []).map(
    (el: ICardPack) => ({
      ...el,
      id: el._id,
      updated: formateDate(el.updated),
    }),
  );

  return {
    search,
    setSearch,
    addNewPack,
    isActiveCategory,
    page,
    totalCount,
    renderActionsCells,
    pageCount,
    setNewPage,
    loadingStatus,
    setPageCount,
  };
};
