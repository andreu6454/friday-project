import { Alert, SnackbarContent } from '@mui/material';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import React from 'react';

import { setErrorMsg } from '../../features/auth/authSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ReactPortal } from '../Portal/Portal';

export const AlertError = ({ errorMsg = '' }: { errorMsg: string | null }) => {
  const dispatch = useAppDispatch();

  const [state, setState] = React.useState<{
    open: boolean;
    vertical: 'top' | 'bottom';
    horizontal: 'center' | 'left' | 'right';
  }>({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
    dispatch(setErrorMsg(''));
  };

  return (
    <ReactPortal>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={!!errorMsg}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={handleClose}
          sx={{ width: '100%' }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </ReactPortal>
  );
};
