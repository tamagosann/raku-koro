import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from './Router';
import { Header } from './components/header';
import { Prefecture } from './components/atoms/Prefecture';
import { fetchDailyCoronaAsync } from './features/graphs/dailyCoronaSlice';

// slice
import { fetchDailyInfectionAsync } from './features/graphs/dailyInfectionSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDailyCoronaAsync());
  }, []);

  return (
    <>
      <Header />
      <Router />
      <Prefecture />
    </>
  );
};

export default App;
