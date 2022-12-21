import { Container } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../store/store';
import { appRoutes } from './constants';

export const PrivateRoutes = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return isAuth ? (
    <Container>
      <Outlet />
    </Container>
  ) : (
    <Navigate to={appRoutes.LOGIN} />
  );
};
