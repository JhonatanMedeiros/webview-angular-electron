// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules Imports
import { CoreRoutingModule } from './core-routing.module';

// Components Imports
import { CoreComponent } from './core.component';
import { UrlListComponent } from './pages/url-list/url-list.component';
import { DataTableModule } from '@projects/data-table';

@NgModule({
  declarations: [
    CoreComponent,
    UrlListComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    DataTableModule
  ]
})
export class CoreModule { }
