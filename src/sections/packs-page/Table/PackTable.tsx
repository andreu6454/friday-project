import { Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CustomTablePagination } from 'components';
import { NoCoverImage } from 'components/NoCoverImage/NoCoverImage';
import { FC } from 'react';
import { MemoizedActionButtons } from 'sections/packs-page/TableActions/RowActions';
import { ICardPack, ICardsPacks } from 'services/type';
import { formateDate } from 'utils/formateDate';

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

interface PackTableProps {
  loadingStatus: boolean;
  cardData: ICardsPacks;
  totalCount: number;
}

export const PackTable: FC<PackTableProps> = ({
  loadingStatus,
  cardData,
  totalCount,
}) => {
  const renderActionsCells = (cardData ? cardData.cardPacks : []).map(
    (el: ICardPack) => ({
      ...el,
      id: el._id,
      updated: formateDate(el.updated),
    }),
  );

  return (
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
      <CustomTablePagination totalCount={totalCount} rowsPerPageOptions={[10, 20, 50]} />
    </Stack>
  );
};
