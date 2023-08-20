import { BaseModel } from '.';
import { IUser } from './IUser';

export interface IClass extends BaseModel {
  name: string;
  day: string[];
  room: string;
  start?: string;
  end?: string;
  students: IUser[];
}
