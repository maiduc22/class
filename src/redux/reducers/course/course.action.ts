import { useCallApi } from '@/configs/api';
import { API_URLS } from '@/configs/api/endpoint';
import { AppDispatch } from '@/redux/store';
import { Callback } from '@/types/others/callback';
import { NotiType, renderNotification } from '@/utils/notifications';
import { CourseActionType, CourseThunkAction } from './course.type';
import { CreateCoursePayload } from '@/configs/api/payload';

const getAllCourses =
  (cb?: Callback): CourseThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: CourseActionType.COURSE_ACTION_PENDING });

    const api = API_URLS.Course.getAllCourses();

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: CourseActionType.GET_ALL_COURSE_SUCCESS,
        payload: data.data
      });
      cb?.onSuccess?.(response.data.data);
    } else {
      dispatch({ type: CourseActionType.COURSE_ACTION_FAILURE });
      console.log(error);
      renderNotification(
        'Đã có lỗi khi lấy danh sách khoá học',
        NotiType.ERROR
      );
    }
  };

const createCourse =
  (payload: CreateCoursePayload, cb?: Callback): CourseThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: CourseActionType.COURSE_ACTION_PENDING });

    const api = API_URLS.Course.createCourse();

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({
        type: CourseActionType.CREATE_COURSE_SUCCESS
      });
      renderNotification('Tạo mới khoá học thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: CourseActionType.COURSE_ACTION_FAILURE });
      renderNotification(error?.response?.data.errors, NotiType.ERROR);
    }
  };

const getCourseById =
  (id: string, cb?: Callback): CourseThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: CourseActionType.COURSE_ACTION_PENDING });

    const api = API_URLS.Course.getCourseById(id);

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: CourseActionType.GET_COURSE_BY_ID_SUCCESS
      });
      cb?.onSuccess?.(data.data);
    } else {
      dispatch({ type: CourseActionType.COURSE_ACTION_FAILURE });
      renderNotification(
        'Đã có lỗi khi lấy thông tin chi tiết giáo viên',
        NotiType.ERROR
      );
    }
  };
export const CourseActions = {
  getAllCourses,
  createCourse,
  getCourseById
};
