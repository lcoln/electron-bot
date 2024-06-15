// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const electronHandler = {
  closeWindows() {
    ipcRenderer.send('closeWindowsOnDisplays');
  },
};

contextBridge.exposeInMainWorld('screenshotApi', electronHandler);

export type ElectronHandler = typeof electronHandler;
