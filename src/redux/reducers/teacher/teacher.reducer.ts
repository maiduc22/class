import { Reducer } from 'redux';
import { TeacherAction, TeacherActionType, TeacherState } from './teacher.type';

const initialState: TeacherState = {
  isFetching: false,
  teachers: []
};

const teacherReducer: Reducer<TeacherState, TeacherAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TeacherActionType.TEACHER_ACTION_PENDING:
      return { ...state, isFetching: true };
    case TeacherActionType.TEACHER_ACTION_FAILURE:
      return { ...state, isFetching: false };
    case TeacherActionType.GET_ALL_TEACHER_SUCCESS:
      return { ...state, isFetching: false, teachers: action.payload };
    case TeacherActionType.CREATE_TEACHER_SUCCESS:
    case TeacherActionType.UPDATE_TEACHER_SUCCESS:
    case TeacherActionType.DELETE_TEACHER_SUCCESS:
    case TeacherActionType.GET_DETAILS_TEACHER_SUCCESS:
    case TeacherActionType.ADD_USER_SUCCESS:
    case TeacherActionType.REMOVE_USER_SUCCESS:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default teacherReducer;
