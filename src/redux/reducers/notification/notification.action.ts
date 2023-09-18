import { AppDispatch } from '@/redux/store';
import {
  NotificationActionType,
  NotificationThunkAction
} from './notification.type';
import { API_URLS } from '@/configs/api/endpoint';
import { useCallApi } from '@/configs/api';
import { NotiType, renderNotification } from '@/utils/notifications';
import { Callback } from '@/types/others/callback';
import { CreateNotificationPayload } from '@/configs/api/payload';
import jwt_decode from 'jwt-decode';

const getAllNotifications =
  (cb?: Callback): NotificationThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: NotificationActionType.NOTIFICATION_ACTION_PENDING });

    const decodedToken: { role: string; id: string } = jwt_decode(
      localStorage.getItem('token') || ''
    );
    const api = API_URLS.Notification.getAllNotificationsBySenderId(
      decodedToken.id
    );

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: NotificationActionType.GET_ALL_NOTIFICATION_SUCCESS,
        payload: data.data
      });
      cb?.onSuccess?.(response.data.data);
    } else {
      dispatch({ type: NotificationActionType.NOTIFICATION_ACTION_FAILURE });
      console.log(error);
      renderNotification(
        'Đã có lỗi khi lấy danh sách thông báo',
        NotiType.ERROR
      );
    }
  };

const createNotification =
  (
    payload: CreateNotificationPayload,
    cb?: Callback
  ): NotificationThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: NotificationActionType.NOTIFICATION_ACTION_PENDING });

    const api = API_URLS.Notification.createNotification();

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({
        type: NotificationActionType.CREATE_NOTIFICATION_SUCCESS
      });
      renderNotification('Tạo mới phòng học thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: NotificationActionType.NOTIFICATION_ACTION_FAILURE });
      renderNotification(error?.response?.data.errors, NotiType.ERROR);
    }
  };

const updateNotification =
  (
    id: string,
    payload: CreateNotificationPayload,
    cb?: Callback
  ): NotificationThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: NotificationActionType.NOTIFICATION_ACTION_PENDING });

    const api = API_URLS.Notification.updateNotification(id);

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({
        type: NotificationActionType.CREATE_NOTIFICATION_SUCCESS
      });
      renderNotification('Cập nhật phòng học thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: NotificationActionType.NOTIFICATION_ACTION_FAILURE });
      renderNotification(error?.response?.data.errors, NotiType.ERROR);
    }
  };

const deleteNotification =
  (id: string, cb?: Callback): NotificationThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: NotificationActionType.NOTIFICATION_ACTION_PENDING });

    const api = API_URLS.Notification.deleteNotification(id);

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      dispatch({
        type: NotificationActionType.CREATE_NOTIFICATION_SUCCESS
      });
      renderNotification('Xoá thông báo thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: NotificationActionType.NOTIFICATION_ACTION_FAILURE });
      renderNotification(error?.response?.data.errors, NotiType.ERROR);
    }
  };

const getNotificationById =
  (id: string, cb?: Callback): NotificationThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: NotificationActionType.NOTIFICATION_ACTION_PENDING });

    const api = API_URLS.Notification.getNotificationByID(id);

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: NotificationActionType.CREATE_NOTIFICATION_SUCCESS
      });
      cb?.onSuccess?.(data.data);
    } else {
      dispatch({ type: NotificationActionType.NOTIFICATION_ACTION_FAILURE });
      renderNotification(error?.response?.data.errors, NotiType.ERROR);
    }
  };
export const NotificationActions = {
  getAllNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
  getNotificationById
};
