import { ICourse } from '@/types/models/ICourse';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';

export interface CourseState {
  isFetching: boolean;
  courses: ICourse[];
}

export enum CourseActionType {
  COURSE_ACTION_PENDING = 'COURSE_ACTION_PENDING',
  COURSE_ACTION_FAILURE = 'COURSE_ACTION_FAILURE',

  GET_ALL_COURSE_SUCCESS = 'GET_ALL_COURSE_ACTION_SUCCESS',
  CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS',
  GET_COURSE_BY_ID_SUCCESS = 'GET_COURSE_BY_ID_SUCCESS'
}

export interface CourseActionPending {
  type: CourseActionType.COURSE_ACTION_PENDING;
}

export interface CourseActionFailure {
  type: CourseActionType.COURSE_ACTION_FAILURE;
}

export interface GetAllCourseSuccess {
  type: CourseActionType.GET_ALL_COURSE_SUCCESS;
  payload: ICourse[];
}

export interface CreateCourseSuccess {
  type: CourseActionType.CREATE_COURSE_SUCCESS;
}

export interface GetCourseByIdSuccess {
  type: CourseActionType.GET_COURSE_BY_ID_SUCCESS;
}

export type CourseAction =
  | CourseActionPending
  | CourseActionFailure
  | GetAllCourseSuccess
  | CreateCourseSuccess
  | GetCourseByIdSuccess;

export type CourseThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  CourseAction
>;
