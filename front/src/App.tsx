import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from './Router';
import { auth } from './firebase';
import { useAppSelector } from './app/hooks';

//コンポーネント
import { Header } from './components/header';
import { fetchDailyCoronaAsync } from './features/graphs/dailyCoronaSlice';
import { LoadingPage } from './components/atoms';
import { PrefectureData } from './pages/PrefectureData';

// slice
import { fetchDailyInfectionAsync } from './features/graphs/dailyInfectionSlice';
import { fetchDailyDeadAsync } from './features/graphs/dailyDeadSlice';
import { fetchTotalCoronaAsync } from './features/graphs/totalCoronaSlice';
import { fetchTotalDethAsync } from './features/graphs/totalDethSlice';
import { fetchBedOccupancyRateAsync } from './features/graphs/bedOccupancyRateSlice';
import {
  unSetUser,
  selectUserStatus,
  selectUser,
  fetchUserDataAsync,
} from './features/user/userSlice';

import { BedOccupancyRate } from './templates/BedOccupancyRate';

const App = () => {
  const dispatch = useDispatch();
  const userStatus = useAppSelector(selectUserStatus);
  const userData = useAppSelector(selectUser);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (!userData) {
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
      {userStatus === 'loading' ? <LoadingPage /> : <Router />}
      <BedOccupancyRate />
      <PrefectureData />
    </>
  );
};

export default App;
