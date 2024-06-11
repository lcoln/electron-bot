'use client';

import { useEffect } from 'react';

function handleIsElectron() {
  return Boolean(window && window.process && window.process.type);
}

async function createChildWindow() {
  const { remote } = require('electron');
  const { BrowserWindow } = remote;

  let childWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  childWindow.loadURL(`file://${__dirname}/child.html`);
  childWindow.setAlwaysOnTop(true);
  childWindow.maximize();

  childWindow.on('closed', () => {
    childWindow = null;
  });

  return childWindow;
}

export function useScreenShot() {
  useEffect(() => {
    let currWindow;

    const handleKeyDown = async (event) => {
      const { shiftKey, ctrlKey, key } = event;

      if (handleIsElectron()) {
        switch (key) {
          case 'x':
            if (shiftKey && ctrlKey) {
              currWindow = await createChildWindow();
            }
            break;
          case 'Escape':
            if (currWindow) {
              currWindow.close();
              currWindow = null;
            }
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}
