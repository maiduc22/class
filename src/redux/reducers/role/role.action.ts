import { AppDispatch } from '@/redux/store';
import { RoleActionType, RoleThunkAction } from './role.types';
import { API_URLS } from '@/configs/api/endpoint';
import { useCallApi } from '@/configs/api';
import { NotiType, renderNotification } from '@/utils/notifications';
import { Callback } from '@/types/others/callback';
import { CreateRolePayload, UpdateRolePayload } from '@/configs/api/payload';

const getAllRole = (): RoleThunkAction => async (dispatch: AppDispatch) => {
  dispatch({ type: RoleActionType.ROLE_ACTION_PENDING });

  const api = API_URLS.Role.getAll();

  const { response, error } = await useCallApi({ ...api });
  if (!error && response?.status === 200) {
    const { data } = response;
    dispatch({
      type: RoleActionType.GET_ALL_ROLE_SUCCESS,
      payload: data.data
    });
  } else {
    dispatch({ type: RoleActionType.ROLE_ACTION_FAILURE });
    renderNotification('Đã có lỗi khi lấy danh sách vai trò', NotiType.ERROR);
  }
};

const toggleStatus =
  (id: string, cb?: Callback): RoleThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: RoleActionType.ROLE_ACTION_PENDING });

    const api = API_URLS.Role.toggle(id);

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      dispatch({
        type: RoleActionType.TOGGLE_ROLE_SUCCESS
      });
      cb?.onSuccess?.();
      renderNotification('Thay đổi trạng thái thành công', NotiType.SUCCESS);
    } else {
      dispatch({ type: RoleActionType.ROLE_ACTION_FAILURE });
      renderNotification(
        'Đã có lỗi khi thay đổi trạng thái vai trò',
        NotiType.ERROR
      );
    }
  };

const deleteStatus =
  (id: string, cb?: Callback): RoleThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: RoleActionType.ROLE_ACTION_PENDING });

    const api = API_URLS.Role.delete(id);

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      dispatch({
        type: RoleActionType.DELETE_ROLE_SUCCESS
      });
      cb?.onSuccess?.();
      renderNotification('Xoá thành công', NotiType.SUCCESS);
    } else {
      dispatch({ type: RoleActionType.ROLE_ACTION_FAILURE });
      renderNotification('Đã có lỗi khi xoá vai trò', NotiType.ERROR);
    }
  };

const createRole =
  (payload: CreateRolePayload, cb?: Callback): RoleThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: RoleActionType.ROLE_ACTION_PENDING
    });

    const api = API_URLS.Role.create();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: RoleActionType.CREATE_ROLE_SUCCESS
      });
      cb?.onSuccess?.();
      renderNotification('Tạo vai trò thành công', NotiType.SUCCESS);
    } else {
      dispatch({ type: RoleActionType.ROLE_ACTION_FAILURE });
      renderNotification('Đã có lỗi khi tạo vai trò', NotiType.ERROR);
    }
  };

const updateRole =
  (
    payload: UpdateRolePayload,
    id: string | undefined,
    cb?: Callback
  ): RoleThunkAction =>
  async (dispatch: AppDispatch) => {
    if (!id) return;

    dispatch({
      type: RoleActionType.ROLE_ACTION_PENDING
    });

    const api = API_URLS.Role.update(id);

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: RoleActionType.UPDATE_ROLE_SUCCESS
      });
      cb?.onSuccess?.();
      renderNotification('Cập nhật vai trò thành công', NotiType.SUCCESS);
    } else {
      dispatch({ type: RoleActionType.ROLE_ACTION_FAILURE });
      renderNotification('Đã có lỗi khi cập nhật vai trò', NotiType.ERROR);
    }
  };

export const RoleActions = {
  getAllRole,
  toggleStatus,
  deleteStatus,
  createRole,
  updateRole
};
