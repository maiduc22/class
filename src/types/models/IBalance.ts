import { BaseModel } from '.';
import { IRequestType } from './IRequest';

export interface IBalance extends BaseModel {
  employeeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6';
  type: IRequestType;
  event: IBalanceEvent;
  changedBy: string;
  changeDays: number;
  deleted?: boolean;
  date: string;
}

export enum IBalanceEvent {
  TAKE_TIME_OFF = '',
  BALANCE_ADJUSTMENT = '',
  ACCRUAL = ''
}
