import { Alert, Snackbar } from '@mui/material';
import { AnyAction } from '@reduxjs/toolkit';
import { ReactPortal } from 'components/Portal/Portal';
import React, { FC } from 'react';
import { setErrorMsg } from 'store/slices/auth-slice';
import { useAppDispatch } from 'store/store';

interface AlerErrorProps {
  errorMsg: string | null;
  onCloseAction: (action: any) => AnyAction;
}

export const AlertError: FC<AlerErrorProps> = ({ errorMsg = '', onCloseAction }) => {
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
    dispatch(onCloseAction(''));
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
