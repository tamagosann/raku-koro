import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from './Router';
import { auth } from './firebase';
import { useAppSelector } from './app/hooks';

//コンポーネント
import { Header } from './components/header';
import { fetchDailyCoronaAsync } from './features/graphs/dailyCoronaSlice';
import { LoadingPage } from './components/atoms';

// slice
import { fetchDailyInfectionAsync } from './features/graphs/dailyInfectionSlice';
import { fetchDailyDeadAsync } from './features/graphs/dailyDeadSlice';
import { fetchTotalCoronaAsync } from './features/graphs/totalCoronaSlice';
import { fetchTotalDethAsync } from './features/graphs/totalDethSlice';
import { fetchBedOccupancyRateAsync } from './features/graphs/bedOccupancyRateSlice';
import { fetchDailyPositiveAsync } from './features/graphs/dailyPositiveSlice';

import {
  unSetUser,
  selectUserStatus,
  selectUser,
  fetchUserDataAsync,
} from './features/user/userSlice';

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
    dispatch(fetchDailyPositiveAsync());
  }, []);

  return (
    <>
      <Header />
      {userStatus === 'loading' ? <LoadingPage /> : <Router />}
    </>
  );
};

export default App;
