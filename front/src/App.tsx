import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from './Router';
import { Header } from './components/header';
import { fetchDailyCoronaAsync } from './features/graphs/dailyCoronaSlice';

import { BedOccupancyRate } from './templates/BedOccupancyRate';

// slice
import { fetchDailyInfectionAsync } from './features/graphs/dailyInfectionSlice';
import { fetchTotalCoronaAsync } from './features/graphs/totalCoronaSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDailyCoronaAsync());
    dispatch(fetchDailyInfectionAsync());
    dispatch(fetchTotalCoronaAsync());
  }, []);

  return (
    <>
      <Header />
      <Router />
      <BedOccupancyRate />
    </>
  );
};

export default App;
