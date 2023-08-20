import { BaseModel } from '.';

export interface IRoom extends BaseModel {
  name: string;
  description: string;
  capacity: number;
  image?: string;
}
