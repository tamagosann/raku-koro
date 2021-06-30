import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from './Router';
import { Header } from './components/header';
import { fetchDailyCoronaAsync } from './features/graphs/dailyCoronaSlice';

// slice
import { fetchDailyInfectionAsync } from './features/graphs/dailyInfectionSlice';
import { fetchTotalCoronaAsync } from './features/graphs/totalCoronaSlice';
import { fetchTotalDethAsync } from './features/graphs/totalDethSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDailyCoronaAsync());
    dispatch(fetchDailyInfectionAsync());
    dispatch(fetchTotalCoronaAsync());
    dispatch(fetchTotalDethAsync());
  }, []);

  return (
    <>
      <Header />
      <Router />
    </>
  );
};

export default App;
