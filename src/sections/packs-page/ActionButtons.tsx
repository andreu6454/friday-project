import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SchoolIcon from '@mui/icons-material/School';
import { Box, IconButton } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from 'routes';
import { ICardPack } from 'services/type';
import { deletePack } from 'store/middleware/packs';
import { useAppDispatch, useAppSelector } from 'store/store';

import { EditPackModal } from './EditPackModal';

const ActionButtons = (params: GridRenderCellParams<any, ICardPack>) => {
  const userId = useAppSelector((state) => state.user.user._id);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const deleteCardPackHandle = (id: string) => {
    dispatch(deletePack({ id }));
  };

  const navToCardHandle = (packId: string) => {
    nav(appRoutes.CARDS + `/${packId}`);
  };

  return (
    <Box {...params.row}>
      <IconButton onClick={() => navToCardHandle(params.row._id)}>
        <SchoolIcon />
      </IconButton>
      {userId === params.row.user_id && (
        <>
          <IconButton>
            <ModeEditIcon onClick={() => setOpenModal(true)} />
          </IconButton>
          <IconButton onClick={() => deleteCardPackHandle(params.row._id)}>
            <DeleteForeverIcon />
          </IconButton>
        </>
      )}
      <EditPackModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        packId={params.row._id}
        packName={params.row.name}
      />
    </Box>
  );
};

export const MemoizedActionButtons = memo(ActionButtons);
