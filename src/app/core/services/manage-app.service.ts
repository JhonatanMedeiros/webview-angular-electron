// Angular Imports
import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

// External Libs
import { Observable, of } from 'rxjs';

// Models Imports
import { IManageApp } from '@app/core/models';

// Services Imports
import { ElectronService } from '@app/services';
import { __STORE_KEY_CREATE__, __STORE_KEY_DELETE__, __STORE_KEY_LIST__, __STORE_KEY_UPDATE__ } from '../../../../main-process/store/keys';

@Injectable()
export class ManageAppService {

  private ipcRenderer: IpcRenderer;

  constructor(private electronService: ElectronService) {
    this.ipcRenderer = this.electronService.ipcRenderer;
    console.log('[ipcRenderer]', this.ipcRenderer);
  }

  list(): Observable<IManageApp[]> {
    return new Observable<IManageApp[]>((obs) => {
      this.ipcRenderer.invoke(__STORE_KEY_LIST__, null)
        .then((result) => {
          obs.next(result);
        })
        .catch(reason => {
          obs.error(reason);
        })
        .finally(() => obs.complete());
    });
  }

  create(manageApp: IManageApp): Observable<IManageApp> {
    return new Observable<IManageApp>((obs) => {
      this.ipcRenderer.invoke(__STORE_KEY_CREATE__, manageApp)
        .then((result) => {
          obs.next(result);
        })
        .catch(reason => {
          obs.error(reason);
        })
        .finally(() => obs.complete());
    });
  }

  update(manageApp: IManageApp): Observable<IManageApp> {
    return new Observable<IManageApp>((obs) => {
      this.ipcRenderer.invoke(__STORE_KEY_UPDATE__, manageApp)
        .then((result) => {
          obs.next(result);
        })
        .catch(reason => {
          obs.error(reason);
        })
        .finally(() => obs.complete());
    });
  }

  delete(id: string): Observable<IManageApp> {
    return new Observable<IManageApp>((obs) => {
      this.ipcRenderer.invoke(__STORE_KEY_DELETE__, id)
        .then((result) => {
          obs.next(result);
        })
        .catch(reason => {
          obs.error(reason);
        })
        .finally(() => obs.complete());
    });
  }
}
