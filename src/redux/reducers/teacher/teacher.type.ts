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
  GET_TEACHER_BY_ID_SUCCESS = 'GET_TEACHER_BY_ID_SUCCESS'
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

export interface GetTeacherByIdSuccess {
  type: TeacherActionType.GET_TEACHER_BY_ID_SUCCESS;
}

export type TeacherAction =
  | TeacherActionPending
  | TeacherActionFailure
  | GetAllTeacherSuccess
  | CreateTeacherSuccess
  | GetTeacherByIdSuccess;

export type TeacherThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  TeacherAction
>;
