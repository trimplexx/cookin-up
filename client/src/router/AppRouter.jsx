import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import AddLobbyPage from '../pages/AddLobbyPage';
import SingleLobbyPage from '../pages/SingleLobbyPage';

const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));
const RootPage = React.lazy(() => import('../pages/RootPage'));
const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const RegisterPage = React.lazy(() => import('../pages/RegisterPage'));

export const AppRouter = () =>
  // define all routes here (https://reactrouter.com/en/main/hooks/use-routes)
  useRoutes([
    { path: '/', element: <RootPage /> },
    { path: '*', element: <NotFoundPage /> },
    { path: '/logowanie', element: <LoginPage /> },
    { path: '/rejestracja', element: <RegisterPage /> },
    { path: '/tworzenie-lobby', element: <AddLobbyPage /> },
    { path: '/lobby/:id', element: <SingleLobbyPage /> },
  ]);
