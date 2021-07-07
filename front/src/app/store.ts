import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import threadReducer from '../features/thread/threadSlice';
import dailyInfectionRuducer from '../features/graphs/dailyInfectionSlice';
import prefectureRuducer from '../features/common/prefectureSlice';
import dailyDeadRuducer from '../features/graphs/dailyDeadSlice';
import totalCoronaRuducer from '../features/graphs/totalCoronaSlice';
import totalDethRuducer from '../features/graphs/totalDeathSlice';
import bedOccupancyRateRuducer from '../features/graphs/bedOccupancyRateSlice';
import dailyPositiveRuducer from '../features/graphs/dailyPositiveSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    thread: threadReducer,
    dailyInfection: dailyInfectionRuducer,
    prefecture: prefectureRuducer,
    dailyDead: dailyDeadRuducer,
    totalCorona: totalCoronaRuducer,
    totalDeth: totalDethRuducer,
    bedOccupancyRate: bedOccupancyRateRuducer,
    dailyPositive: dailyPositiveRuducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
