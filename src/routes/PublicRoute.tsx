import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks';
import { appRoutes } from '.';

export const PublicRoute = () => {
  const { isAuth } = useAuth();
  return !isAuth ? <Outlet /> : <Navigate to={appRoutes.PROFILE} />;
};
