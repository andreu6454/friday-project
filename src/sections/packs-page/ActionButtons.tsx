import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SchoolIcon from '@mui/icons-material/School';
import { Box, IconButton } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from 'routes';
import { ICardPack } from 'services/type';
import { useAppSelector } from 'store/store';

import { DeletePackModal } from './DeletePackModal';
import { EditPackModal } from './EditPackModal';

const ActionButtons = (params: GridRenderCellParams<any, ICardPack>) => {
  const userId = useAppSelector((state) => state.user.user._id);
  const nav = useNavigate();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const navToCardHandle = (packId: string) => {
    nav(appRoutes.CARDS + `/${packId}`);
  };

  return (
    <Box>
      <IconButton
        disabled={!params.row.cardsCount && userId !== params.row.user_id}
        onClick={() => navToCardHandle(params.row._id)}
      >
        <SchoolIcon />
      </IconButton>
      {userId === params.row.user_id && (
        <>
          <IconButton onClick={() => setOpenEditModal(true)}>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={() => setOpenDeleteModal(true)}>
            <DeleteForeverIcon />
          </IconButton>
        </>
      )}
      <EditPackModal
        isPrivatePack={params.row.private}
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
        packId={params.row._id}
        packName={params.row.name}
      />
      <DeletePackModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        packId={params.row._id}
        packName={params.row.name}
      />
    </Box>
  );
};

export const MemoizedActionButtons = memo(ActionButtons);
