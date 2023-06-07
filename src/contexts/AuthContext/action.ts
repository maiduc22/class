export enum AuthAction {
  AUTH_ACTION_PENDING = 'AUTH_ACTION_PENDING',
  AUTH_ACTION_FAILURE = 'AUTH_ACTION_FAILURE',

  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGOUT = 'LOGOUT'
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

export type AuthActionType =
  | Logout
  | AuthActionPending
  | AuthActionFailure
  | LoginSuccess;
