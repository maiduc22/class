import { BaseModel } from '.';

export interface IFeedback extends BaseModel {
  email: string;
  phoneNumber: string;
  content: string;
}
