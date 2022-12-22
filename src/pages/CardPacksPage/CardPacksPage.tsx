import { Search } from '@mui/icons-material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { DoubleSlider } from '../../components';
import { useDebounce } from '../../hooks';
import { MemoizedActions } from '../../sections/cardpacks-page/Actions';
import { ICardPack } from '../../services/api/cards';
import { fetchCardPacks } from '../../store/middleware/cards';
import { useAppDispatch, useAppSelector } from '../../store/store';
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

const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: ${({ theme }) => theme.palette.background.paper};
  }
`;

export const CardPacksPage = () => {
  const cardData = useAppSelector((state) => state.cards.cardsData);
  const loading = useAppSelector((state) => state.cards.status);

  const [search, setSearch] = useSearchParams();
  const dispatch = useAppDispatch();

  const category = search.get('category');
  const packName = search.get('query') || '';
  const min = search.get('min') || '';
  const max = search.get('max') || '';

  const activeCategoryHandle = (cat: string) => {
    search.set('category', cat);
    setSearch(search);
  };

  const userId = '639e379aea4807000491a3ea';
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
        page: 1,
        pageCount: 150,
        user_id: fetchActiveCategory,
        packName: packName,
        max: +max,
        min: +min,
      }),
    );
  }, [category, packName, min, max]);

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
      search.delete('query');
      setSearch(search, {
        replace: true,
      });
    } else {
      search.set('query', text);
      setSearch(search, {
        replace: true,
      });
    }
  }, 500);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5">Pack list</Typography>
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
            defaultValue={search.get('query') ?? ''}
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
      <DataGrid
        loading={loadingStatus}
        sx={{ height: '432px' }}
        rows={renderActionsCells}
        columns={columns}
      />
    </Box>
  );
};
