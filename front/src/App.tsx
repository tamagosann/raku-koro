import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Router from "./Router";
import { auth } from "./apis/firebase";
import { useAppSelector } from "./app/hooks";

//コンポーネント
import { Header } from "./components/header";
import { LoadingPage } from "./components/atoms";
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

import {
  unSetUser,
  selectUserStatus,
  selectUser,
  fetchUserDataAsync,
} from "./features/user/userSlice";
import {
  fetchThreadAsync,
  selectThreadStatus,
  unSetThread,
} from "./features/thread/threadSlice";

const App = () => {
  const dispatch = useDispatch();
  const userStatus = useAppSelector(selectUserStatus);
  const threadStatus = useAppSelector(selectThreadStatus);
  const bedOcuStatus = useAppSelector(selectBedOccupancyRateStatus);
  const totalDethStatus = useAppSelector(selectTotalDethStatus);
  const dayDeadStatus = useAppSelector(selectDailyDeadStatus);
  const dayInfectStatus = useAppSelector(selectDailyInfectionStatus);
  const dayPosiStatus = useAppSelector(selectDailyPositiveStatus);
  const totalCoroStatus = useAppSelector(selectTotalCoronaStatus);

  const userData = useAppSelector(selectUser);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (!userData) {
          dispatch(fetchUserDataAsync({ uid: user.uid }));
          dispatch(fetchThreadAsync());
        }
      } else {
        dispatch(unSetUser());
      }
    });
    dispatch(fetchThreadAsync());
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
      {userStatus === "loading" ||
      threadStatus === "loading" ||
      bedOcuStatus === "loading" ||
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
