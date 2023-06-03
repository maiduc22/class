import { Reducer, combineReducers } from 'redux';

const rootReducer = combineReducers({});

export type RootState = ReturnType<typeof rootReducer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer: Reducer<RootState, any> = (
  state: RootState | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any
) => rootReducer(state, action);

export default reducer;
