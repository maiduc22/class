import { Reducer } from 'redux';
import {
  FacilityAction,
  FacilityActionType,
  FacilityState
} from './facility.type';

const initialState: FacilityState = {
  isFetching: false,
  facilities: []
};

const facilityReducer: Reducer<FacilityState, FacilityAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FacilityActionType.FACILITY_ACTION_PENDING:
      return { ...state, isFetching: true };
    case FacilityActionType.CREATE_FACILITY_SUCCESS:
    case FacilityActionType.FACILITY_ACTION_FAILURE:
      return { ...state, isFetching: false };
    case FacilityActionType.GET_ALL_FACILITY_SUCCESS:
      return { ...state, isFetching: false, facilities: action.payload };
    default:
      return state;
  }
};

export default facilityReducer;
