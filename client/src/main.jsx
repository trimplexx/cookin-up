/*
 * Formatted file
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import Entrypoint from './router/Entrypoint';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('app-mount')).render(
  <React.StrictMode>
    <Entrypoint />
  </React.StrictMode>
);
