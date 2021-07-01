import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import threadReducer from '../features/thread/threadSlice';
import dailyInfectionRuducer from '../features/graphs/dailyInfectionSlice';
import graph2Ruducer from '../features/graphs/graph2Slice';
import prefectureRuducer from '../features/common/prefectureSlice';
import dailyDeadRuducer from '../features/graphs/dailyDeadSlice';
import dailyCoronaRuducer from '../features/graphs/dailyCoronaSlice';
import totalCoronaRuducer from '../features/graphs/totalCoronaSlice';
import totalRecoveryRuducer from '../features/graphs/totalRecoverySlice';
import totalDethRuducer from '../features/graphs/totalDethSlice';
import vaccinationRuducer from '../features/graphs/vaccinationSlice';
import bedOccupancyRateRuducer from '../features/graphs/bedOccupancyRateSlice';
import dailyDethRuducer from '../features/graphs/dailyDethSlice';
import dailyRecoveryRuducer from '../features/graphs/dailyRecoverySlice';
import dailyPositiveRuducer from '../features/graphs/dailyPositiveSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    thread: threadReducer,
    dailyInfection: dailyInfectionRuducer,
    graph2: graph2Ruducer,
    prefecture: prefectureRuducer,
    dailyDead: dailyDeadRuducer,
    dailyCorona: dailyCoronaRuducer,
    totalCorona: totalCoronaRuducer,
    totalRecovery: totalRecoveryRuducer,
    totalDeth: totalDethRuducer,
    vaccination: vaccinationRuducer,
    bedOccupancyRate: bedOccupancyRateRuducer,
    dailyDeth: dailyDethRuducer,
    dailyRecovery: dailyRecoveryRuducer,
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
