import {
  Box,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { AnyAction } from '@reduxjs/toolkit';
import { ChangeEvent, FC } from 'react';
import { useAppDispatch } from 'store/store';

export interface CustomPaginationProps {
  page: number;
  pageCount: number;
  totalCount: number;
  onChangePage: (page: number) => AnyAction;
  onChangePageSize: (pageSize: number) => AnyAction;
  rowsPerPageOptions: number[];
}

export const CustomPagination: FC<CustomPaginationProps> = ({
  page,
  pageCount,
  totalCount,
  onChangePage,
  onChangePageSize,
  rowsPerPageOptions,
}) => {
  const dispatch = useAppDispatch();

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    dispatch(onChangePage(newPage));
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    dispatch(onChangePageSize(Number(event.target.value)));
  };
  const totalPages = Math.ceil(totalCount / pageCount);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Pagination
        color="primary"
        siblingCount={1}
        count={totalPages}
        page={page}
        onChange={(event: ChangeEvent<unknown>, newPage) =>
          handleChangePage(event, newPage)
        }
      />
      <Typography variant="body2">Show</Typography>
      <Select
        name="page-size"
        size="small"
        sx={{ maxHeight: '30px' }}
        defaultValue={pageCount}
        onChange={handlePageSizeChange}
      >
        {rowsPerPageOptions.map((el) => (
          <MenuItem key={el} value={el}>
            {el}
          </MenuItem>
        ))}
      </Select>
      <Typography variant="body2">Cards per Page</Typography>
    </Box>
  );
};
