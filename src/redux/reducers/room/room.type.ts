import { IRoom } from '@/types/models/IRoom';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';

export interface RoomState {
  isFetching: boolean;
  rooms: IRoom[];
}

export enum RoomActionType {
  ROOM_ACTION_PENDING = 'ROOM_ACTION_PENDING',
  ROOM_ACTION_FAILURE = 'ROOM_ACTION_FAILURE',

  GET_ALL_ROOM_SUCCESS = 'GET_ALL_ROOM_ACTION_SUCCESS',
  CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS'
}

export interface RoomActionPending {
  type: RoomActionType.ROOM_ACTION_PENDING;
}

export interface RoomActionFailure {
  type: RoomActionType.ROOM_ACTION_FAILURE;
}

export interface GetAllRoomSuccess {
  type: RoomActionType.GET_ALL_ROOM_SUCCESS;
  payload: IRoom[];
}

export interface CreateRoomSuccess {
  type: RoomActionType.CREATE_ROOM_SUCCESS;
}

export type RoomAction =
  | RoomActionPending
  | RoomActionFailure
  | GetAllRoomSuccess
  | CreateRoomSuccess;

export type RoomThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  RoomAction
>;
