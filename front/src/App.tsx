import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from './Router';
import { Header } from './components/header';
import { Prefecture } from './components/atoms/Prefecture';
// slice
import { fetchDailyInfectionAsync } from './features/graphs/dailyInfectionSlice';
import { fetchDailyDeadAsync } from './features/graphs/dailyDeadSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDailyInfectionAsync());
    dispatch(fetchDailyDeadAsync());
    console.log('fetch');
    
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
