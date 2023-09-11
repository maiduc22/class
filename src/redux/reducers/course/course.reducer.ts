import { Reducer } from 'redux';
import { CourseAction, CourseActionType, CourseState } from './course.type';

const initialState: CourseState = {
  isFetching: false,
  courses: []
};

const courseReducer: Reducer<CourseState, CourseAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CourseActionType.COURSE_ACTION_PENDING:
      return { ...state, isFetching: true };
    case CourseActionType.CREATE_COURSE_SUCCESS:
    case CourseActionType.COURSE_ACTION_FAILURE:
    case CourseActionType.GET_COURSE_BY_ID_SUCCESS:
      return { ...state, isFetching: false };
    case CourseActionType.GET_ALL_COURSE_SUCCESS:
      return { ...state, isFetching: false, courses: action.payload };
    default:
      return state;
  }
};

export default courseReducer;
