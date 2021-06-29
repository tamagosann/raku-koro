import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from './Router';
import { Header } from './components/header';
import Graph8 from './templates/Prefecture_daily_infection'

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
      <Graph8 />
    </>
  );
};

export default App;
