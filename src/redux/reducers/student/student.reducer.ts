import { Reducer } from 'redux';
import { StudentAction, StudentActionType, StudentState } from './student.type';

const initialState: StudentState = {
  isFetching: false,
  students: []
};

const studentReducer: Reducer<StudentState, StudentAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case StudentActionType.STUDENT_ACTION_PENDING:
      return { ...state, isFetching: true };
    case StudentActionType.STUDENT_ACTION_FAILURE:
      return { ...state, isFetching: false };
    case StudentActionType.GET_ALL_STUDENT_SUCCESS:
      return { ...state, isFetching: false, students: action.payload };
    case StudentActionType.CREATE_STUDENT_SUCCESS:
    case StudentActionType.GET_STUDENT_BY_ID_SUCCESS:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default studentReducer;
