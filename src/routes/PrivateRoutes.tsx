import { LinearProgress } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks';
import { appRoutes } from './constants';

export const PrivateRoutes = () => {
  const { isAuth, loading } = useAuth();

  if (loading === 'failed') {
    return <Navigate to={appRoutes.DEFAULT} />;
  }

  return !isAuth ? <LinearProgress /> : <Outlet />;
};
