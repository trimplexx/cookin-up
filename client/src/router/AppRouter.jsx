import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import AuthRoute from './AuthRoute ';

const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));
const RootPage = React.lazy(() => import('../pages/RootPage'));
const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const RegisterPage = React.lazy(() => import('../pages/RegisterPage'));
const AddLobbyPage = React.lazy(() => import('../pages/AddLobbyPage'));
const SingleLobbyPage = React.lazy(() => import('../pages/SingleLobbyPage'));
const SummaryPage = React.lazy(() => import('../pages/SummaryPage'));
const CookingDayEditPage = React.lazy(
  () => import('../pages/CookingDayEditPage')
);
const CookingDayViewPage = React.lazy(
  () => import('../pages/CookingDayViewPage')
);

export const AppRouter = () =>
  useRoutes([
    { path: '*', element: <NotFoundPage /> },
    { path: '/logowanie', element: <LoginPage /> },
    { path: '/rejestracja', element: <RegisterPage /> },
    {
      path: '/',
      element: (
        <AuthRoute>
          <RootPage />
        </AuthRoute>
      ),
    },
    {
      path: '/tworzenie-lobby',
      element: (
        <AuthRoute>
          <AddLobbyPage />
        </AuthRoute>
      ),
    },
    {
      path: '/lobby/:id',
      element: (
        <AuthRoute>
          <SingleLobbyPage />
        </AuthRoute>
      ),
    },
    {
      path: '/lobby/:id/summary',
      element: (
        <AuthRoute>
          <SummaryPage />
        </AuthRoute>
      ),
    },
    {
      path: '/:lobbyId/dzien-gotowania/:id/edytuj',
      element: (
        <AuthRoute>
          <CookingDayEditPage />
        </AuthRoute>
      ),
    },
    {
      path: '/:lobbyId/dzien-gotowania/:id',
      element: (
        <AuthRoute>
          <CookingDayViewPage />
        </AuthRoute>
      ),
    },
  ]);
