import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import dailyInfectionRuducer from "../features/graphs/dailyInfectionSlice";
import prefectureRuducer from "../features/common/prefectureSlice";
import dailyDeadRuducer from "../features/graphs/dailyDeadSlice";
import totalCoronaRuducer from "../features/graphs/totalCoronaSlice";
import totalDethRuducer from "../features/graphs/totalDethSlice";
import vaccinationRuducer from "../features/graphs/vaccinationSlice";
import bedOccupancyRateRuducer from "../features/graphs/bedOccupancyRateSlice";
import dailyPositiveRuducer from "../features/graphs/dailyPositiveSlice";

export const store = configureStore({
  reducer: {
    dailyInfection: dailyInfectionRuducer,
    prefecture: prefectureRuducer,
    dailyDead: dailyDeadRuducer,
    totalCorona: totalCoronaRuducer,
    totalDeth: totalDethRuducer,
    vaccination: vaccinationRuducer,
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
