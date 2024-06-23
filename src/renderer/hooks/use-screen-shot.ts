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

      const isMac = window.navigator.platform.includes('Mac');
      const { shiftKey, ctrlKey, metaKey, key } = event;
      console.log({ shiftKey, ctrlKey, metaKey, key });

      if (isMac ? metaKey : ctrlKey) {
        switch (key) {
          case 'x':
            if (shiftKey) {
              currWindow = window.electron.openWindowsOnDisplays();
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
