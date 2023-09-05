import { Reducer } from 'redux';
import {
  FeedbackAction,
  FeedbackActionType,
  FeedbackState
} from './feedback.type';

const initialState: FeedbackState = {
  isFetching: false,
  feedbacks: []
};

const feedbackReducer: Reducer<FeedbackState, FeedbackAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FeedbackActionType.FEEDBACK_ACTION_PENDING:
      return { ...state, isFetching: true };
    case FeedbackActionType.CREATE_FEEDBACK_SUCCESS:
    case FeedbackActionType.FEEDBACK_ACTION_FAILURE:
      return { ...state, isFetching: false };
    case FeedbackActionType.GET_ALL_FEEDBACK_SUCCESS:
      return { ...state, isFetching: false, feedbacks: action.payload };
    default:
      return state;
  }
};

export default feedbackReducer;
