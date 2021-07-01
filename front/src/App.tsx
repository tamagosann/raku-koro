import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Router from "./Router";
import { auth } from "./firebase";
import { useAppSelector } from "./app/hooks";

//コンポーネント
import { Header } from "./components/header";
import { fetchDailyCoronaAsync } from "./features/graphs/dailyCoronaSlice";
import { InformationCorona } from "./templates/informationCorona";

import { LoadingPage } from "./components/atoms";
import { PrefectureData } from "./pages/PrefectureData";

// slice
import { fetchDailyInfectionAsync } from "./features/graphs/dailyInfectionSlice";
import { fetchDailyDeadAsync } from "./features/graphs/dailyDeadSlice";
import { fetchTotalCoronaAsync } from "./features/graphs/totalCoronaSlice";
import { fetchTotalDethAsync } from "./features/graphs/totalDethSlice";
import { fetchBedOccupancyRateAsync } from "./features/graphs/bedOccupancyRateSlice";
import {
  unSetUser,
  selectUserStatus,
  selectUser,
  fetchUserDataAsync,
} from "./features/user/userSlice";
import {
  fetchThreadAsync,
  selectThreadStatus,
} from "./features/thread/threadSlice";

import { BedOccupancyRate } from "./templates/BedOccupancyRate";

const App = () => {
  const dispatch = useDispatch();
  const userStatus = useAppSelector(selectUserStatus);
  const threadStatus = useAppSelector(selectThreadStatus);
  const userData = useAppSelector(selectUser);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (!userData) {
          dispatch(fetchThreadAsync());
          dispatch(fetchUserDataAsync({ uid: user.uid }));
        }
      } else {
        dispatch(unSetUser());
      }
    });
    dispatch(fetchDailyInfectionAsync());
    dispatch(fetchDailyDeadAsync());
    dispatch(fetchDailyCoronaAsync());
    dispatch(fetchTotalCoronaAsync());
    dispatch(fetchTotalDethAsync());
    dispatch(fetchBedOccupancyRateAsync());
  }, []);

  return (
    <>
      <Header />
      {/* ここの条件分岐に書くグラフのデータ取得ステータスを追加してください */}
      {userStatus === "loading" && threadStatus === "loading" ? (
        <LoadingPage />
      ) : (
        <Router />
      )}
    </>
  );
};

export default App;
