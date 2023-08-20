import { BaseModel } from '.';
import { ICourse } from './ICourse';

export interface IUser extends BaseModel {
  username: string;
  fullName: string;
  password: string;
  dob: string;
  dayOfBirth: string;
  phoneNumber: string;
  role: IUserRole;
  courses?: ICourse[];
  email: string;
}

export enum IUserRole {
  ADMIN = 'ROLE_ADMIN',
  TEACHER = 'ROLE_TEACHER',
  STUDENT = 'ROLE_STUDENT'
}

export enum IUserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export const IUserStatusDict: Record<
  IUserStatus,
  { label: string; color: string }
> = {
  [IUserStatus.ACTIVE]: {
    label: 'Đang hoạt động',
    color: 'blue'
  },
  [IUserStatus.INACTIVE]: {
    label: 'Dừng hoạt động',
    color: 'orange'
  }
};

export const IUserRoleDict: Record<
  IUserRole,
  { label: string; color: string }
> = {
  [IUserRole.ADMIN]: {
    label: 'Admin',
    color: 'orange'
  },
  [IUserRole.TEACHER]: {
    label: 'Giáo viên',
    color: 'blue'
  },
  [IUserRole.STUDENT]: {
    label: 'Học sinh',
    color: 'green'
  }
};
