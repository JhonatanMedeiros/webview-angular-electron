export interface IColumn {
  label?: string;
  field?: string;
  actions?: IColumnAction[];
  type?: EColumnType;
}

export interface IColumnAction {
  label?: string;
  icon?: string;
  command?: (event?: ICommandEvent) => void;
  disabled?: boolean;
}

export interface ICommandEvent {
  originalEvent: MouseEvent;
  item: any;
}

export enum EColumnType {
  text,
  checkbox,
  actions,
}
