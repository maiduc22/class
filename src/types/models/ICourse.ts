import { BaseModel } from '.';
import { IRoom } from './IRoom';
import { IUser } from './IUser';

export interface ICourse extends BaseModel {
  name: string;
  description: string;
  roomId?: string;
  room?: IRoom;
  teacherId?: string;
  members?: number;
  students?: IUser[];
  timeTableList: TimeTable[];
}

export type TimeTable = {
  inDate: string;
  // hourStart: number;
  // minuteStart: number;
  // hourEnd: number;
  // minuteEnd: number;
  start: string;
  end: string;
};

export const DateParser = (date: string) => {
  switch (date) {
    case 'MONDAY':
      return 'Thứ 2';
    case 'TUESDAY':
      return 'Thứ 3';
    case 'WEDNESDAY':
      return 'Thứ 4';
    case 'THURSDAY':
      return 'Thứ 5';
    case 'FRIDAY':
      return 'Thứ 6';
    case 'SATURDAY':
      return 'Thứ 7';
    case 'SUNDAY':
      return 'CN';
  }
};
