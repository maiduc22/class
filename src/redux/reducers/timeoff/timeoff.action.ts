import { RequestTimeoffPayload } from '@/configs/api/payload';
import { AppDispatch } from '@/redux/store';
import { Callback } from '@/types/others/callback';
import { TimeoffActionType } from './timeoff.types';
import { API_URLS } from '@/configs/api/endpoint';
import { useCallApi } from '@/configs/api';
import { NotiType, renderNotification } from '@/utils/notifications';

const requestTimeoff =
  (payload: RequestTimeoffPayload, cb?: Callback) =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: TimeoffActionType.TIMEOFF_ACTION_PENDING
    });

    const api = API_URLS.TimeOff.request();

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({
        type: TimeoffActionType.REQUEST_TIMEOFF_SUCCESS
      });
      cb?.onSuccess?.();
      renderNotification('Tạo yêu cầu thành công', NotiType.SUCCESS);
    } else {
      dispatch({
        type: TimeoffActionType.TIMEOFF_ACTION_FAILURE
      });
      renderNotification('Tạo yêu cầu thất bại', NotiType.ERROR);
    }
  };

const getMyRequest = (cb?: Callback) => async (dispatch: AppDispatch) => {
  dispatch({
    type: TimeoffActionType.TIMEOFF_ACTION_PENDING
  });

  const api = API_URLS.TimeOff.getMyRequest();

  const { response, error } = await useCallApi({ ...api });
  if (!error && response?.status === 200) {
    dispatch({
      type: TimeoffActionType.GET_MY_REQUEST_SUCCESS,
      payload: response.data.data
    });
    cb?.onSuccess?.(response.data.data);
  } else {
    dispatch({
      type: TimeoffActionType.TIMEOFF_ACTION_FAILURE
    });
    renderNotification(
      'Lấy danh sách yêu cầu nghỉ phép thất bại',
      NotiType.ERROR
    );
  }
};

const getAllRequest = (cb?: Callback) => async (dispatch: AppDispatch) => {
  dispatch({
    type: TimeoffActionType.TIMEOFF_ACTION_PENDING
  });

  const api = API_URLS.TimeOff.getAllRequest();

  const { response, error } = await useCallApi({ ...api });
  if (!error && response?.status === 200) {
    dispatch({
      type: TimeoffActionType.GET_ALL_REQUEST_SUCCESS,
      payload: response.data.data
    });
    cb?.onSuccess?.(response.data.data);
  } else {
    dispatch({
      type: TimeoffActionType.TIMEOFF_ACTION_FAILURE
    });
    renderNotification(
      'Lấy danh sách yêu cầu nghỉ phép thất bại',
      NotiType.ERROR
    );
  }
};

const getBalanceHistory = (cb?: Callback) => async (dispatch: AppDispatch) => {
  dispatch({
    type: TimeoffActionType.TIMEOFF_ACTION_PENDING
  });

  const api = API_URLS.TimeOff.getBalanceHistory();

  const { response, error } = await useCallApi({ ...api });
  if (!error && response?.status === 200) {
    dispatch({
      type: TimeoffActionType.GET_BALANCE_HISTORY_SUCCESS,
      payload: response.data.data
    });
    cb?.onSuccess?.(response.data.data);
  } else {
    dispatch({
      type: TimeoffActionType.TIMEOFF_ACTION_FAILURE
    });
  }
};

export const TimeoffActions = {
  requestTimeoff,
  getAllRequest,
  getBalanceHistory,
  getMyRequest
};
