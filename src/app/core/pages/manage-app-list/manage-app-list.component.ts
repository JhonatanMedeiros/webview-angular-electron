// Angular Imports
import { Component, OnDestroy, OnInit } from '@angular/core';

// External Libs
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

// Lib Data Table Imports
import { EColumnType, IColumn } from '@projects/data-table';

// Services Imports
import { ElectronService } from '@app/services';

// Components Imports
import { ModalFormAppComponent } from '@app/core/components';

// Models Imports
import { IManageApp } from '@app/core/models';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ManageAppService } from '@app/core/services';

@Component({
  selector: 'webae-manage-app-list',
  templateUrl: './manage-app-list.component.html',
  styleUrls: ['./manage-app-list.component.scss']
})
export class ManageAppListComponent implements OnInit, OnDestroy {

  // Data Models
  data: IManageApp[] = [];
  dataColumns: IColumn[] = [
    { type: EColumnType.checkbox },
    { label: 'Name', field: 'name' },
    { label: 'URL', field: 'url' },
    { label: 'Is Online', field: 'is_online' },
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
            this.openModal(e.item);
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

  // Modal Ref
  bsModalRef: BsModalRef;

  private ngUnSubscribe: Subject<Subscription> = new Subject<Subscription>();

  constructor(
    private electronService: ElectronService,
    private modalService: BsModalService,
    private manageAppService: ManageAppService
  ) { }

  ngOnInit(): void {
    this.getManageAPPList();
  }

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  createManageApp(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.openModal();
  }

  private openUrl(url: string): void {
    this.electronService.ipcRenderer.invoke('url-channel', { url })
      .then((result) => {
        console.log(result);
      });
  }

  private openModal(item?: IManageApp): void {
    const initialState = { data: item };
    this.bsModalRef = this.modalService.show(ModalFormAppComponent, {initialState});

    (this.bsModalRef.content as ModalFormAppComponent).submitData
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((data: IManageApp) => {
        console.log(data);
      });
  }

  private getManageAPPList(): void {
    this.manageAppService.list()
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(res => {
        this.data = [...res];
      });
  }


}
