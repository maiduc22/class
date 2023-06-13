import { AppDispatch } from '@/redux/store';
import { UserActionType, UserThunkAction } from './user.types';
import { API_URLS } from '@/configs/api/endpoint';
import { useCallApi } from '@/configs/api';
import { NotiType, renderNotification } from '@/utils/notifications';

const getAllUser = (): UserThunkAction => async (dispatch: AppDispatch) => {
  dispatch({
    type: UserActionType.USER_ACTION_PENDING
  });

  const api = API_URLS.User.getAll();

  const { response, error } = await useCallApi({ ...api });

  if (!error && response?.status === 200) {
    const { data } = response;
    dispatch({
      type: UserActionType.GET_ALL_USER_SUCCESS,
      payload: data.data
    });
  } else {
    dispatch({ type: UserActionType.USER_ACTION_FAILURE });
    renderNotification('Đã có lỗi khi lấy danh sách nhân sự', NotiType.ERROR);
  }
};

export const UserActions = { getAllUser };
