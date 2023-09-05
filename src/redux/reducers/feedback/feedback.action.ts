import { useCallApi } from '@/configs/api';
import { API_URLS } from '@/configs/api/endpoint';
import { AppDispatch } from '@/redux/store';
import { Callback } from '@/types/others/callback';
import { NotiType, renderNotification } from '@/utils/notifications';
import { FeedbackActionType, FeedbackThunkAction } from './feedback.type';

const getAllFeedbacks =
  (cb?: Callback): FeedbackThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: FeedbackActionType.FEEDBACK_ACTION_PENDING });

    const api = API_URLS.Feedback.getAllFeedbacks();

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: FeedbackActionType.GET_ALL_FEEDBACK_SUCCESS,
        payload: data.data
      });
      cb?.onSuccess?.(response.data.data);
    } else {
      dispatch({ type: FeedbackActionType.FEEDBACK_ACTION_FAILURE });
      console.log(error);
      renderNotification(
        'Đã có lỗi khi lấy danh sách phòng học',
        NotiType.ERROR
      );
    }
  };

export const FeedbackActions = {
  getAllFeedbacks
};
