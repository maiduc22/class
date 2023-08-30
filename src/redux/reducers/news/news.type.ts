import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { INews } from '@/types/models/INews';

export interface NewsState {
  isFetching: boolean;
  news: INews[];
}

export enum NewsActionType {
  NEWS_ACTION_PENDING = 'NEWS_ACTION_PENDING',
  NEWS_ACTION_FAILURE = 'NEWS_ACTION_FAILURE',

  GET_ALL_NEWS_SUCCESS = 'GET_ALL_NEWS_ACTION_SUCCESS',
  CREATE_NEWS_SUCCESS = 'CREATE_NEWS_SUCCESS',
  GET_NEWS_BY_ID_SUCCESS = 'GET_NEWS_BY_ID_SUCCESS'
}

export interface NewsActionPending {
  type: NewsActionType.NEWS_ACTION_PENDING;
}

export interface NewsActionFailure {
  type: NewsActionType.NEWS_ACTION_FAILURE;
}

export interface GetAllNewsSuccess {
  type: NewsActionType.GET_ALL_NEWS_SUCCESS;
  payload: INews[];
}

export interface CreateNewsSuccess {
  type: NewsActionType.CREATE_NEWS_SUCCESS;
}

export interface GetNewsByIdSuccess {
  type: NewsActionType.GET_NEWS_BY_ID_SUCCESS;
}

export type NewsActions =
  | NewsActionPending
  | NewsActionFailure
  | GetAllNewsSuccess
  | CreateNewsSuccess
  | GetNewsByIdSuccess;

export type NewsThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  NewsActions
>;
