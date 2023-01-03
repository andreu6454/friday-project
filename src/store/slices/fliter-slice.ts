import { createSlice } from '@reduxjs/toolkit';
import { fetchPacks } from 'store/middleware/packs';

export type categoryType = 'all' | 'my';

type initialStateType = {
  searchValue: string;
  minMax: number[];
  page: number;
  pageCount: number;
  category: categoryType;
  totalCount?: number;
};

const initialState: initialStateType = {
  searchValue: '',
  minMax: [0, 100],
  page: 1,
  pageCount: 10,
  category: 'all',
};

const { reducer, actions } = createSlice({
  name: 'filterSlice',
  initialState: initialState,
  reducers: {
    setSearchValue: (state, { payload }) => {
      state.searchValue = payload;
    },
    setMinMax: (state, { payload }) => {
      state.minMax = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.page = payload;
    },
    setPageCount: (state, { payload }) => {
      state.pageCount = payload;
    },
    setCategory: (state, { payload }) => {
      state.category = payload;
    },
    clearFilters: (state) => {
      const defaultValues = {
        searchValue: '',
        minMax: [0, 100],
        page: 1,
        pageCount: 10,
      };

      return { ...state, ...defaultValues };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPacks.fulfilled, (state, { payload }) => {
      state.totalCount = payload.cardPacksTotalCount;
    });
  },
});

export const filterActions = { ...actions };

export const filterSlice = reducer;
