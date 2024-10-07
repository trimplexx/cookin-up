import * as React from "react";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import SuspenseLoader from "../components/SuspenseLoader";
import { AppRouter } from "./AppRouter";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

const Entrypoint = () => (
  <React.StrictMode>
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
  </React.StrictMode>
);

export default Entrypoint;
