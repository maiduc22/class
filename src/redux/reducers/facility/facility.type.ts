import { IFacility } from '@/types/models/IFacility';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';

export interface FacilityState {
  isFetching: boolean;
  facilities: IFacility[];
}

export enum FacilityActionType {
  FACILITY_ACTION_PENDING = 'FACILITY_ACTION_PENDING',
  FACILITY_ACTION_FAILURE = 'FACILITY_ACTION_FAILURE',

  GET_ALL_FACILITY_SUCCESS = 'GET_ALL_FACILITY_ACTION_SUCCESS',
  CREATE_FACILITY_SUCCESS = 'CREATE_FACILITY_SUCCESS'
}

export interface FacilityActionPending {
  type: FacilityActionType.FACILITY_ACTION_PENDING;
}

export interface FacilityActionFailure {
  type: FacilityActionType.FACILITY_ACTION_FAILURE;
}

export interface GetAllFacilitySuccess {
  type: FacilityActionType.GET_ALL_FACILITY_SUCCESS;
  payload: IFacility[];
}

export interface CreateFacilitySuccess {
  type: FacilityActionType.CREATE_FACILITY_SUCCESS;
}

export type FacilityAction =
  | FacilityActionPending
  | FacilityActionFailure
  | GetAllFacilitySuccess
  | CreateFacilitySuccess;

export type FacilityThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  FacilityAction
>;
