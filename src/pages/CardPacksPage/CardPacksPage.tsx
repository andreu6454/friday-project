import { Search } from '@mui/icons-material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { DoubleSlider } from '../../components';
import { useDebounce } from '../../hooks';
import { MemoizedActions } from '../../sections/cardpacks-page/Actions';
import { CustomPagination } from '../../sections/cardpacks-page/CustomPagination';
import { ICardPack } from '../../services/api/cards';
import { addNewCardPack, fetchCardPacks } from '../../store/middleware/cards';
import { setNewPage, setPageCount } from '../../store/slices/cards-slice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { StyledTextField } from '../../styles/styles';
import { formateDate } from '../../utils/formateDate';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1.5 },
  { field: 'cardsCount', headerName: 'Cards', flex: 0.5 },
  { field: 'updated', headerName: 'Last Updates', flex: 1 },
  { field: 'user_name', headerName: 'Created by', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    renderCell: (params: GridRenderCellParams<ICardPack>) => (
      <MemoizedActions {...params} />
    ),
    flex: 0.7,
  },
];

export const CardPacksPage = () => {
  const cardData = useAppSelector((state) => state.cards.cardsData);
  const loading = useAppSelector((state) => state.cards.status);

  const page = useAppSelector((state) => state.cards.cardsData?.page);
  const pageCount = useAppSelector((state) => state.cards.cardsData?.pageCount);
  const totalCount = useAppSelector(
    (state) => state.cards.cardsData?.cardPacksTotalCount,
  );

  const [search, setSearch] = useSearchParams();
  const dispatch = useAppDispatch();

  const category = search.get('category');
  const packName = search.get('search_term') || '';
  const min = search.get('min') || '';
  const max = search.get('max') || '';

  const activeCategoryHandle = (cat: string) => {
    search.set('category', cat);
    setSearch(search);
  };

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

    dispatch(
      fetchCardPacks({
        page: page,
        pageCount: pageCount,
        user_id: fetchActiveCategory,
        packName: packName,
        max: +max,
        min: +min,
      }),
    );
  }, [search, pageCount, page]);

  const renderActionsCells = (cardData ? cardData.cardPacks : []).map(
    (el: ICardPack) => ({
      ...el,
      id: el._id,
      updated: formateDate(el.updated),
    }),
  );

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

  const addNewCardPackHandle = () => {
    dispatch(addNewCardPack());
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Stack justifyContent="space-between" direction="row">
        <Typography variant="h5">Pack list</Typography>
        <Button variant="contained" onClick={addNewCardPackHandle}>
          Add new pack
        </Button>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: '24px',
          mt: 5,
          gap: '24px',
        }}
      >
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography variant="body2">Search</Typography>

          <StyledTextField
            onChange={onSearchChange}
            defaultValue={search.get('search_term') ?? ''}
            fullWidth
            hiddenLabel
            id="filled-size-small"
            variant="outlined"
            size="small"
            placeholder="Provide your text"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 0.5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Typography variant="body2">Show packs cards</Typography>
          <Box>
            <Button
              variant={!isActiveCategory ? 'contained' : 'outlined'}
              onClick={() => activeCategoryHandle('my')}
            >
              MY
            </Button>
            <Button
              onClick={() => activeCategoryHandle('all')}
              variant={isActiveCategory ? 'contained' : 'outlined'}
            >
              All
            </Button>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography variant="body2">Number of cards</Typography>
          <DoubleSlider />
        </Box>
        <IconButton>
          <FilterAltIcon />
        </IconButton>
      </Box>
      <Stack spacing={4} direction="column">
        <DataGrid
          getRowId={(row) => row._id}
          sx={{ minHeight: '432px' }}
          rowCount={totalCount}
          rows={renderActionsCells}
          loading={loadingStatus}
          paginationMode="server"
          columns={columns}
          hideFooter={true}
        />
        <CustomPagination
          page={page}
          pageCount={pageCount}
          totalCount={totalCount}
          onChangePage={setNewPage}
          onChangePageSize={setPageCount}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Stack>
    </Box>
  );
};
