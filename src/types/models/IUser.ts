import { BaseModel } from '.';

export interface IUser extends BaseModel {
  username: string;
  role: IUserRole;
  fullname: string;
  password: string;
  avatar?: string;
  dob: Date;
  description?: string;
  email?: string;
  employeeCode?: string;
  gender: IUserGender;
  phoneNumber: string;
  status: IUserStatus;
  title: string;
}

export enum IUserRole {}

export enum IUserGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum IUserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}
