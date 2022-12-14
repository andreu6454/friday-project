import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { appRoutes } from '../../routes/routes';

export const Register = () => {
  const { isAuth } = useAuth();

  return isAuth ? <Navigate to={appRoutes.PROFILE} /> : <div>register</div>;
};
