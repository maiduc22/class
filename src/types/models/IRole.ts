import { BaseModel } from '.';
export interface IRole extends BaseModel {
  code: string;
  description: string;
  isRoot: boolean;
  name: string;
  status: IRoleStatus;
  property: IRoleProperty[];
}

enum IRoleStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum IRoleProperty {
  TECHNICAL = 'TECHNICAL',
  SERVICE = 'SERVICE',
  MANAGER = 'MANAGER'
}

export const IRoleStatusDict: Record<
  IRoleStatus,
  { label: string; color: string }
> = {
  [IRoleStatus.ACTIVE]: {
    label: 'Đang hoạt động',
    color: 'blue'
  },
  [IRoleStatus.INACTIVE]: {
    label: 'Dừng hoạt động',
    color: 'orange'
  }
};

export const IRolePropertyDict: Record<
  IRoleProperty,
  { label: string; color?: string }
> = {
  [IRoleProperty.MANAGER]: {
    label: 'Quản lý'
  },
  [IRoleProperty.SERVICE]: {
    label: 'Dịch vụ'
  },
  [IRoleProperty.TECHNICAL]: {
    label: 'Kĩ thuật'
  }
};
