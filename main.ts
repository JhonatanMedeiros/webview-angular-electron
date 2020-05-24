import { app, ipcMain } from 'electron';
import { MainWindow } from './main-process/main-window/main-window';
import { MainMenu } from './main-process/menus/main-menu';
import { ManageAppStore } from './main-process/store/manage-app-store';

let mainWindow: MainWindow;
let store: ManageAppStore;

function initialize() {

  app.setName('WEB View Angular Electron');

  initializeStore();
  makeSingleInstance();

  try {

    app.allowRendererProcessReuse = true;

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    // Added 400 ms to fix the black background issue while using transparent window.
    // More details at https://github.com/electron/electron/issues/15947
    app.on('ready', () => setTimeout(() => {
      mainWindow = new MainWindow();
      const mainMenu = new MainMenu(mainWindow);
    }, 400));

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      // On OS X it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (!mainWindow || !mainWindow.browserWindow) {
        mainWindow.createWindow();
      }
    });

    ipcMain.handle('url-channel', async (event, data: any) => {
      console.log(data);
      const { url: browserUrl } = data;
      await mainWindow.browserWindow.loadURL(browserUrl);
      return { ok: true, browserUrl, win: mainWindow.browserWindow };
    });

  } catch (e) {
    // Catch Error
    console.error(e);
    throw e;
  }
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
  if (process.mas) {
    return;
  }

  app.requestSingleInstanceLock();

  app.on('second-instance', () => {
    if (mainWindow.browserWindow) {
      if (mainWindow.browserWindow.isMinimized()) {
        mainWindow.browserWindow.restore();
      }
      mainWindow.browserWindow.focus();
    }
  });
}

function initializeStore() {
  store = new ManageAppStore();
}

initialize();
