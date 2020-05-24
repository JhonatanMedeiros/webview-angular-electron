// Angular Imports
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

// Data Table Imports
import { DataTableService } from './service/data-table.service';
import { EColumnType, IColumn, IColumnAction } from '@projects/data-table';

@Component({
  selector: 'lib-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit {

  @Input() data: any[] = [];
  @Input() columns: IColumn[] = [];

  columnType = EColumnType;

  constructor(private dataTableService: DataTableService) { }

  ngOnInit(): void {
  }

  itemValue(item: any, column: IColumn): any {
    return this.dataTableService.itemField(item, column);
  }

  actionClick(originalEvent: MouseEvent, item: any, action: IColumnAction): void {
    if (action.command) {
      action.command({ originalEvent, item });
    }
  }

}
