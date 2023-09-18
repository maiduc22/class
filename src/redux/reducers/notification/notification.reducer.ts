import { Reducer } from 'redux';
import { NotificationAction, NotificationActionType, NotificationState } from './notification.type';

const initialState: NotificationState = {
  isFetching: false,
  notifications: []
};

const notificationReducer: Reducer<NotificationState, NotificationAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case NotificationActionType.NOTIFICATION_ACTION_PENDING:
      return { ...state, isFetching: true };
    case NotificationActionType.CREATE_NOTIFICATION_SUCCESS:
    case NotificationActionType.NOTIFICATION_ACTION_FAILURE:
      return { ...state, isFetching: false };
    case NotificationActionType.GET_ALL_NOTIFICATION_SUCCESS:
      return { ...state, isFetching: false, notifications: action.payload };
    default:
      return state;
  }
};

export default notificationReducer;
