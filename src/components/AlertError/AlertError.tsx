import { Alert, Snackbar } from '@mui/material';
import { ReactPortal } from 'components/Portal/Portal';
import React from 'react';
import { setErrorMsg } from 'store/slices/auth-slice';
import { useAppDispatch } from 'store/store';

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
