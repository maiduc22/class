import { Authorities } from '.';

export enum AuthAction {
  AUTH_ACTION_PENDING = 'AUTH_ACTION_PENDING',
  AUTH_ACTION_FAILURE = 'AUTH_ACTION_FAILURE',

  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGOUT = 'LOGOUT',
  GET_AUTHORITIES = 'GET_AUTHORITIES'
}

interface AuthActionPending {
  type: AuthAction.AUTH_ACTION_PENDING;
}

interface AuthActionFailure {
  type: AuthAction.AUTH_ACTION_FAILURE;
}

interface LoginSuccess {
  type: AuthAction.LOGIN_SUCCESS;
}

interface Logout {
  type: AuthAction.LOGOUT;
}

interface GetAuthorities {
  type: AuthAction.GET_AUTHORITIES;
  payload: Authorities;
}

export type AuthActionType =
  | Logout
  | AuthActionPending
  | AuthActionFailure
  | LoginSuccess
  | GetAuthorities;
