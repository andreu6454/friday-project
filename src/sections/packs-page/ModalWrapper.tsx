import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { BasicModal } from 'components';
import React from 'react';

export const ModalWrapper = () => {
  return (
    <BasicModal title="Add new pack">
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          sx={{ minWidth: '346px' }}
          label={'Name pack'}
          variant="standard"
          fullWidth
        />
        <FormControlLabel control={<Checkbox name="remember-me" />} label="Remember me" />
        <DialogActions
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Button color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button variant="contained">Save</Button>
        </DialogActions>
      </Box>
    </BasicModal>
  );
};
