import { TimeTable } from '@/types/models/ICourse';
import { SelectedFacilities } from '@/types/models/IRoom';
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
  description?: string;
  image?: string;
};
export type CreateCoursePayload = {
  name: string;
  description: string;
  roomId?: string;
  teacherId?: string;
  timeTables: TimeTable[];
  members: number;
  studentIDs: string[];
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
  facilities?: SelectedFacilities[];
};

export type CreateNewsPayload = {
  title: string;
  content: string;
};

export type CreateNotificationPayload = {
  title: string;
  content: string;
  fileUrls: string[];
  senderId: string;
  courseIds: string[] | null;
  public: boolean;
};

export type ApiEndPointPayload =
  | LoginPayload
  | RegisterPayload
  | string[]
  | UpdateUserPayload
  | CreateFacilityPayload
  | CreateRoomPayload
  | CreateNewsPayload
  | CreateNotificationPayload;
