import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  TextField,
} from '@mui/material';
import { BasicModal } from 'components';
import { useActions } from 'hooks';
import React from 'react';
import { FC } from 'react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addNewPack, asyncPackActions } from 'store/middleware/packs';

interface NewPackModalProps {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
}

export interface IAddPackSubmit {
  name: string;
  deckCover?: string;
  private?: boolean;
}

export const NewPackModal: FC<NewPackModalProps> = ({ openModal, setOpenModal }) => {
  const { addNewPack } = useActions(asyncPackActions);

  const { register, handleSubmit, watch, reset } = useForm<IAddPackSubmit>({
    defaultValues: {
      private: false,
    },
  });

  const onSubmit: SubmitHandler<IAddPackSubmit> = (userData: IAddPackSubmit) => {
    addNewPack({ ...userData });
    setOpenModal(false);
    reset({
      name: '',
    });
  };

  return (
    <BasicModal open={openModal} setOpen={setOpenModal} title="Add new pack">
      <Box display="flex" flexDirection="column" gap={1}>
        {/* pack name input */}
        <FormControl variant="standard" sx={{ m: 1, minWidth: '347px' }}>
          <InputLabel htmlFor="standard-adornment-name">Pack Name</InputLabel>
          <Input {...register('name', { required: true })} type={'text'} />
        </FormControl>
        {/* pack name checkbox */}
        <FormControlLabel
          control={<Checkbox {...register('private')} name="private-pack" />}
          label="Private Pack"
        />
        <DialogActions
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => setOpenModal(false)}
          >
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
