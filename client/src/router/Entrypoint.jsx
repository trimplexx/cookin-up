import * as React from 'react';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SuspenseLoader from '../components/common/SuspenseLoader';
import { AppRouter } from './AppRouter';
import Navbar from '../components/common/Navbar';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import { ConfirmationProvider } from '../context/ConfirmModalContext';

const Entrypoint = () => (
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider>
        <ConfirmationProvider>
          <Suspense fallback={<SuspenseLoader />}>
            <BrowserRouter>
              <div className="flex flex-col min-h-screen">
                <Toaster position="top-center" />
                <Navbar />
                <div className="flex-grow flex">
                  <AppRouter />
                </div>
              </div>
            </BrowserRouter>
          </Suspense>
        </ConfirmationProvider>
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>
);

export default Entrypoint;
