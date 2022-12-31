import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import { EditMenu } from 'components/Menu/EditMenu';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditPackModal } from 'sections/packs-page/EditPackModal';

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
  const nav = useNavigate();

  const handleClose = () => {
    console.log('hanlde');
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
      action: handleClose,
    },
    {
      id: 3,
      icon: SchoolIcon,
      name: 'Learn',
      action: () => nav('learn'),
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
      <EditMenu menuItems={menuItems} />
    </>
  );
};
