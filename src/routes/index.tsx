import type { RouteObject } from 'react-router-dom';

import { Layout } from '../components/Layout/Layout';
import { LoginPage, ProfilePage, RegisterPage } from '../pages';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const appRoutes = {
  LOGIN: 'login',
  DEFAULT: '/',
  PROFILE: 'profile',
  REGISTER: 'register',
  UNKNOWN: '*',
};

const privateRoutes: RouteObject = {
  path: appRoutes.UNKNOWN,
  element: <PrivateRoute />,
  children: [
    {
      element: <Layout />,
      children: [
        {
          path: appRoutes.PROFILE,
          element: <ProfilePage />,
        },
      ],
    },
  ],
};

const publicRoutes: RouteObject = {
  path: appRoutes.UNKNOWN,
  element: <PublicRoute />,
  children: [
    {
      element: <Layout />,
      children: [
        {
          path: appRoutes.REGISTER,
          element: <RegisterPage />,
        },
        {
          path: appRoutes.LOGIN,
          element: <LoginPage />,
        },
      ],
    },
  ],
};

export const routes: RouteObject[] = [privateRoutes, publicRoutes];
