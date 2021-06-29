import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from './Router';
import { Header } from './components/header';
import { Prefecture } from './components/atoms/Prefecture';
import PrefectureDailyInfention from './templates/Prefecture_daily_infection'
// slice
import { fetchDailyInfectionAsync } from './features/graphs/dailyInfectionSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDailyInfectionAsync());
    console.log('fetch');
    
  }, []);

  return (
    <>
      <Header />
      <Router />
      <Prefecture />
      <PrefectureDailyInfention />
    </>
  );
};

export default App;
