import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from './Router';

// コンポーネント
import { Header } from './components/header';
import { fetchDailyCoronaAsync } from './features/graphs/dailyCoronaSlice';

// slice
import { fetchDailyInfectionAsync } from './features/graphs/dailyInfectionSlice';
import { fetchDailyDeadAsync } from './features/graphs/dailyDeadSlice';
import { fetchTotalCoronaAsync } from './features/graphs/totalCoronaSlice';
import { fetchBedOccupancyRateAsync } from './features/graphs/bedOccupancyRateSlice';




const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDailyInfectionAsync());
    dispatch(fetchDailyDeadAsync());
    dispatch(fetchDailyCoronaAsync());
    dispatch(fetchDailyInfectionAsync());
    dispatch(fetchTotalCoronaAsync());
    dispatch(fetchBedOccupancyRateAsync());
  }, []);

  return (
    <>
      <Header />
      <Router />
    
    </>
  );
};

export default App;
