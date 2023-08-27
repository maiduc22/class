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

export type UpdateUserPayload = {
  fullName: string;
  dob: string;
  email: string;
  phoneNumber: string;
};
export type CreateCoursePayload = {
  name: string;
  description: string;
  roomId?: string;
  teacherId?: string;
  timeTables: TimeTable[];
};
export type CreateFacilityPayload = {
  name: string;
  description: string;
  image?: string;
};
export type CreateRoomPayload = {
  name: string;
  description: string;
  image?: string;
  capacity: number;
  facilities: { id: string; qty: number }[];
};
export type ApiEndPointPayload =
  | LoginPayload
  | RegisterPayload
  | string[]
  | UpdateUserPayload
  | CreateFacilityPayload
  | CreateRoomPayload;
