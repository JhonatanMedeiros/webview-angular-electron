import { app, BrowserWindow, screen as electronScreen } from 'electron';
import * as path from 'path';
import * as url from 'url';

const args = process.argv.slice(1);

export class MainWindow {

  browserWindow: BrowserWindow = null;
  serve = args.some(val => val === '--serve');
  port = args.some(val => val === '--port');

  constructor() {
    this.createWindow();
  }

  createWindow(): BrowserWindow {

    const size = electronScreen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    this.browserWindow = new BrowserWindow({
      x: 0,
      y: 0,
      width: size.width,
      height: size.height,
      title: app.getName(),
      alwaysOnTop: false,
      webPreferences: {
        nodeIntegration: true,
        allowRunningInsecureContent: this.serve,
      },
    });

    this.initURL();

    // Emitted when the window is closed.
    this.browserWindow.on('closed', () => {
      // Dereference the window object, usually you would store window
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      this.browserWindow = null;
    });

    return this.browserWindow;
  }

  returnToHome(): void {
    this.initURL();
  }

  setAlwaysOnTop(flag: boolean): void {
    this.browserWindow.setAlwaysOnTop(flag);
  }

  private initURL(): void {
    if (this.serve) {

      require('devtron').install();
      this.browserWindow.webContents.openDevTools();

      require('electron-reload')(__dirname + '../../', {
        electron: require(`${__dirname}/../../node_modules/electron`)
      });
      const icon = path.join(__dirname, '..', '..', 'src', 'assets', 'icons', 'icon.png');
      this.browserWindow.setIcon(icon);
      this.browserWindow.loadURL(`http://localhost:${this.port || 4200}`);

    } else {
      const icon = path.join(__dirname, '..', '..', 'dist', 'webview-angular-electron', 'assets', 'icons', 'icon.png');
      this.browserWindow.setIcon(icon);
      this.browserWindow.loadURL(url.format({
        pathname: path.join(__dirname, '..', '..', 'dist', 'webview-angular-electron', 'index.html'),
        protocol: 'file:',
        slashes: true
      }));
    }
  }
}
