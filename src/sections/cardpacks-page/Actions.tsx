import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SchoolIcon from '@mui/icons-material/School';
import { Box, IconButton } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { appRoutes } from '../../routes';
import { deletePack } from '../../store/middleware/packs';
import { useAppDispatch, useAppSelector } from '../../store/store';

const Actions = (params: GridRenderCellParams<any, any, any>) => {
  const userId = useAppSelector((state) => state.user.user._id);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const deleteCardPackHandle = (id: string) => {
    dispatch(deletePack({ id }));
  };

  const navToCardHandle = (packId: string) => {
    nav(appRoutes.CARDS + `/${packId}`);
  };

  return (
    <Box>
      <IconButton onClick={() => navToCardHandle(params.row._id)}>
        <SchoolIcon />
      </IconButton>
      {userId === params.row.user_id && (
        <>
          <IconButton>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={() => deleteCardPackHandle(params.row.id)}>
            <DeleteForeverIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export const MemoizedActions = memo(Actions);
