import { Alert, Snackbar } from '@mui/material';
import React from 'react';

import { packActions } from '../../store/slices';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { ReactPortal } from '../Portal/Portal';

export const AlertSuccess = ({ msg = '' }: { msg: string | null }) => {
  const dispatch = useAppDispatch();
  const actionStatus = useAppSelector((state) => state.packs.actionStatus);

  const { setActionStatus } = packActions;

  const [state, setState] = React.useState<{
    open: boolean;
    vertical: 'top' | 'bottom';
    horizontal: 'center' | 'left' | 'right';
  }>({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
    dispatch(setActionStatus());
  };

  return (
    <ReactPortal>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={!!actionStatus}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert variant="filled" onClose={handleClose} sx={{ width: '100%' }}>
          {actionStatus}
        </Alert>
      </Snackbar>
    </ReactPortal>
  );
};
