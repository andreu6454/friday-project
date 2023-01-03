import { Rating, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { AnyAction } from '@reduxjs/toolkit';
import { CustomTablePagination } from 'components/CustomTablePagination/CustomTablePagination';
import React, { FC } from 'react';
import { ICard } from 'services/type';

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
  page: number;
  renderActionsCells: ICard[];
  isLoadingStatus: boolean;
  pageCount: number;
  setNewPage: (page: number) => AnyAction;
  setPageCount: (pageSize: number) => AnyAction;
}

export const CardsTable: FC<CardTableProps> = ({
  totalCount,
  page,
  renderActionsCells,
  isLoadingStatus,
  pageCount,
  setNewPage,
  setPageCount,
}) => {
  return (
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
      <CustomTablePagination
        page={page}
        pageCount={pageCount}
        totalCount={totalCount}
        onChangePage={setNewPage}
        onChangePageSize={setPageCount}
        rowsPerPageOptions={[10, 20, 50]}
      />
    </Stack>
  );
};
