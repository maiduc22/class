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

export const TimeoffActions = { requestTimeoff };
