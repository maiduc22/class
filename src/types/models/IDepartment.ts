import { BaseModel } from '.';

export interface IDepartment extends BaseModel {
  name: string;
  description: string;
  parentId?: string;
}
