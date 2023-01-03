import { Box, Button, DialogActions, Typography } from '@mui/material';
import { BasicModal } from 'components';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { deletePack } from 'store/middleware/packs';
import { useAppDispatch } from 'store/store';

interface DeletePackModalProps {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  packId: string;
  packName: string;
}

export interface IEditPackSubmit {
  name: string;
  private?: boolean;
}

export const DeletePackModal: FC<DeletePackModalProps> = ({
  openModal,
  setOpenModal,
  packId,
  packName,
}) => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const { handleSubmit } = useForm<IEditPackSubmit>();

  const onSubmit: SubmitHandler<IEditPackSubmit> = () => {
    dispatch(deletePack({ id: packId }))
      .unwrap()
      .then(() => {
        nav(-1);
      })
      .catch((err) => {
        throw new Error(err);
      });

    setOpenModal(false);
  };

  return (
    <BasicModal open={openModal} setOpen={setOpenModal} title="Delete pack">
      <Box display="flex" flexDirection="column" gap={1}>
        {/* pack name input */}
        <Typography variant="body2">
          Do you really want to remove
          <strong> {packName} </strong>? All cards will be deleted.
        </Typography>
        <DialogActions
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Button variant="outlined" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleSubmit(onSubmit)}>
            Delete
          </Button>
        </DialogActions>
      </Box>
    </BasicModal>
  );
};
