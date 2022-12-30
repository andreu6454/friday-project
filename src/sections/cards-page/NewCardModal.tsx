import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { BasicModal } from 'components';
import { useActions } from 'hooks';
import React from 'react';
import { FC } from 'react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAddNewCardRequest } from 'services/type';
import { asyncCardActions } from 'store/middleware/cards';
import { addNewPack, asyncPackActions } from 'store/middleware/packs';

interface NewPackModalProps {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  packId: string;
}

export const NewCardModal: FC<NewPackModalProps> = ({
  openModal,
  setOpenModal,
  packId,
}) => {
  const { addNewCard } = useActions(asyncCardActions);

  const { register, handleSubmit, watch, reset } = useForm<IAddNewCardRequest>({});
  const [format, setFormat] = useState('text');

  const onSubmit: SubmitHandler<IAddNewCardRequest> = (newCard: IAddNewCardRequest) => {
    addNewCard({ ...newCard, cardsPack_id: packId });
    console.log(newCard);
    setOpenModal(false);
    reset({
      question: '',
      answer: '',
    });
  };

  return (
    <BasicModal open={openModal} setOpen={setOpenModal} title="Add new card">
      <Box display="flex" flexDirection="column" gap={1}>
        <FormControl fullWidth>
          <InputLabel id="simple-select-helper">Choose a question format</InputLabel>
          <Select
            size="small"
            value={format}
            labelId="simple-select-helper"
            id="demo-simple-select-helper"
            label="Choose a question format"
          >
            <MenuItem value={'text'}>Text</MenuItem>
            <MenuItem value={'video'}>Video (in progress...)</MenuItem>
            <MenuItem value={'image'}>Image (in progress...)</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: '347px' }}>
          <InputLabel htmlFor="standard-adornment-name">Question</InputLabel>
          <Input {...register('question', { required: true })} type={'text'} />
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: '347px' }}>
          <InputLabel htmlFor="standard-adornment-name">Answer</InputLabel>
          <Input {...register('answer', { required: true })} type={'text'} />
        </FormControl>
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
