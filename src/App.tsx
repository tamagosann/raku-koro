import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Router from "./Router";
import { useAppSelector } from "./app/hooks";

//コンポーネント
import { Header } from "./components/organisms";
import { LoadingPage } from "./components/molecules";
import { Footer } from "./components/atoms/Footer";

// slice
import {
  fetchDailyInfectionAsync,
  selectDailyInfectionStatus,
} from "./features/graphs/dailyInfectionSlice";
import {
  fetchDailyDeadAsync,
  selectDailyDeadStatus,
} from "./features/graphs/dailyDeadSlice";
import {
  fetchTotalCoronaAsync,
  selectTotalCoronaStatus,
} from "./features/graphs/totalCoronaSlice";
import {
  fetchTotalDethAsync,
  selectTotalDethStatus,
} from "./features/graphs/totalDethSlice";
import {
  fetchBedOccupancyRateAsync,
  selectBedOccupancyRateStatus,
} from "./features/graphs/bedOccupancyRateSlice";
import {
  fetchDailyPositiveAsync,
  selectDailyPositiveStatus,
} from "./features/graphs/dailyPositiveSlice";

const App = () => {
  const dispatch = useDispatch();
  const bedOcuStatus = useAppSelector(selectBedOccupancyRateStatus);
  const totalDethStatus = useAppSelector(selectTotalDethStatus);
  const dayDeadStatus = useAppSelector(selectDailyDeadStatus);
  const dayInfectStatus = useAppSelector(selectDailyInfectionStatus);
  const dayPosiStatus = useAppSelector(selectDailyPositiveStatus);
  const totalCoroStatus = useAppSelector(selectTotalCoronaStatus);

  useEffect(() => {
    dispatch(fetchDailyInfectionAsync());
    dispatch(fetchDailyDeadAsync());
    dispatch(fetchTotalCoronaAsync());
    dispatch(fetchTotalDethAsync());
    dispatch(fetchBedOccupancyRateAsync());
    dispatch(fetchDailyPositiveAsync());
  }, []);

  return (
    <>
      <Header />
      {/* ここの条件分岐に書くグラフのデータ取得ステータスを追加してください */}
      {bedOcuStatus === "loading" ||
      totalDethStatus === "loading" ||
      dayDeadStatus === "loading" ||
      dayInfectStatus === "loading" ||
      dayPosiStatus === "loading" ||
      totalCoroStatus === "loading" ? (
        <LoadingPage />
      ) : (
        <>
          <Router />
        </>
      )}
      <Footer />
    </>
  );
};

export default App;
