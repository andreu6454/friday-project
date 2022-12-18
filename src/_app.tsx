import React from 'react';
import { createHashRouter, RouteObject } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { LoginPage, ProfilePage, RegisterPage } from './pages';
import { CardPacksPage } from './pages/CardPacksPage/CardPacksPage';
import { appRoutes, PrivateRoutes } from './routes';

const RoutesGlobal: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: appRoutes.REGISTER,
        element: <RegisterPage />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            index: true,
            path: appRoutes.PROFILE,
            element: <ProfilePage />,
          },
          {
            path: appRoutes.CARDPACKS,
            element: <CardPacksPage />,
          },
        ],
      },
    ],
  },
];

export const routes = createHashRouter(RoutesGlobal);
