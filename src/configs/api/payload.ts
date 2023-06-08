export type LoginPayload = {
  username: string;
  password: string;
};

export type CreateDepartmentPayload = {
  name: string;
  description: string;
};

export type UpdateDepartmentPayload = CreateDepartmentPayload;

export type ApiEndPointPayload = LoginPayload | CreateDepartmentPayload;
