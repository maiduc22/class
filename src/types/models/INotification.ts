import { BaseModel } from '.';
import { ICourse } from './ICourse';

export interface INotification extends BaseModel {
  title: string;
  content: string;
  fileUrls: string[];
  isPublic: boolean;
  courses: ICourse[];
  senderId: string;
  senderName: string;
}
