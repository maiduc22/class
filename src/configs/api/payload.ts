import { TimeTable } from '@/types/models/ICourse';
import { IUserRole } from '@/types/models/IUser';

export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  password: string;
  fullName: string;
  role: IUserRole;
};

export type CreateCoursePayload = {
  name: string;
  description: string;
  roomId?: string;
  teacherId?: string;
  timeTables: TimeTable[];
};

export type ApiEndPointPayload = LoginPayload | RegisterPayload | string[];
