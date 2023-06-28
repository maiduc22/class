import { IRequest } from '@/types/models/IRequest';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';

export interface TimeoffState {
  isFetching: boolean;
  allRequests: IRequest[];
  myRequests: IRequest[];
}

export enum TimeoffActionType {
  TIMEOFF_ACTION_PENDING = 'TIMEOFF_ACTION_PENDING',
  TIMEOFF_ACTION_FAILURE = 'TIMEOFF_ACTION_FAILURE',
  REQUEST_TIMEOFF_SUCCESS = 'REQUEST_TIMEOFF_SUCCESS',
  GET_MY_REQUEST_SUCCESS = 'GET_MY_REQUEST_SUCCESS',
  GET_ALL_REQUEST_SUCCESS = ' GET_ALL_REQUEST_SUCCESS',
  GET_BALANCE_HISTORY_SUCCESS = 'GET_BALANCE_HISTORY_SUCCESS'
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

export interface GetMyRequestSuccess {
  type: TimeoffActionType.GET_MY_REQUEST_SUCCESS;
  payload: IRequest[];
}

export interface GetAllRequestSuccess {
  type: TimeoffActionType.GET_ALL_REQUEST_SUCCESS;
  payload: IRequest[];
}

export interface GetBalanceHistorySuccess {
  type: TimeoffActionType.GET_BALANCE_HISTORY_SUCCESS;
}

export type TimeoffAction =
  | TimeoffActionPending
  | TimeoffActionFailure
  | RequestTimeoffSuccess
  | GetAllRequestSuccess
  | GetBalanceHistorySuccess
  | GetMyRequestSuccess;

export type TimeoffThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  TimeoffAction
>;
