// Angular Imports
import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

// External Libs
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Models Imports
import { IManageApp } from '@app/core/models';

// Services Imports
import { ElectronService } from '@app/services';

// DB Keys Imports
import { __STORE_KEY_CREATE__, __STORE_KEY_DELETE__, __STORE_KEY_LIST__, __STORE_KEY_UPDATE__ } from '../../../../main-process/store/keys';

@Injectable()
export class ManageAppService {

  private readonly ipcRenderer: IpcRenderer;

  constructor(private electronService: ElectronService) {
    this.ipcRenderer = this.electronService.ipcRenderer;
  }

  list(): Observable<IManageApp[]> {
    return new Observable<IManageApp[]>((obs) => {
      this.ipcRenderer.invoke(__STORE_KEY_LIST__, null)
        .then((result) => obs.next(result))
        .catch(reason => obs.error(reason))
        .finally(() => obs.complete());
    }).pipe(catchError(this.handleError));
  }

  create(manageApp: IManageApp): Observable<IManageApp> {
    return new Observable<IManageApp>((obs) => {
      this.ipcRenderer.invoke(__STORE_KEY_CREATE__, manageApp)
        .then((result) => obs.next(result))
        .catch(reason => obs.error(reason))
        .finally(() => obs.complete());
    }).pipe(catchError(this.handleError));
  }

  update(manageApp: IManageApp): Observable<IManageApp> {
    return new Observable<IManageApp>((obs) => {
      this.ipcRenderer.invoke(__STORE_KEY_UPDATE__, manageApp)
        .then((result) => obs.next(result))
        .catch(reason => obs.error(reason))
        .finally(() => obs.complete());
    }).pipe(catchError(this.handleError));
  }

  delete(id: string): Observable<IManageApp> {
    return new Observable<IManageApp>((obs) => {
      this.ipcRenderer.invoke(__STORE_KEY_DELETE__, id)
        .then((result) => obs.next(result))
        .catch(reason => obs.error(reason))
        .finally(() => obs.complete());
    }).pipe(catchError(this.handleError));
  }

  openManageAPP(url: string): Observable<any> {
    return new Observable<any>((obs) => {
      this.ipcRenderer.invoke('url-channel', { url })
        .then((result) => obs.next(result))
        .finally(() => obs.complete());
    }).pipe(catchError(this.handleError));
  }

  private handleError(error): Observable<any> {
    const isElectron = (this.electronService && this.electronService.isElectron);

    let errorMessage = '';
    if (!isElectron) {
      errorMessage = 'Error: Not Electron APP';
    } else if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }
}
