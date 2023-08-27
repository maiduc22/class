import { AppDispatch } from '@/redux/store';
import { RoomActionType, RoomThunkAction } from './room.type';
import { API_URLS } from '@/configs/api/endpoint';
import { useCallApi } from '@/configs/api';
import { NotiType, renderNotification } from '@/utils/notifications';
import { Callback } from '@/types/others/callback';
import { CreateRoomPayload } from '@/configs/api/payload';

const getAllRooms =
  (cb?: Callback): RoomThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: RoomActionType.ROOM_ACTION_PENDING });

    const api = API_URLS.Room.getAllRooms();

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: RoomActionType.GET_ALL_ROOM_SUCCESS,
        payload: data.data
      });
      cb?.onSuccess?.(response.data.data);
    } else {
      dispatch({ type: RoomActionType.ROOM_ACTION_FAILURE });
      console.log(error);
      renderNotification(
        'Đã có lỗi khi lấy danh sách phòng học',
        NotiType.ERROR
      );
    }
  };

const createRoom =
  (payload: CreateRoomPayload, cb?: Callback): RoomThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: RoomActionType.ROOM_ACTION_PENDING });

    const api = API_URLS.Room.createRoom();

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({
        type: RoomActionType.CREATE_ROOM_SUCCESS
      });
      renderNotification('Tạo mới phòng học thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: RoomActionType.ROOM_ACTION_FAILURE });
      renderNotification(error?.response?.data.errors, NotiType.ERROR);
    }
  };

const updateRoom =
  (id: string, payload: CreateRoomPayload, cb?: Callback): RoomThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: RoomActionType.ROOM_ACTION_PENDING });

    const api = API_URLS.Room.updateRoom(id);

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({
        type: RoomActionType.CREATE_ROOM_SUCCESS
      });
      renderNotification('Cập nhật phòng học thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: RoomActionType.ROOM_ACTION_FAILURE });
      renderNotification(error?.response?.data.errors, NotiType.ERROR);
    }
  };

const deleteRoom =
  (id: string, cb?: Callback): RoomThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: RoomActionType.ROOM_ACTION_PENDING });

    const api = API_URLS.Room.deleteRoom(id);

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      dispatch({
        type: RoomActionType.CREATE_ROOM_SUCCESS
      });
      renderNotification('Xoá phòng học thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: RoomActionType.ROOM_ACTION_FAILURE });
      renderNotification(error?.response?.data.errors, NotiType.ERROR);
    }
  };

const getRoomById =
  (id: string, cb?: Callback): RoomThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: RoomActionType.ROOM_ACTION_PENDING });

    const api = API_URLS.Room.getRoomByID(id);

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: RoomActionType.CREATE_ROOM_SUCCESS
      });
      cb?.onSuccess?.(data.data);
    } else {
      dispatch({ type: RoomActionType.ROOM_ACTION_FAILURE });
      renderNotification(error?.response?.data.errors, NotiType.ERROR);
    }
  };
export const RoomActions = {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomById
};
