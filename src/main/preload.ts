// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const { BrowserWindow } = require('@electron/remote');

// const path = require('path');

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  moveWindow: (deltaX: number, deltaY: number) => {
    const currentWindow = BrowserWindow.getFocusedWindow();
    if (currentWindow) {
      const [x, y] = currentWindow.getPosition();
      currentWindow.setPosition(x + deltaX, y + deltaY);
    }
  },
  openWindow: (arg) => {
    const { config, url } = arg;
    const childWin = new BrowserWindow(config);
    childWin.loadURL(url);
    return childWin;
  },
  openWindowsOnDisplays: (arg) => {
    ipcRenderer.send('openWindowsOnDisplays', arg);
  },
  captureScreen: () => ipcRenderer.invoke('capture-screen'),
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
