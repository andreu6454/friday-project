import { Search } from '@mui/icons-material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SchoolIcon from '@mui/icons-material/School';
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
import { useParams, useSearchParams } from 'react-router-dom';

import { DoubleSlider } from '../../components';
import { fetchCardPacks } from '../../store/middleware/cards';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { formateDate } from '../../utils/formateDate';

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
  { field: 'name', headerName: 'Name', flex: 1.5 },
  { field: 'cardsCount', headerName: 'Cards', flex: 0.5 },
  { field: 'updated', headerName: 'Last Updates', flex: 1 },
  { field: 'user_name', headerName: 'Created by', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    renderCell: (params: GridRenderCellParams<Date>) => (
      <Box>
        <IconButton>
          <SchoolIcon />
        </IconButton>
        <IconButton>
          <ModeEditIcon />
        </IconButton>
        <IconButton>
          <DeleteForeverIcon />
        </IconButton>
      </Box>
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

  const dispatch = useAppDispatch();

  const loadingStatus = loading === 'loading';

  useEffect(() => {
    dispatch(fetchCardPacks({ page: 1, pageCount: 10 }));
  }, []);

  const renderActionsCells = (cardData ? cardData.cardPacks : []).map(
    (el: ICardPack) => ({
      ...el,
      id: el._id,
      updated: formateDate(el.updated),
    }),
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const { myID } = useParams();

  useEffect(() => {
    console.log(myID);
  }, [myID]);

  const handleChangeCategory = () => {
    setSearchParams({ myId: '639e379aea4807000491a3ea' });
  };

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
            <Button onClick={handleChangeCategory}>MY</Button>
            <Button variant="contained">All</Button>
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
