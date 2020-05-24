import { Component } from '@angular/core';
import { ElectronService } from '@app/services';

@Component({
  selector: 'webae-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private electronService: ElectronService) {
    if (electronService.isElectron) {
      console.log('Mode electron');
      console.log(process.env);
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
}
