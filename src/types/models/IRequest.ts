import { BaseModel } from '.';

export interface IRequest extends BaseModel {
  from: string;
  to: string;
  total: number;
  type: IRequestType;
  status: IRequestStatus;
  note?: string;
  attachmentUrl?: string;
}

export enum IRequestType {
  ALL = 'ALL',
  ANNUAL = 'ANNUAL',
  UNPAID = 'UNPAID',
  WEDDING = 'WEDDING'
}

export enum IRequestStatus {
  ALL = 'ALL',
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED'
}

export const IRequestStatusDict: Record<
  IRequestStatus,
  { label: string; color: string }
> = {
  [IRequestStatus.ALL]: {
    label: 'Tất cả',
    color: ''
  },
  [IRequestStatus.APPROVED]: {
    label: 'Đã chấp thuận',
    color: 'green'
  },
  [IRequestStatus.PENDING]: {
    label: 'Đang chờ',
    color: 'orange'
  },
  [IRequestStatus.CANCELLED]: {
    label: 'Đã huỷ',
    color: 'yellow'
  },
  [IRequestStatus.REJECTED]: {
    label: 'Đã bị từ chối',
    color: 'red'
  }
};

export const IRequestTypeDict: Record<IRequestType, { label: string }> = {
  [IRequestType.ALL]: {
    label: 'Tất cả'
  },
  [IRequestType.ANNUAL]: {
    label: 'Nghỉ phép năm'
  },
  [IRequestType.UNPAID]: {
    label: 'Nghỉ không lương'
  },
  [IRequestType.WEDDING]: {
    label: 'Đám cưới'
  }
};
