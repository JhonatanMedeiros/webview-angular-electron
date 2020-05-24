// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Modules Imports
import { CoreRoutingModule } from './core-routing.module';

// LIB Data Table Import
import { DataTableModule } from '@projects/data-table';

// Components Imports
import { CoreComponent } from './core.component';
import { ManageAppListComponent } from '@core/pages';
import { ModalFormAppComponent } from './components';

// Services Imports
import { ManageAppService } from '@core/services';

@NgModule({
  declarations: [
    CoreComponent,
    ManageAppListComponent,
    ModalFormAppComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreRoutingModule,
    DataTableModule
  ],
  providers: [ManageAppService]
})
export class CoreModule { }
