// Angular Imports
import { Component, OnInit } from '@angular/core';

// Lib Data Table Imports
import { EColumnType, IColumn } from '@projects/data-table';
import { ElectronService } from '@app/services';

@Component({
  selector: 'webae-url-list',
  templateUrl: './url-list.component.html',
  styleUrls: ['./url-list.component.scss']
})
export class UrlListComponent implements OnInit {

  data: any[] = [
    { name: 'Local Host 1', url: 'localhost:5555' },
    { name: 'Local Host 2', url: 'localhost:5555' },
    { name: 'Local Host 3', url: 'localhost:5555' },
    { name: 'Local Host 4', url: 'localhost:5555' },
    { name: 'Local Host 5', url: 'http://google.com' },
  ];
  dataColumns: IColumn[] = [
    { type: EColumnType.checkbox },
    { label: 'Name', field: 'name' },
    { label: 'URL', field: 'url' },
    {
      label: 'Actions',
      type: EColumnType.actions,
      actions: [
        {
          label: 'Edit',
          icon: 'fas fa-pen',
          command: (e) => {
            e.originalEvent.preventDefault();
            e.originalEvent.stopPropagation();
          }
        },
        {
          label: 'Delete',
          icon: 'fas fa-trash',
          command: (e) => {
            e.originalEvent.preventDefault();
            e.originalEvent.stopPropagation();
          }
        },
        {
          label: 'Open',
          icon: 'fas fa-globe',
          command: (e) => {
            e.originalEvent.preventDefault();
            e.originalEvent.stopPropagation();
            console.log(e);
            this.openUrl(e.item.url);
          }
        },
      ]
    },
  ];

  constructor(private electronService: ElectronService) { }

  ngOnInit(): void {
  }

  private openUrl(url: string): void {
    this.electronService.ipcRenderer.invoke('url-channel', { url }).then((result) => {
      console.log(result);
    });
  }

}
