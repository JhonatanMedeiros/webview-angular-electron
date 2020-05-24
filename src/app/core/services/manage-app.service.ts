// Angular Imports
import { Injectable } from '@angular/core';

// External Libs
import { Observable, of } from 'rxjs';

// Models Imports
import { IManageApp } from '@app/core/models';

// Services Imports
import { ElectronService } from '@app/services';

@Injectable()
export class ManageAppService {

  constructor(private electronService: ElectronService) { }

  list(): Observable<IManageApp[]> {
    return of([
      { name: 'Local Host 1', url: 'localhost:5555' },
      { name: 'Local Host 2', url: 'localhost:5555' },
      { name: 'Local Host 3', url: 'localhost:5555' },
      { name: 'Local Host 4', url: 'localhost:5555' },
      { name: 'Local Host 5', url: 'http://google.com' },
    ]);
  }

  create(manageApp: IManageApp): Observable<IManageApp> {
    return of({ id: '', name: '', url: '' });
  }

  update(manageApp: IManageApp): Observable<IManageApp> {
    return of({ id: '', name: '', url: '' });
  }
}
