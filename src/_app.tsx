import { lazy } from 'react';
import {
  createHashRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { withSuspense } from './hoc/withSuspense';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { appRoutes, PrivateRoutes } from './routes';

const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const CardPacksPage = lazy(() => import('./pages/PacksPage/PacksPage'));
const CardsPage = lazy(() => import('./pages/CardsPage/CardsPage'));
const LearnPage = lazy(() => import('./pages/LearnPage/LearnPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ForgotPasswordPage = lazy(
  () => import('./pages/ForgotPassword/ForgotPasswordPage/ForgotPasswordPage'),
);
const CheckEmailPage = lazy(
  () => import('./pages/ForgotPassword/CheckEmailPage/CheckEmailPage'),
);
const SetNewPasswordPage = lazy(
  () => import('./pages/ForgotPassword/SetNewPasswordPage/SetNewPasswordPage'),
);
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));

export const routes = createHashRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route element={<PrivateRoutes />}>
        <Route path={appRoutes.PROFILE} element={withSuspense(<ProfilePage />)} />
        <Route path={appRoutes.PACKS} element={withSuspense(<CardPacksPage />)} />
        <Route path={appRoutes.CARDS + '/:id'} element={withSuspense(<CardsPage />)} />
        <Route
          path={appRoutes.CARDS + '/:id/learn'}
          element={withSuspense(<LearnPage />)}
        />
      </Route>
      <Route path={appRoutes.LOGIN} element={withSuspense(<LoginPage />)} />
      <Route path={appRoutes.FORGOT} element={withSuspense(<ForgotPasswordPage />)} />
      <Route path={appRoutes.CHECKEMAIL} element={withSuspense(<CheckEmailPage />)} />
      <Route
        path={appRoutes.SETPASSWORD}
        element={withSuspense(<SetNewPasswordPage />)}
      />
      <Route path={appRoutes.REGISTER} element={withSuspense(<RegisterPage />)} />
      <Route path={''} element={<Navigate to={appRoutes.PACKS} />} />
      <Route path={appRoutes.NOTFOUND} element={<NotFoundPage />} />
    </Route>,
  ),
);
