import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import DynamicRouter from './router';

console.log({ DynamicRouter });
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <MemoryRouter>
      <DynamicRouter />
    </MemoryRouter>
  </React.StrictMode>,
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
