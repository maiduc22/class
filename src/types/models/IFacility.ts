import { BaseModel } from '.';

export interface IFacility extends BaseModel {
  name: string;
  description: string;
  image: string;
  qty: number;
}
