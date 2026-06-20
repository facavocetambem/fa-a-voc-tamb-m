// Silence benign development environment WebSocket / HMR errors
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    if (
      reason &&
      (reason === 'WebSocket closed without opened.' ||
       (reason.message && reason.message.includes('WebSocket')) ||
       (typeof reason === 'string' && (reason.includes('WebSocket') || reason.includes('websocket'))) ||
       (reason.stack && (reason.stack.includes('WebSocket') || reason.stack.includes('websocket'))))
    ) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  });

  window.addEventListener('error', (event) => {
    const message = event.message || '';
    if (
      message.includes('WebSocket') ||
      message.includes('websocket') ||
      (event.error && event.error.message && (event.error.message.includes('WebSocket') || event.error.message.includes('websocket')))
    ) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  });
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

