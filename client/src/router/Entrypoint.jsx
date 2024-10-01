/*
 * Formatted file
 */

import * as React from 'react';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SuspenseLoader from '../components/SuspenseLoader';
import { AppRouter } from './AppRouter';
import Navbar from '../components/Navbar';

const Entrypoint = () => (
  <React.StrictMode>
    <Suspense fallback={<SuspenseLoader />}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex">
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </div>
      </div>
    </Suspense>
  </React.StrictMode>
);

export default Entrypoint;
