import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ICardPack } from 'services/type';

import { asyncPackActions } from './../store/middleware/packs';
import { packActions } from './../store/slices/packs-slice';
import { useAppSelector } from './../store/store';
import { formateDate } from './../utils/formateDate';
import { useActions } from './useActions';
import { useDebounce } from './useDebounce';

export const usePacksTableData = () => {
  const [search, setSearch] = useSearchParams();

  const cardData = useAppSelector((state) => state.packs.packData);
  const loading = useAppSelector((state) => state.packs.status);
  const page = useAppSelector((state) => state.packs.packData.page);
  const pageCount = useAppSelector((state) => state.packs.packData.pageCount);
  const totalCount = useAppSelector((state) => state.packs.packData.cardPacksTotalCount);

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

  const clearFilterHandle = () => {
    search.set('category', 'all');
    search.delete('min');
    search.delete('max');
    search.delete('search_term');
    setNewPage(1);
    setPageCount(10);
    setSearch(search);
  };

  const renderActionsCells = (cardData ? cardData.cardPacks : []).map(
    (el: ICardPack) => ({
      ...el,
      id: el._id,
      updated: formateDate(el.updated),
    }),
  );

  const activeCategoryHandle = (newCategory: string) => {
    search.set('category', newCategory);
    setSearch(search);
  };

  const onSearchChange = useDebounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    if (text.length === 0) {
      search.delete('search_term');
      setSearch(search, {
        replace: true,
      });
    } else {
      search.set('search_term', text);
      setSearch(search, {
        replace: true,
      });
    }
  }, 500);

  return {
    search,
    isActiveCategory,
    page,
    totalCount,
    renderActionsCells,
    pageCount,
    setNewPage,
    loadingStatus,
    setPageCount,
    activeCategoryHandle,
    onSearchChange,
    clearFilterHandle,
  };
};
