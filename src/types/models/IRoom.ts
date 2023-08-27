import { BaseModel } from '.';
import { IFacility } from './IFacility';

export interface IRoom extends BaseModel {
  name: string;
  description: string;
  capacity: number;
  image?: string;
  facilities: IFacility[];
}

export interface SelectedFacilities {
  id: string;
  qty: number;
}
