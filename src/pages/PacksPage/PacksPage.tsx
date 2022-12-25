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

import { DoubleSlider } from '../../components';
import { AlertSuccess } from '../../components/AlerSuccess/AlertSucess';
import { useDebounce, usePacksTableData } from '../../hooks';
import { MemoizedActions } from '../../sections/cardpacks-page/Actions';
import { CustomPagination } from '../../sections/cardpacks-page/CustomPagination';
import { ICardPack } from '../../services/api/packs';
import { StyledTextField } from '../../styles/styles';

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
  const {
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
  } = usePacksTableData();

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

  const addNewCardPackHandle = () => {
    addNewPack();
  };

  return (
    <Box marginTop={2}>
      <Stack justifyContent="space-between" direction="row">
        <Typography variant="h5">Pack list</Typography>
        <Button variant="contained" onClick={addNewCardPackHandle}>
          Add new pack
        </Button>
      </Stack>
      {/* filter row */}
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        marginY={5}
        gap={3}
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
        {/* pack category */}
        <Box
          flexGrow={'0.5'}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={1}
        >
          <Typography variant="body2">Show packs cards</Typography>
          <Stack direction="row" gap={1}>
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
          </Stack>
        </Box>
        {/* double slider */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography variant="body2">Number of cards</Typography>
          <DoubleSlider />
        </Box>
        {/* filter button */}
        <Box alignSelf="flex-end">
          <IconButton>
            <FilterAltIcon />
          </IconButton>
        </Box>
      </Stack>
      {/* table */}
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
      <AlertSuccess msg={'Success'} />
    </Box>
  );
};
