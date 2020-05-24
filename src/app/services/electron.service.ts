// Angular Imports
import { Injectable } from '@angular/core';

// Electron Import
import { IpcRenderer, WebFrame, Remote } from 'electron';

// External Imports
import { ChildProcess } from 'child_process';
import * as fs from 'fs';

@Injectable({ providedIn: 'root' })
export class ElectronService {

  ipcRenderer: IpcRenderer;
  webFrame: WebFrame;
  remote: Remote;
  childProcess: ChildProcess;
  fs: typeof fs;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }
}
