import { AppDispatch } from '@/redux/store';
import { FacilityActionType, FacilityThunkAction } from './facility.type';
import { API_URLS } from '@/configs/api/endpoint';
import { useCallApi } from '@/configs/api';
import { NotiType, renderNotification } from '@/utils/notifications';
import { Callback } from '@/types/others/callback';
import { CreateFacilityPayload } from '@/configs/api/payload';

const getAllFacilities =
  (cb?: Callback): FacilityThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: FacilityActionType.FACILITY_ACTION_PENDING });

    const api = API_URLS.Facility.getAllFacility();

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: FacilityActionType.GET_ALL_FACILITY_SUCCESS,
        payload: data.data
      });
      cb?.onSuccess?.(response.data.data);
    } else {
      dispatch({ type: FacilityActionType.FACILITY_ACTION_FAILURE });
      console.log(error);
      renderNotification(
        'Đã có lỗi khi lấy danh sách cơ sở vật chất',
        NotiType.ERROR
      );
    }
  };

const createFacility =
  (payload: CreateFacilityPayload, cb?: Callback): FacilityThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: FacilityActionType.FACILITY_ACTION_PENDING });

    const api = API_URLS.Facility.createFacility();

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({
        type: FacilityActionType.CREATE_FACILITY_SUCCESS
      });
      renderNotification('Tạo mới cơ sở vật chất thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: FacilityActionType.FACILITY_ACTION_FAILURE });
      renderNotification(error?.response?.data.errors, NotiType.ERROR);
    }
  };

const updateFacility =
  (
    id: string,
    payload: CreateFacilityPayload,
    cb?: Callback
  ): FacilityThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: FacilityActionType.FACILITY_ACTION_PENDING });

    const api = API_URLS.Facility.updateFacility(id);

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({
        type: FacilityActionType.CREATE_FACILITY_SUCCESS
      });
      renderNotification(
        'Cập nhật cơ sở vật chất thành công',
        NotiType.SUCCESS
      );
      cb?.onSuccess?.();
    } else {
      dispatch({ type: FacilityActionType.FACILITY_ACTION_FAILURE });
      renderNotification(error?.response?.data.errors, NotiType.ERROR);
    }
  };

const deleteFacility =
  (id: string, cb?: Callback): FacilityThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: FacilityActionType.FACILITY_ACTION_PENDING });

    const api = API_URLS.Facility.deleteFacility(id);

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      dispatch({
        type: FacilityActionType.CREATE_FACILITY_SUCCESS
      });
      renderNotification('Xoá cơ sở vật chất thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: FacilityActionType.FACILITY_ACTION_FAILURE });
      renderNotification(error?.response?.data.errors, NotiType.ERROR);
    }
  };
export const FacilityActions = {
  getAllFacilities,
  createFacility,
  updateFacility,
  deleteFacility
};
