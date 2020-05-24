import { Injectable } from '@angular/core';
import { IColumn } from '@projects/data-table';

@Injectable()
export class DataTableService {

  constructor() { }

  public itemField(item: any, column: IColumn): any {
    return item[column.field] || '';
  }
}
