// Angular Imports
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// External Libs
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';

// Models Imports
import { IManageApp } from '@app/core/models';

// Services Imports
import { ManageAppService } from '@app/core/services';

@Component({
  selector: 'webae-modal-form-app',
  templateUrl: './modal-form-app.component.html',
  styleUrls: ['./modal-form-app.component.scss'],
  providers: [ManageAppService]
})
export class ModalFormAppComponent implements OnInit, OnDestroy {

  @Input() data: IManageApp;

  @Output() submitData: EventEmitter<IManageApp> = new EventEmitter<IManageApp>();

  dataForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
  });

  private ngUnSubscribe: Subject<Subscription> = new Subject<Subscription>();

  constructor(
    public bsModalRef: BsModalRef,
    public manageAppService: ManageAppService
  ) {}

  ngOnInit(): void {
    this.dataForm.patchValue({...this.data});
  }

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  submitForm(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.dataForm.valid) {
      return;
    }

    const data: IManageApp = { ...this.data, ...this.dataForm.value };

    if (this.data && this.data.id) {
      this.updateManageApp(data);
    } else {
      this.createManageApp(data);
    }

  }

  private createManageApp(manageApp: IManageApp): void {
    this.manageAppService.create(manageApp)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(res => {
        console.log(res);
      });
  }

  private updateManageApp(manageApp: IManageApp): void {
    this.manageAppService.update(manageApp)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(res => {
        console.log(res);
      });
  }

}
