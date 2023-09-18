import { INotification } from '@/types/models/INotification';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';

export interface NotificationState {
  isFetching: boolean;
  notifications: INotification[];
}

export enum NotificationActionType {
  NOTIFICATION_ACTION_PENDING = 'NOTIFICATION_ACTION_PENDING',
  NOTIFICATION_ACTION_FAILURE = 'NOTIFICATION_ACTION_FAILURE',

  GET_ALL_NOTIFICATION_SUCCESS = 'GET_ALL_NOTIFICATION_ACTION_SUCCESS',
  CREATE_NOTIFICATION_SUCCESS = 'CREATE_NOTIFICATION_SUCCESS'
}

export interface NotificationActionPending {
  type: NotificationActionType.NOTIFICATION_ACTION_PENDING;
}

export interface NotificationActionFailure {
  type: NotificationActionType.NOTIFICATION_ACTION_FAILURE;
}

export interface GetAllNotificationSuccess {
  type: NotificationActionType.GET_ALL_NOTIFICATION_SUCCESS;
  payload: INotification[];
}

export interface CreateNotificationSuccess {
  type: NotificationActionType.CREATE_NOTIFICATION_SUCCESS;
}

export type NotificationAction =
  | NotificationActionPending
  | NotificationActionFailure
  | GetAllNotificationSuccess
  | CreateNotificationSuccess;

export type NotificationThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  NotificationAction
>;
