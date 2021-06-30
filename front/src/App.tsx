import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from './Router';
import { Header } from './components/header';
import { Prefecture } from './components/atoms/Prefecture';

// slice
import { fetchDailyInfectionAsync } from './features/graphs/dailyInfectionSlice';
import { PrefectureDailyDead } from './templates/PrefectureDailyDead';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDailyInfectionAsync());
  }, []);

  return (
    <>
      <Header />
      <Router />
      {/* <Prefecture /> */}
      <PrefectureDailyDead />
    </>
  );
};

export default App;
