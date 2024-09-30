/*
 * Formatted file
 */

import * as React from 'react';
import { useRoutes } from 'react-router-dom';

const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));
const RootPage = React.lazy(() => import('../pages/RootPage'));

export const AppRouter = () =>
  // define all routes here (https://reactrouter.com/en/main/hooks/use-routes)
  useRoutes([
    { path: '/', element: <RootPage /> },
    { path: '*', element: <NotFoundPage /> },
  ]);
