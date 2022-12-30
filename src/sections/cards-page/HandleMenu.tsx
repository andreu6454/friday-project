import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import { EditMenu } from 'components/Menu/EditMenu';
import React, { FC, useState } from 'react';
import { EditPackModal } from 'sections/packs-page/EditPackModal';

interface HandleMenuProps {
  packId: string;
  packName: string;
}

export const HandleMenu: FC<HandleMenuProps> = ({ packId, packName }) => {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const handleClose = () => {
    console.log('hanlde');
  };

  const arr = [
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
      action: handleClose,
    },
    {
      id: 3,
      icon: SchoolIcon,
      name: 'Learn',
      action: handleClose,
    },
  ];

  return (
    <>
      <EditPackModal
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
        packId={packId}
        packName={packName}
      />
      <EditMenu menuItems={arr} />
    </>
  );
};
