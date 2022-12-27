import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { BackLinkButton } from 'components';
import { useCardsTableData } from 'hooks';
import { appRoutes } from 'routes';
import { CustomPagination } from 'sections/packs-page/CustomPagination';

const columns: GridColDef[] = [
  { field: 'question', headerName: 'Question', flex: 1.5 },
  { field: 'answer', headerName: 'Answer', flex: 0.5 },
  { field: 'updated', headerName: 'Last Updated', flex: 1 },
  { field: 'grade', headerName: 'Grade', flex: 1 },
];

export const CardsPage = () => {
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
    packName,
  } = useCardsTableData();

  if (status === 'loading') {
    return (
      <Container>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            mt: '10%',
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Box marginTop={3}>
      <BackLinkButton link={appRoutes.PACKS}>Back To Pack List</BackLinkButton>
      <Box display="flex" flexDirection="column" alignItems="center" marginY={3}>
        <Typography variant="h5" alignSelf="flex-start" textAlign="left">
          {packName}
        </Typography>
        {!cards.length ? (
          <Stack alignItems="center" gap={3} marginTop={10}>
            <Typography variant="body2">
              This pack is empty. Click add new card to fill this pack
            </Typography>
            <Button variant="contained">Add new card</Button>
          </Stack>
        ) : (
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
        )}
      </Box>
    </Box>
  );
};
