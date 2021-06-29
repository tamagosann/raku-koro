import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from './Router';
import { Header } from './components/header';

// slice
import {
  fetchDailyInfectionAsync,
  selectDailyInfection,
} from './features/graphs/dailyInfection';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
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
