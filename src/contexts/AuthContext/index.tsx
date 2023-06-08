import { useCallApi } from '@/configs/api';
import { API_URLS } from '@/configs/api/endpoint';
import { LoginPayload } from '@/configs/api/payload';
import { Callback } from '@/types/others/callback';
import { NotiType, renderNotification } from '@/utils/notifications';
import { createContext, useReducer } from 'react';
import { AuthAction, AuthActionType } from './action';
import { saveToken } from '@/utils/token';
import { IUser } from '@/types/models/IUser';

const initialState = {
  isFetching: false,
  user: null as IUser | null
};

type AuthState = typeof initialState;

function authReducer(state = initialState, action: AuthActionType): AuthState {
  switch (action.type) {
    case AuthAction.AUTH_ACTION_PENDING:
      return { ...state, isFetching: true };
    case AuthAction.AUTH_ACTION_FAILURE:
      return { ...state, isFetching: false };
    case AuthAction.LOGIN_SUCCESS:
      return { ...state, isFetching: false };
    case AuthAction.LOGOUT:
      return state;
    default:
      return state;
  }
}

function useAuthReducer(_state = initialState) {
  const [state, dispatch] = useReducer(authReducer, _state);

  const login = async (payload: LoginPayload, cb?: Callback) => {
    dispatch({ type: AuthAction.AUTH_ACTION_PENDING });

    const api = API_URLS.Auth.login();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: AuthAction.LOGIN_SUCCESS
      });
      saveToken(response.data.data);
      renderNotification('Đăng nhập thành công', NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: AuthAction.AUTH_ACTION_FAILURE });
      renderNotification('Đăng nhập thất bại', NotiType.ERROR);
      cb?.onError?.();
    }
  };

  const logout = () => {
    dispatch({ type: AuthAction.LOGOUT });
    localStorage.removeItem('token');
    localStorage.removeItem('authUser');
    renderNotification('Đăng xuất thành công', NotiType.SUCCESS);
  };

  return { state, login, logout };
}

export const AuthContext = createContext<ReturnType<typeof useAuthReducer>>({
  state: initialState,
  login: async () => {
    // TODO: Implement login functionality
  },
  logout: () => {
    // TODO: Implement logout functionality
  }
});

interface Props {
  children: React.ReactNode | string;
}

export const AuthProvider = ({ children }: Props) => {
  const authReducer = useAuthReducer();

  return (
    <AuthContext.Provider value={authReducer}>{children}</AuthContext.Provider>
  );
};
