import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SchoolIcon from '@mui/icons-material/School';
import { Box, IconButton } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { memo } from 'react';

import { useAppSelector } from '../../store/store';

const Actions = (params: GridRenderCellParams<any, any, any>) => {
  const userId = useAppSelector((state) => state.user.user._id);

  return (
    <Box>
      <IconButton>
        <SchoolIcon />
      </IconButton>
      {userId === params.row.user_id && (
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
