import { Reducer } from 'redux';
import { RoomAction, RoomActionType, RoomState } from './room.type';

const initialState: RoomState = {
  isFetching: false,
  rooms: []
};

const roomReducer: Reducer<RoomState, RoomAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case RoomActionType.ROOM_ACTION_PENDING:
      return { ...state, isFetching: true };
    case RoomActionType.CREATE_ROOM_SUCCESS:
    case RoomActionType.ROOM_ACTION_FAILURE:
      return { ...state, isFetching: false };
    case RoomActionType.GET_ALL_ROOM_SUCCESS:
      return { ...state, isFetching: false, rooms: action.payload };
    default:
      return state;
  }
};

export default roomReducer;
