'use client';

import { useEffect } from 'react';

function handleIsElectron() {
  return Boolean(window && window.process && window.process.type);
}

export function useScreenShot() {
  useEffect(() => {
    let currWindow;

    const handleKeyDown = async (event) => {
      // if (!handleIsElectron()) return;

      console.log(window.navigator.platform);
      const isMac = window.navigator.platform.includes('Mac');
      const { shiftKey, ctrlKey, metaKey, key } = event;
      console.log({ shiftKey, ctrlKey, key });

      if (isMac ? metaKey : ctrlKey) {
        switch (key) {
          case 'x':
            if (shiftKey) {
              console.log(878987689);
              currWindow = window.electron.openWindow({
                config: {
                  width: 800,
                  height: 600,
                  frame: false,
                  transparent: true,
                  webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false,
                  },
                },
                url: `'/assets/html/screenshot.html`,
              });
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
