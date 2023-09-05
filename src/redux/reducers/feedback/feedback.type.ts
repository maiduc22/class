import { IFeedback } from '@/types/models/IFeedback';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';

export interface FeedbackState {
  isFetching: boolean;
  feedbacks: IFeedback[];
}

export enum FeedbackActionType {
  FEEDBACK_ACTION_PENDING = 'FEEDBACK_ACTION_PENDING',
  FEEDBACK_ACTION_FAILURE = 'FEEDBACK_ACTION_FAILURE',

  GET_ALL_FEEDBACK_SUCCESS = 'GET_ALL_FEEDBACK_ACTION_SUCCESS',
  CREATE_FEEDBACK_SUCCESS = 'CREATE_FEEDBACK_SUCCESS'
}

export interface FeedbackActionPending {
  type: FeedbackActionType.FEEDBACK_ACTION_PENDING;
}

export interface FeedbackActionFailure {
  type: FeedbackActionType.FEEDBACK_ACTION_FAILURE;
}

export interface GetAllFeedbackSuccess {
  type: FeedbackActionType.GET_ALL_FEEDBACK_SUCCESS;
  payload: IFeedback[];
}

export interface CreateFeedbackSuccess {
  type: FeedbackActionType.CREATE_FEEDBACK_SUCCESS;
}

export type FeedbackAction =
  | FeedbackActionPending
  | FeedbackActionFailure
  | GetAllFeedbackSuccess
  | CreateFeedbackSuccess;

export type FeedbackThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  FeedbackAction
>;
