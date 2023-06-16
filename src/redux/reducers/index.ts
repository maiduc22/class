import { Reducer, combineReducers } from 'redux';
import departmentReducer from './department/department.reducer';
import userReducer from './user/user.reducer';
import roleReducer from './role/role.reducer';
import permissionReducer from './permission/permission.reducer';

const rootReducer = combineReducers({
  department: departmentReducer,
  user: userReducer,
  role: roleReducer,
  permission: permissionReducer
});

export type RootState = ReturnType<typeof rootReducer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer: Reducer<RootState, any> = (
  state: RootState | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any
) => rootReducer(state, action);

export default reducer;
