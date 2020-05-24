import { app, BrowserWindow, dialog, Menu, shell } from 'electron';
import { MainWindow } from '../main-window/main-window';


export class MainMenu {

  mainWindow: MainWindow;

  menus: any[] = [
    {
      label: 'App',
      submenu: [
        {
          label: 'Go to Home',
          click: () => {
            this.mainWindow.returnToHome();
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Settings...',
        },
        {
          type: 'separator'
        },
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              // on reload, start fresh and close any old
              // open secondary windows
              if (focusedWindow.id === 1) {
                BrowserWindow.getAllWindows().forEach(win => {
                  if (win.id > 1) {
                    win.close();
                  }
                });
              }
              focusedWindow.reload();
            }
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: (() => {
            if (process.platform === 'darwin') {
              return 'Ctrl+Command+F';
            } else {
              return 'F11';
            }
          })(),
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: (() => {
            if (process.platform === 'darwin') {
              return 'Alt+Command+I';
            } else {
              return 'Ctrl+Shift+I';
            }
          })(),
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.toggleDevTools();
            }
          }
        },
        {
          label: 'Always On Top',
          type: 'checkbox',
          checked: false,
          accelerator: 'CmdOrCtrl+Shift+O',
          click: (e) => {
            this.mainWindow.setAlwaysOnTop(e.checked);
          }
        }
      ]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
        {
          type: 'separator'
        },
        {
          label: 'Reopen Window',
          accelerator: 'CmdOrCtrl+Shift+T',
          enabled: false,
          key: 'reopenMenuItem',
          click: () => {
            app.emit('activate');
          }
        }
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'GitHub',
          click: () => {
            shell.openExternal('https://github.com/JhonatanMedeiros/webview-angular-electron/');
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'About',
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              const options = {
                  type: 'info',
                  title: 'WEB View Angular Electron',
                  buttons: ['Ok'],
                  message: `Version: ${app.getVersion()}\nElectron: ${process.versions.electron}\nChrome: ${process.versions.chrome}\nNode: ${process.versions.node}\nV8: ${process.versions.v8}\nOS: ${process.platform} ${process.arch} ${process.getSystemVersion()}`
                }
              ;
              dialog.showMessageBox(focusedWindow, options).then(() => {

              });
            }
          }
        },
      ]
    }
  ];

  constructor(mainWindow: MainWindow) {
    this.mainWindow = mainWindow;
    this.initializeMenu();
  }

  private initializeMenu(): void {
    const menu = Menu.buildFromTemplate(this.menus);
    Menu.setApplicationMenu(menu);
  }
}
