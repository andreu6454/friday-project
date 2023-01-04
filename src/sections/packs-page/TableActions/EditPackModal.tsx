import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
} from '@mui/material';
import { BasicModal } from 'components';
import { useActions } from 'hooks';
import React, { FC, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { UploadImageCover } from 'sections/packs-page/UploadImageCover';
import { asyncPackActions } from 'store/middleware/packs';

interface EditPackModalProps {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  packId: string;
  packName: string;
  isPrivatePack: boolean;
  deckCover: string;
}

export interface IEditPackSubmit {
  name: string;
  private?: boolean;
  deckCover?: string;
}

export const EditPackModal: FC<EditPackModalProps> = ({
  openModal,
  setOpenModal,
  packId: _id,
  packName,
  isPrivatePack,
  deckCover,
}) => {
  const { editPack } = useActions(asyncPackActions);

  const [editDeckCover, setEditDeckCover] = useState<string>(deckCover);

  const { register, handleSubmit, watch } = useForm<IEditPackSubmit>({
    defaultValues: {
      private: isPrivatePack,
      name: packName,
    },
  });

  const onSubmit: SubmitHandler<IEditPackSubmit> = (data: IEditPackSubmit) => {
    editPack({ name: data.name, _id, deckCover: editDeckCover });
    setOpenModal(false);
  };

  return (
    <BasicModal open={openModal} setOpen={setOpenModal} title="Edit pack">
      <Box display="flex" flexDirection="column" gap={1}>
        <UploadImageCover cover={editDeckCover} setCover={setEditDeckCover} />
        {/* pack name input */}
        <FormControl variant="standard" sx={{ m: 1, minWidth: '347px' }}>
          <InputLabel htmlFor="standard-adornment-name">Pack Name</InputLabel>
          <Input
            defaultValue={watch('name', packName)}
            {...register('name', { required: true })}
            type={'text'}
          />
        </FormControl>
        {/* pack name checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={watch('private')}
              {...register('private')}
              name="private-pack"
            />
          }
          label="Private Pack"
        />
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
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </DialogActions>
      </Box>
    </BasicModal>
  );
};
