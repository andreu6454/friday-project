import { AccountCircle, Search } from '@mui/icons-material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
  Slider,
  styled,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { DoubleSlider } from '../../components';
import useDebounce from '../../hooks/useDebounce';
import { fetchCardPacks } from '../../store/middleware/cards';
import { useAppDispatch, useAppSelector } from '../../store/store';

interface ICategory {
  category: 'all' | 'my';
}

export interface ICardPack {
  _id?: string;
  user_id?: string;
  name: string;
  cardsCount: number;
  created: string;
  updated: string;
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'cardsCount', headerName: 'Cards', flex: 1 },
  { field: 'updated', headerName: 'Last Updates', flex: 1 },
  { field: 'created', headerName: 'Created by', flex: 1 },
  { field: 'actions', headerName: 'Actions', flex: 1 },
];

// const rows: GridRowsProp = [
//   { id: 1, name: 'Hello', col2: 'World' },
//   { id: 2, cardsCount: 'DataGridPro', col2: 'is Awesome' },
//   { id: 3, updated: 'MUI', col2: 'is Amazing' },
// ];

const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: ${({ theme }) => theme.palette.background.paper};
  }
`;

export const CardPacksPage = () => {
  const cardData = useAppSelector((state) => state.cards.cardsData);
  const loading = useAppSelector((state) => state.cards.status);
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce<string>(searchValue, 500);

  const loadingStatus = loading === 'loading';

  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  useEffect(() => {
    dispatch(fetchCardPacks({ packName: searchValue, page: 1, pageCount: 10 }));
  }, [debouncedValue]);

  // useEffect(() => {
  //   dispatch(fetchCardPacks({ page: 1, pageCount: 10 }));
  // }, []);

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
            fullWidth
            hiddenLabel
            id="filled-size-small"
            variant="outlined"
            size="small"
            placeholder="Provide your text"
            value={searchValue}
            onChange={handleChange}
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
            <Button variant="contained">MY</Button>
            <Button>All</Button>
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
        rows={(cardData ? cardData.cardPacks : []).map((el: ICardPack) => ({
          id: el._id,
          ...el,
        }))}
        columns={columns}
      />
    </Box>
  );
};
