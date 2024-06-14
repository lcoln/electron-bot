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
              const rootPath =
                await window.electron.ipcRenderer.invoke('get-root-path');
              console.log(878987689, rootPath);
              const screenshotPath = await window.electron.captureScreen();

              currWindow = window.electron.openWindowsOnDisplays({
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
                url: `file://${rootPath}/assets/html/screenshot.html?path=${screenshotPath}`,
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
