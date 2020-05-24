// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Data Table Imports
import { DataTableComponent } from './data-table.component';
import { DataTableService } from './service/data-table.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [CommonModule, RouterModule, TooltipModule.forRoot()],
  declarations: [DataTableComponent],
  providers: [DataTableService],
  exports: [DataTableComponent]
})
export class DataTableModule { }
