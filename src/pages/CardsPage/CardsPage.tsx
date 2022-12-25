import { Box, Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';

import { BackLinkButton } from '../../components';
import { appRoutes } from '../../routes';
import { CustomPagination } from '../../sections/cardpacks-page/CustomPagination';
import { ICardPack } from '../../services/api/packs';
import { formateDate } from '../../utils/formateDate';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Question', flex: 1.5 },
  { field: 'cardsCount', headerName: 'Answer', flex: 0.5 },
  { field: 'updated', headerName: 'Last Updated', flex: 1 },
  { field: 'user_name', headerName: 'Grade', flex: 1 },
];

export const CardsPage = () => {
  const cardData = [] as any[];
  const isCards = true;

  // const renderActionsCells = (cardData ? cardData.cardPacks : []).map(
  //   (el: ICardPack) => ({
  //     ...el,
  //     id: el._id,
  //     updated: formateDate(el.updated),
  //   }),
  // );

  const totalCount = 10;
  const loadingStatus = false;

  const page = 0;
  const pageCount = 10;

  return (
    <Box marginTop={3}>
      <BackLinkButton link={appRoutes.PACKS}>Back To Pack List</BackLinkButton>
      <Box display="flex" flexDirection="column" alignItems="center" marginY={3}>
        <Typography variant="h5" alignSelf="flex-start" textAlign="left">
          Name Pack
        </Typography>
        {!isCards ? (
          <Stack alignItems="center" gap={3} marginTop={10}>
            <Typography variant="body2">
              This pack is empty. Click add new card to fill this pack
            </Typography>
            <Button variant="contained">Add new card</Button>
          </Stack>
        ) : (
          <Stack spacing={4} direction="column">
            <DataGrid
              getRowId={(row) => row._id}
              sx={{ minHeight: '432px', minWidth: '100%' }}
              rowCount={totalCount}
              rows={cardData}
              loading={loadingStatus}
              paginationMode="server"
              columns={columns}
              hideFooter={true}
            />
            {/* <CustomPagination
              page={page}
              pageCount={pageCount}
              totalCount={totalCount}
              onChangePage={setNewPage}
              onChangePageSize={setPageCount}
              rowsPerPageOptions={[10, 20, 50]}
            /> */}
          </Stack>
        )}
      </Box>
    </Box>
  );
};
