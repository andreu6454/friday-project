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
import { AlertError, DoubleSlider } from 'components';
import { AlertSuccess } from 'components/AlerSuccess/AlertSucess';
import { NoCoverImage } from 'components/NoCoverImage/NoCoverImage';
import { useActions, usePacksTableData } from 'hooks';
import React, { useState } from 'react';
import { MemoizedActionButtons } from 'sections/packs-page/ActionButtons';
import { CustomPagination } from 'sections/packs-page/CustomPagination';
import { NewPackModal } from 'sections/packs-page/NewPackModal';
import { ICardPack } from 'services/type';
import { packActions } from 'store/slices';
import { StyledTextField } from 'styles/styles';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1.5,
    renderCell: (params: GridRenderCellParams<any, ICardPack>) => {
      return (
        <Stack direction={'row'} alignItems={'center'} spacing={1}>
          {params.row.deckCover ? (
            <img
              width={'50px'}
              height={'30px'}
              style={{ objectFit: 'cover' }}
              src={params.row.deckCover}
            />
          ) : (
            <NoCoverImage />
          )}
          <Typography>{params.row.name}</Typography>
        </Stack>
      );
    },
  },
  { field: 'cardsCount', headerName: 'Cards', flex: 0.5 },
  { field: 'updated', headerName: 'Last Updates', flex: 1 },
  { field: 'user_name', headerName: 'Created by', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    renderCell: (params: GridRenderCellParams<ICardPack>) => (
      <MemoizedActionButtons {...params} />
    ),
    flex: 0.7,
  },
];

const CardPacksPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const { setError } = useActions(packActions);

  const {
    search,
    isActiveCategory,
    page,
    totalCount,
    renderActionsCells,
    pageCount,
    setNewPage,
    loadingStatus,
    setPageCount,
    error,
    activeCategoryHandle,
    onSearchChange,
  } = usePacksTableData();

  return (
    <Box marginTop={2}>
      <NewPackModal openModal={openModal} setOpenModal={setOpenModal} />
      <Stack justifyContent="space-between" direction="row">
        <Typography variant="h5">Pack list</Typography>
        <Button variant="contained" onClick={handleOpenModal}>
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
      {/* packs not found */}
      {!totalCount && (
        <Typography textAlign={'center'} mt={20}>
          Колоды с данным фильтром не найдены. Измените параметры поиска
        </Typography>
      )}
      {/* table */}
      {!!totalCount && (
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
      )}

      <AlertSuccess msg={'Success'} />
      <AlertError errorMsg={error} onCloseAction={setError} />
    </Box>
  );
};

export default CardPacksPage;
