import { Rating, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { AnyAction } from '@reduxjs/toolkit';
import { CustomTablePagination } from 'components/CustomTablePagination/CustomTablePagination';
import React, { FC } from 'react';
import { ICard, ICardsResponse } from 'services/type';
import { formateDate } from 'utils/formateDate';

const columns: GridColDef[] = [
  { field: 'question', headerName: 'Question', flex: 1.5 },
  { field: 'answer', headerName: 'Answer', flex: 0.5 },
  { field: 'updated', headerName: 'Last Updated', flex: 1 },
  {
    field: 'grade',
    headerName: 'Grade',
    renderCell: (params: GridRenderCellParams<ICard>) => (
      <Rating name="half-rating-read" value={params.row.grade} readOnly />
    ),
    flex: 1,
  },
];

interface CardTableProps {
  totalCount: number;
  cards: any[];
  isFetchingCards: boolean;
}

export const CardsTable: FC<CardTableProps> = ({
  totalCount,
  cards,
  isFetchingCards,
}) => {
  const renderActionsCells = (cards ? cards : []).map((el: ICard) => ({
    ...el,
    id: el._id,
    updated: formateDate(el.updated),
  }));

  return (
    <Stack spacing={4} direction="column" width="100%">
      <DataGrid
        getRowId={(row) => row._id}
        sx={{ minHeight: '300px', minWidth: '100%' }}
        rowCount={totalCount}
        rows={renderActionsCells}
        loading={isFetchingCards}
        paginationMode="server"
        columns={columns}
        hideFooter={true}
      />
      <CustomTablePagination totalCount={totalCount} rowsPerPageOptions={[10, 20, 50]} />
    </Stack>
  );
};
