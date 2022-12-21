import {
  createHashRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { LoginPage, ProfilePage } from './pages';
import { CardPacksPage } from './pages/CardPacksPage/CardPacksPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { appRoutes, PrivateRoutes } from './routes';

export const routes = createHashRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route element={<PrivateRoutes />}>
        <Route path={appRoutes.PROFILE} element={<ProfilePage />} />
        <Route path={appRoutes.CARDPACKS} element={<CardPacksPage />} />
      </Route>
      <Route path={appRoutes.LOGIN} element={<LoginPage />} />
      <Route path={''} element={<Navigate to={appRoutes.PROFILE} />} />
      <Route path={appRoutes.NOTFOUND} element={<NotFoundPage />} />
    </Route>,
  ),
);
