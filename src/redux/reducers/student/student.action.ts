import { AppDispatch } from '@/redux/store';
import { useCallApi } from '@/configs/api';
import { API_URLS } from '@/configs/api/endpoint';
import { NotiType, renderNotification } from '@/utils/notifications';

import { Callback } from '@/types/others/callback';
import { StudentActionType, StudentThunkAction } from './student.type';

const getAllStudent =
  (cb?: Callback): StudentThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: StudentActionType.STUDENT_ACTION_PENDING });

    const api = API_URLS.Student.getAll();

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: StudentActionType.GET_ALL_STUDENT_SUCCESS,
        payload: data.data
      });
      cb?.onSuccess?.(response.data.data);
    } else {
      dispatch({ type: StudentActionType.STUDENT_ACTION_FAILURE });
      renderNotification(
        'Đã có lỗi khi lấy danh sách học viên',
        NotiType.ERROR
      );
    }
  };

const getStudentById =
  (id: string, cb?: Callback): StudentThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: StudentActionType.STUDENT_ACTION_PENDING });

    const api = API_URLS.Student.getStudentById(id);

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: StudentActionType.GET_STUDENT_BY_ID_SUCCESS
      });
      cb?.onSuccess?.(data.data);
    } else {
      dispatch({ type: StudentActionType.STUDENT_ACTION_FAILURE });
      renderNotification(
        'Đã có lỗi khi lấy thông tin chi tiết học viên',
        NotiType.ERROR
      );
    }
  };
export const StudentActions = {
  getAllStudent,
  getStudentById
};
