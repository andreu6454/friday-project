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
  ForgotPasswordPage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  SetNewPasswordPage,
} from './pages';
import CheckEmailPage from './pages/ForgotPassword/CheckEmailPage/CheckEmailPage';
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
      <Route path={appRoutes.FORGOT} element={<ForgotPasswordPage />} />
      <Route path={appRoutes.CHECKEMAIL} element={<CheckEmailPage />} />
      <Route path={appRoutes.SETPASSWORD} element={<SetNewPasswordPage />} />
      <Route path={appRoutes.REGISTER} element={<RegisterPage />} />
      <Route path={''} element={<Navigate to={appRoutes.PACKS} />} />
      <Route path={appRoutes.NOTFOUND} element={<NotFoundPage />} />
    </Route>,
  ),
);
