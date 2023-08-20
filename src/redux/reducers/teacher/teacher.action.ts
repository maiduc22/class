import { AppDispatch } from '@/redux/store';
import { useCallApi } from '@/configs/api';
import { API_URLS } from '@/configs/api/endpoint';
import { NotiType, renderNotification } from '@/utils/notifications';

import { Callback } from '@/types/others/callback';
import { TeacherActionType, TeacherThunkAction } from './teacher.type';

const getAllTeacher =
  (cb?: Callback): TeacherThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: TeacherActionType.TEACHER_ACTION_PENDING });

    const api = API_URLS.Teacher.getAll();

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: TeacherActionType.GET_ALL_TEACHER_SUCCESS,
        payload: data.data
      });
      cb?.onSuccess?.(response.data.data);
    } else {
      dispatch({ type: TeacherActionType.TEACHER_ACTION_FAILURE });
      renderNotification(
        'Đã có lỗi khi lấy danh sách giáo viên',
        NotiType.ERROR
      );
    }
  };

const getTeacherById =
  (id: string, cb?: Callback): TeacherThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: TeacherActionType.TEACHER_ACTION_PENDING });

    const api = API_URLS.Teacher.getTeacherById(id);

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: TeacherActionType.GET_TEACHER_BY_ID_SUCCESS
      });
      cb?.onSuccess?.(data.data);
    } else {
      dispatch({ type: TeacherActionType.TEACHER_ACTION_FAILURE });
      renderNotification(
        'Đã có lỗi khi lấy thông tin chi tiết giáo viên',
        NotiType.ERROR
      );
    }
  };
export const TeacherActions = {
  getAllTeacher,
  getTeacherById
};
