import { createBrowserRouter, createHashRouter } from 'react-router-dom';

import { Layout } from '../components/Layout/Layout';
import { Navbar } from '../components/Navbar/Navbar';
import { Profile } from '../pages';
import { Login } from '../pages/Login/Login';
import { NotFound } from '../pages/NotFound/NotFound';
import { Register } from '../pages/Register/Register';
import { PrivateRoute } from './PrivateRoute';
import { appRoutes } from './routes';

export const routesConfig = createHashRouter([
  {
    path: appRoutes.DEFAULT,
    element: <Layout />,
    children: [
      {
        path: appRoutes.DEFAULT,
        element: <Login />,
        index: true,
      },
      {
        path: appRoutes.REGISTER,
        element: <Register />,
      },
      {
        path: appRoutes.PROFILE,
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: appRoutes.UNKNOWN,
        element: <NotFound />,
      },
    ],
  },
]);
