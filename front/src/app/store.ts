import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import threadReducer from '../features/thread/threadSlice';
import dailyInfectionRuducer from '../features/graphs/dailyInfection';
import graph2Ruducer from '../features/graphs/graph2Slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    thread: threadReducer,
    dailyInfection: dailyInfectionRuducer,
    graph2: graph2Ruducer,
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
