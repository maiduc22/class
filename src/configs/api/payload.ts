import { IRoleProperty } from '@/types/models/IRole';

export type LoginPayload = {
  username: string;
  password: string;
};

export type CreateDepartmentPayload = {
  name: string;
  description: string;
};

export type UpdateDepartmentPayload = CreateDepartmentPayload;

export type CreateRolePayload = {
  name: string;
  description: string;
  isRoot: boolean;
  properties: IRoleProperty[];
};

export type UpdateRolePayload = CreateRolePayload;

export type AssignRolePermissionPayload = {
  permissionIds: string[];
};

export type ApiEndPointPayload =
  | LoginPayload
  | CreateDepartmentPayload
  | CreateRolePayload
  | AssignRolePermissionPayload;
