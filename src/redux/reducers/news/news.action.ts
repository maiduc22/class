import { AppDispatch } from '@/redux/store';
import { NewsActionType, NewsThunkAction } from './news.type';
import { API_URLS } from '@/configs/api/endpoint';
import { useCallApi } from '@/configs/api';
import { NotiType, renderNotification } from '@/utils/notifications';
import { Callback } from '@/types/others/callback';
import { CreateNewsPayload } from '@/configs/api/payload';

const getAllNews =
  (cb?: Callback): NewsThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: NewsActionType.NEWS_ACTION_PENDING });

    const api = API_URLS.News.getAllNews();

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: NewsActionType.GET_ALL_NEWS_SUCCESS,
        payload: data.data
      });
      cb?.onSuccess?.(response.data.data);
    } else {
      dispatch({ type: NewsActionType.NEWS_ACTION_FAILURE });
      console.log(error);
      renderNotification('Đã có lỗi khi lấy danh sách tin tức', NotiType.ERROR);
    }
  };

const createNews =
  (payload: CreateNewsPayload, cb?: Callback): NewsThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: NewsActionType.NEWS_ACTION_PENDING });

    const api = API_URLS.News.createNews();

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({
        type: NewsActionType.CREATE_NEWS_SUCCESS
      });
      renderNotification('Tạo tin tức thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: NewsActionType.NEWS_ACTION_FAILURE });
      renderNotification(error?.response?.data.errors, NotiType.ERROR);
    }
  };

const updateNews =
  (id: string, payload: CreateNewsPayload, cb?: Callback): NewsThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: NewsActionType.NEWS_ACTION_PENDING });

    const api = API_URLS.News.updateNews(id);

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({
        type: NewsActionType.CREATE_NEWS_SUCCESS
      });
      renderNotification('Cập nhật tin thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: NewsActionType.NEWS_ACTION_FAILURE });
      renderNotification(error?.response?.data.errors, NotiType.ERROR);
    }
  };

const deleteNews =
  (id: string, cb?: Callback): NewsThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: NewsActionType.NEWS_ACTION_PENDING });

    const api = API_URLS.News.deleteNews(id);

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      dispatch({
        type: NewsActionType.CREATE_NEWS_SUCCESS
      });
      renderNotification('Xoá tin thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: NewsActionType.NEWS_ACTION_FAILURE });
      renderNotification(error?.response?.data.errors, NotiType.ERROR);
    }
  };

const getNewsById =
  (id: string, cb?: Callback): NewsThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: NewsActionType.NEWS_ACTION_PENDING });

    const api = API_URLS.News.getNewsByID(id);

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      const { data } = response;
      dispatch({
        type: NewsActionType.CREATE_NEWS_SUCCESS
      });
      cb?.onSuccess?.(data.data);
    } else {
      dispatch({ type: NewsActionType.NEWS_ACTION_FAILURE });
      renderNotification(error?.response?.data.errors, NotiType.ERROR);
    }
  };
export const NewsActions = {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
  getNewsById
};
