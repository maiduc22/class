import { Reducer } from 'redux';
import {
  TimeoffAction,
  TimeoffActionType,
  TimeoffState
} from './timeoff.types';

const initialState: TimeoffState = {
  isFetching: false,
  requests: []
};

const timeoffReducer: Reducer<TimeoffState, TimeoffAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TimeoffActionType.TIMEOFF_ACTION_PENDING:
      return { ...state, isFetching: true };
    case TimeoffActionType.TIMEOFF_ACTION_FAILURE:
    case TimeoffActionType.REQUEST_TIMEOFF_SUCCESS:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default timeoffReducer;
