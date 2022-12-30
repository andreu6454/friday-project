import { Box, Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { BackLinkButton } from 'components';
import { useCardsTableData } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from 'routes';
import { NewCardModal } from 'sections/card-page/NewCardModal';
import { Preloader } from 'sections/login-page/Preloader';
import { CustomPagination } from 'sections/packs-page/CustomPagination';
import { useAppSelector } from 'store/store';

const columns: GridColDef[] = [
  { field: 'question', headerName: 'Question', flex: 1.5 },
  { field: 'answer', headerName: 'Answer', flex: 0.5 },
  { field: 'updated', headerName: 'Last Updated', flex: 1 },
  { field: 'grade', headerName: 'Grade', flex: 1 },
];

export const CardsPage = () => {
  const packs = useAppSelector((state) => state.packs.packData.cardPacks);
  const packName = useAppSelector((state) => state.cards.cardsData.packName);
  const [openModal, setOpenModal] = useState(false);
  const nav = useNavigate();

  const {
    totalCount,
    page,
    renderActionsCells,
    isLoadingStatus,
    pageCount,
    setNewPage,
    setPageCount,
    cards,
    status,
    isUserPackOwner,
    setPackName,
    id: packId,
  } = useCardsTableData();

  const handleModal = () => {
    setOpenModal(true);
  };

  const learnHandleNavigate = () => {
    nav('learn');
  };

  useEffect(() => {
    const findIndexPack = packs.findIndex((pack) => pack._id === packId);
    const pN = findIndexPack > -1 ? packs[findIndexPack].name : 'No pack Name';
    setPackName(pN);
  }, [packName]);

  if (status === 'loading' && !cards.length) {
    return <Preloader />;
  }

  return (
    <Box marginTop={3}>
      <Stack direction={'row'} justifyContent="space-between">
        <BackLinkButton link={appRoutes.PACKS}>Back To Pack List</BackLinkButton>
        {isUserPackOwner && cards.length ? (
          <Button variant="contained" onClick={handleModal}>
            Add new card
          </Button>
        ) : null}
        {!isUserPackOwner && cards.length ? (
          <Button variant="contained" onClick={learnHandleNavigate}>
            Start Learn
          </Button>
        ) : null}
      </Stack>
      <Box display="flex" flexDirection="column" alignItems="center" marginY={3} gap={3}>
        <Typography variant="h5" alignSelf="flex-start" textAlign="left">
          {packName}
        </Typography>
        {!cards.length && isUserPackOwner ? (
          <Stack alignItems="center" gap={3} marginTop={10}>
            <Typography variant="body2">
              This pack is empty. Click add new card to fill this pack
            </Typography>
            <Button variant="contained" onClick={handleModal}>
              Add new card
            </Button>
          </Stack>
        ) : null}
        {!cards.length && !isUserPackOwner ? (
          <Typography variant="body2">This pack is empty</Typography>
        ) : null}

        {cards.length ? (
          <Stack spacing={4} direction="column" width="100%">
            <DataGrid
              getRowId={(row) => row._id}
              sx={{ minHeight: '300px', minWidth: '100%' }}
              rowCount={totalCount}
              rows={renderActionsCells}
              loading={isLoadingStatus}
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
        ) : null}
      </Box>
      <NewCardModal packId={packId!} setOpenModal={setOpenModal} openModal={openModal} />
    </Box>
  );
};
