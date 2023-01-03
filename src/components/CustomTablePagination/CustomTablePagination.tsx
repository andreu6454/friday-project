import {
  Box,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { ChangeEvent, FC } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface CustomPaginationProps {
  totalCount: number;
  rowsPerPageOptions: number[];
}

export const CustomTablePagination: FC<CustomPaginationProps> = ({
  totalCount,
  rowsPerPageOptions,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page') || '1';
  const pageCount = searchParams.get('pageCount') || '10';

  const handleChangePage = (event: any, newPage: number) => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentParams, page: newPage.toString() });
  };

  const handleChangePageCount = (event: SelectChangeEvent<any>) => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentParams, pageCount: event.target.value });
  };

  const totalPages = Math.ceil(totalCount / Number(pageCount));

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Pagination
        color="primary"
        siblingCount={1}
        count={totalPages}
        page={Number(page)}
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
        onChange={handleChangePageCount}
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
