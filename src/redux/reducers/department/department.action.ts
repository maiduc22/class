import { AppDispatch } from '@/redux/store';
import { DepartmentActionType, DepartmentThunkAction } from './department.type';
import { useCallApi } from '@/configs/api';
import { API_URLS } from '@/configs/api/endpoint';
import { NotiType, renderNotification } from '@/utils/notifications';
import {
  CreateDepartmentPayload,
  UpdateDepartmentPayload
} from '@/configs/api/payload';
import { Callback } from '@/types/others/callback';

const getAllDepartment =
  (): DepartmentThunkAction => async (dispatch: AppDispatch) => {
    dispatch({ type: DepartmentActionType.DEPARTMENT_ACTION_PENDING });

    const api = API_URLS.Department.getAll();

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: DepartmentActionType.GET_ALL_DEPARTMENT_SUCCESS,
        payload: data.data
      });
    } else {
      dispatch({ type: DepartmentActionType.DEPARTMENT_ACTION_FAILURE });
      renderNotification(
        'Đã có lỗi khi lấy danh sách phòng ban',
        NotiType.ERROR
      );
    }
  };

const createDepartment =
  (payload: CreateDepartmentPayload, cb?: Callback): DepartmentThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: DepartmentActionType.DEPARTMENT_ACTION_PENDING });

    const api = API_URLS.Department.create();

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({ type: DepartmentActionType.CREATE_DEPARTMENT_SUCCESS });
      renderNotification('Tạo phòng ban thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: DepartmentActionType.DEPARTMENT_ACTION_FAILURE });
      renderNotification('Tạo mới phòng ban thất bại', NotiType.ERROR);
    }
  };

const updateDepartment =
  (
    payload: UpdateDepartmentPayload,
    id: string | undefined,
    cb?: Callback
  ): DepartmentThunkAction =>
  async (dispatch: AppDispatch) => {
    if (!id) {
      return;
    }

    dispatch({ type: DepartmentActionType.DEPARTMENT_ACTION_PENDING });

    const api = API_URLS.Department.update(id);

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({ type: DepartmentActionType.UPDATE_DEPARTMENT_SUCCESS });
      renderNotification(
        'Cập nhật thông tin phòng ban thành công',
        NotiType.SUCCESS
      );
      cb?.onSuccess?.();
    } else {
      dispatch({ type: DepartmentActionType.DEPARTMENT_ACTION_FAILURE });
      renderNotification(
        'Cập nhật thông tin phòng ban thất bại',
        NotiType.ERROR
      );
    }
  };

const deleteDepartment =
  (id: string, cb?: Callback): DepartmentThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: DepartmentActionType.DEPARTMENT_ACTION_PENDING });

    const api = API_URLS.Department.delete(id);

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      dispatch({ type: DepartmentActionType.DELETE_DEPARTMENT_SUCCESS });
      renderNotification('Xoá phòng ban thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: DepartmentActionType.DEPARTMENT_ACTION_FAILURE });
      renderNotification('Xoá phòng ban thất bại', NotiType.ERROR);
    }
  };

export const DepartmentActions = {
  getAllDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment
};
