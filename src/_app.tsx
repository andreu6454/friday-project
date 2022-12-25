import {
  createHashRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import {
  CardPacksPage,
  CardsPage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
} from './pages';
import { appRoutes, PrivateRoutes } from './routes';

export const routes = createHashRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route element={<PrivateRoutes />}>
        <Route path={appRoutes.PROFILE} element={<ProfilePage />} />
        <Route path={appRoutes.PACKS} element={<CardPacksPage />} />
        <Route path={appRoutes.CARDS + '/:id'} element={<CardsPage />} />
      </Route>
      <Route path={appRoutes.LOGIN} element={<LoginPage />} />
      <Route path={appRoutes.REGISTER} element={<RegisterPage />} />
      <Route path={''} element={<Navigate to={appRoutes.PACKS} />} />
      <Route path={appRoutes.NOTFOUND} element={<NotFoundPage />} />
    </Route>,
  ),
);
