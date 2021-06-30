import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from './Router';
import { Header } from './components/header';
import { fetchDailyCoronaAsync } from './features/graphs/dailyCoronaSlice';

// slice
import { fetchDailyInfectionAsync } from './features/graphs/dailyInfectionSlice';
import { fetchDailyDeadAsync } from './features/graphs/dailyDeadSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDailyInfectionAsync());
    dispatch(fetchDailyDeadAsync());
    
    dispatch(fetchDailyCoronaAsync());
    dispatch(fetchDailyInfectionAsync());
  }, []);

  return (
    <>
      <Header />
      <Router />
    </>
  );
};

export default App;
