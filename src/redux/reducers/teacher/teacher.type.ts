import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { IUser } from '@/types/models/IUser';

export interface TeacherState {
  isFetching: boolean;
  teachers: IUser[];
}

export enum TeacherActionType {
  TEACHER_ACTION_PENDING = 'TEACHER_ACTION_PENDING',
  TEACHER_ACTION_FAILURE = 'TEACHER_ACTION_FAILURE',

  GET_ALL_TEACHER_SUCCESS = 'GET_ALL_TEACHER_ACTION_SUCCESS',
  CREATE_TEACHER_SUCCESS = 'CREATE_TEACHER_SUCCESS',
  UPDATE_TEACHER_SUCCESS = 'UPDATE_TEACHER_SUCCESS',
  DELETE_TEACHER_SUCCESS = 'DELETE_TEACHER_SUCCESS',
  GET_DETAILS_TEACHER_SUCCESS = 'GET_DETAILS_TEACHER_SUCCESS',
  ADD_USER_SUCCESS = 'ADD_USER_SUCCESS',
  REMOVE_USER_SUCCESS = 'REMOVE_USER_SUCCESS'
}

export interface TeacherActionPending {
  type: TeacherActionType.TEACHER_ACTION_PENDING;
}

export interface TeacherActionFailure {
  type: TeacherActionType.TEACHER_ACTION_FAILURE;
}

export interface GetAllTeacherSuccess {
  type: TeacherActionType.GET_ALL_TEACHER_SUCCESS;
  payload: IUser[];
}

export interface CreateTeacherSuccess {
  type: TeacherActionType.CREATE_TEACHER_SUCCESS;
}

export interface UpdateTeacherSuccess {
  type: TeacherActionType.UPDATE_TEACHER_SUCCESS;
}

export interface DeleteTeacherSuccess {
  type: TeacherActionType.DELETE_TEACHER_SUCCESS;
}
export interface GetDetailsTeacherSuccess {
  type: TeacherActionType.GET_DETAILS_TEACHER_SUCCESS;
}
export interface AddUserSuccess {
  type: TeacherActionType.ADD_USER_SUCCESS;
}
export interface RemoveUserSuccess {
  type: TeacherActionType.REMOVE_USER_SUCCESS;
}

export type TeacherAction =
  | TeacherActionPending
  | TeacherActionFailure
  | GetAllTeacherSuccess
  | CreateTeacherSuccess
  | UpdateTeacherSuccess
  | DeleteTeacherSuccess
  | GetDetailsTeacherSuccess
  | AddUserSuccess
  | RemoveUserSuccess;

export type TeacherThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  TeacherAction
>;
