import { BaseModel } from '.';
import { TimeTable } from './ICourse';
import { IFacility } from './IFacility';

export interface IRoom extends BaseModel {
  name: string;
  description: string;
  capacity: number;
  image?: string;
  facilities: IFacility[];
  timeTables: TimeTable[];
}

export interface SelectedFacilities {
  id: string;
  qty: number;
}
