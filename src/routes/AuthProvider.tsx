import { Box } from '@mui/material';
import React, { ReactNode, useEffect } from 'react';
import { isAuthUser } from 'store/middleware/authUser';
import { useAppDispatch, useAppSelector } from 'store/store';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    dispatch(isAuthUser());
  }, []);

  if (status === 'idle') {
    return <div>loading</div>;
  }

  return <Box>{children}</Box>;
};
