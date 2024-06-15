import { BrowserWindow, ipcMain, screen, desktopCapturer, app } from 'electron';
import path from 'path';

const remoteMain = require('@electron/remote/main');

const fs = require('fs');

/** ********* 在所有屏幕上打开新窗口 ************* */
const captureScreen = async (thumbnailSize) => {
  const sources = await desktopCapturer.getSources({
    types: ['screen'],
    thumbnailSize,
  });
  const screenSource =
    sources.find((source) => source.name === 'Entire screen') || sources[0];

  const screenshotBuffer = await screenSource.thumbnail.toPNG();
  const screenshotPath = path.join(app.getPath('temp'), 'screenshot.png');

  fs.writeFileSync(screenshotPath, screenshotBuffer);
  return screenshotPath;
};
interface IConfig {
  config?: Record<string, any>;
}
const createWindowOnAllDisplays = (arg?: IConfig) => {
  const { config = {} } = arg || {};
  const displays = screen.getAllDisplays();
  const wins = [];
  displays.forEach(async (display) => {
    console.log(display);
    const { x, y, width, height } = display.bounds;
    const displayConfig = {
      ...config,
      x,
      y,
      width,
      height,
      enableLargerThanScreen: true, // mac
      visibleOnAllWorkspaces: true,
      resizable: false,
      movable: false,
      skipTaskbar: true,
      frame: false,
      transparent: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: app.isPackaged
          ? path.join(__dirname, '..', 'preload', 'screenshot')
          : path.join(__dirname, '../../../.erb/dll/preload.js'),
      },
    };
    const win = new BrowserWindow(displayConfig);
    remoteMain.enable(win.webContents);

    // test
    // win.setAlwaysOnTop(true, 'screen-saver');
    const screenshotPath = await captureScreen({
      width: width * display.scaleFactor,
      height: height * display.scaleFactor,
    });
    win.loadURL(
      `file://${path.resolve(
        __dirname,
        '..',
        '..',
        '..',
      )}/assets/html/screenshot.html?path=${screenshotPath}`,
    );
    // 在内容加载完成后让新窗口获得焦点
    win.webContents.on('did-finish-load', () => {
      win.focus();
    });
    // 监听右键事件，显示自定义菜单
    win.webContents.openDevTools();
    wins.push(win);
  });

  ipcMain.on('closeWindowsOnDisplays', () => {
    console.log({ wins });
    while (wins.length) {
      wins.shift().close();
    }
  });
};

ipcMain.on('openWindowsOnDisplays', (event, { config = {} } = {}) => {
  createWindowOnAllDisplays({ config });
});
/** ********* 在所有屏幕上打开新窗口 ************* */
