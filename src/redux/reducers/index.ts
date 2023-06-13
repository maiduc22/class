import { Reducer, combineReducers } from 'redux';
import departmentReducer from './department/department.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
  department: departmentReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer: Reducer<RootState, any> = (
  state: RootState | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any
) => rootReducer(state, action);

export default reducer;
