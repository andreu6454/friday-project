import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import { EditMenu } from 'components/Menu/EditMenu';
import { useActions } from 'hooks';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeletePackModal } from 'sections/packs-page/DeletePackModal';
import { EditPackModal } from 'sections/packs-page/EditPackModal';
import { cardActions } from 'store/slices';
import { useAppSelector } from 'store/store';

interface EditCardPackMenuProps {
  packId: string;
  packName: string;
  isPrivatePack: boolean;
}

export const EditPackMenu: FC<EditCardPackMenuProps> = ({
  packId,
  packName,
  isPrivatePack,
}) => {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const nav = useNavigate();
  const cards = useAppSelector((state) => state.cards.cardsData.cards);
  const { setError } = useActions(cardActions);

  const learnActionHandle = () => {
    if (!cards.length) {
      setError('No cards in Pack');
      return;
    }
    nav('learn');
  };

  const menuItems = [
    {
      id: 1,
      icon: EditIcon,
      name: 'Edit',
      action: () => setOpenEditModal(true),
    },
    {
      id: 2,
      icon: DeleteIcon,
      name: 'Delete',
      action: () => setOpenDeleteModal(true),
    },
    {
      id: 3,
      icon: SchoolIcon,
      name: 'Learn',
      action: learnActionHandle,
    },
  ];

  return (
    <>
      <EditPackModal
        isPrivatePack={isPrivatePack}
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
        packId={packId}
        packName={packName}
      />
      <DeletePackModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        packId={packId}
        packName={packName}
      />
      <EditMenu menuItems={menuItems} />
    </>
  );
};
