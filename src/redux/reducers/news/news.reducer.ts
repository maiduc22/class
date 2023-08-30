import { Reducer } from 'redux';
import { NewsAction, NewsActionType, NewsState } from './news.type';

const initialState: NewsState = {
  isFetching: false,
  news: []
};

const newsReducer: Reducer<NewsState, NewsAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case NewsActionType.NEWS_ACTION_PENDING:
      return { ...state, isFetching: true };
    case NewsActionType.CREATE_NEWS_SUCCESS:
    case NewsActionType.NEWS_ACTION_FAILURE:
      return { ...state, isFetching: false };
    case NewsActionType.GET_ALL_NEWS_SUCCESS:
      return { ...state, isFetching: false, news: action.payload };
    default:
      return state;
  }
};

export default newsReducer;
