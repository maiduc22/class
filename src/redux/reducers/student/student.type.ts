import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { IUser } from '@/types/models/IUser';

export interface StudentState {
  isFetching: boolean;
  students: IUser[];
}

export enum StudentActionType {
  STUDENT_ACTION_PENDING = 'STUDENT_ACTION_PENDING',
  STUDENT_ACTION_FAILURE = 'STUDENT_ACTION_FAILURE',

  GET_ALL_STUDENT_SUCCESS = 'GET_ALL_STUDENT_ACTION_SUCCESS',
  CREATE_STUDENT_SUCCESS = 'CREATE_STUDENT_SUCCESS',
  GET_STUDENT_BY_ID_SUCCESS = 'GET_STUDENT_BY_ID_SUCCESS'
}

export interface StudentActionPending {
  type: StudentActionType.STUDENT_ACTION_PENDING;
}

export interface StudentActionFailure {
  type: StudentActionType.STUDENT_ACTION_FAILURE;
}

export interface GetAllStudentSuccess {
  type: StudentActionType.GET_ALL_STUDENT_SUCCESS;
  payload: IUser[];
}

export interface CreateStudentSuccess {
  type: StudentActionType.CREATE_STUDENT_SUCCESS;
}

export interface GetStudentByIdSuccess {
  type: StudentActionType.GET_STUDENT_BY_ID_SUCCESS;
}

export type StudentAction =
  | StudentActionPending
  | StudentActionFailure
  | GetAllStudentSuccess
  | CreateStudentSuccess
  | GetStudentByIdSuccess;

export type StudentThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  StudentAction
>;
