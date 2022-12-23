import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SchoolIcon from '@mui/icons-material/School';
import { Box, IconButton } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { memo } from 'react';

const Actions = (params: GridRenderCellParams<any, any, any>) => {
  //   const userId = useAppSelector((state) => state.auth);
  const userId = '639e379aea4807000491a3ea';

  return (
    <Box>
      <IconButton>
        <SchoolIcon />
      </IconButton>
      {userId === params.id && (
        <>
          <IconButton>
            <ModeEditIcon />
          </IconButton>
          <IconButton>
            <DeleteForeverIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export const MemoizedActions = memo(Actions);