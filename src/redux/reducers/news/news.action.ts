import { Callback } from '@/types/others/callback';
import { NewsActionType, NewsThunkAction } from './news.types';
import { AppDispatch } from '@/redux/store';
import { API_URLS } from '@/configs/api/endpoint';
import { useCallApi } from '@/configs/api';
import { CreateNewsPayload } from '@/configs/api/payload';
import { NotiType, renderNotification } from '@/utils/notifications';

const getAllNews =
  (cb?: Callback): NewsThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: NewsActionType.NEWS_ACTION_PENDING
    });

    const api = API_URLS.News.getAllNews();

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      dispatch({
        type: NewsActionType.GET_ALL_NEWS_SUCCESS,
        payload: response.data.data
      });
      cb?.onSuccess?.();
    } else {
      dispatch({
        type: NewsActionType.NEWS_ACTION_FAILURE
      });
    }
  };

const createNews =
  (payload: CreateNewsPayload, cb?: Callback): NewsThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: NewsActionType.NEWS_ACTION_PENDING
    });

    const api = API_URLS.News.createNews();

    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({
        type: NewsActionType.CREATE_NEWS_SUCCESS
      });
      renderNotification('Tạo mới thông báo thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({
        type: NewsActionType.NEWS_ACTION_FAILURE
      });
      renderNotification('Tạo mới thông báo thất bại', NotiType.ERROR);
    }
  };

const getMyNews =
  (cb?: Callback): NewsThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: NewsActionType.NEWS_ACTION_PENDING
    });

    const api = API_URLS.News.getMyNews();

    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      dispatch({
        type: NewsActionType.GET_MY_NEWS_SUCCESS,
        payload: response.data.data
      });
      cb?.onSuccess?.();
    } else {
      dispatch({
        type: NewsActionType.NEWS_ACTION_FAILURE
      });
    }
  };

export const NewsActions = { getAllNews, getMyNews, createNews };
