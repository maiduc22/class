import { IRequest } from '@/types/models/IRequest';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';

export interface TimeoffState {
  isFetching: boolean;
  requests: IRequest[];
}

export enum TimeoffActionType {
  TIMEOFF_ACTION_PENDING = 'TIMEOFF_ACTION_PENDING',
  TIMEOFF_ACTION_FAILURE = 'TIMEOFF_ACTION_FAILURE',
  REQUEST_TIMEOFF_SUCCESS = 'REQUEST_TIMEOFF_SUCCESS'
}

export interface TimeoffActionPending {
  type: TimeoffActionType.TIMEOFF_ACTION_PENDING;
}

export interface TimeoffActionFailure {
  type: TimeoffActionType.TIMEOFF_ACTION_FAILURE;
}

export interface RequestTimeoffSuccess {
  type: TimeoffActionType.REQUEST_TIMEOFF_SUCCESS;
}

export type TimeoffAction =
  | TimeoffActionPending
  | TimeoffActionFailure
  | RequestTimeoffSuccess;

export type TimeoffThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  TimeoffAction
>;
