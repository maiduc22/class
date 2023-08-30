import { Reducer, combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import teacherReducer from './teacher/teacher.reducer';
import facilityReducer from './facility/facility.reducer';
import roomReducer from './room/room.reducer';
import newsReducer from './news/news.reducer';

const rootReducer = combineReducers({
  teacher: teacherReducer,
  user: userReducer,
  facility: facilityReducer,
  room: roomReducer,
  news: newsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer: Reducer<RootState, any> = (
  state: RootState | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any
) => rootReducer(state, action);

export default reducer;
