import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from './Router';
import { Header } from './components/header';
import { Prefecture } from './components/atoms/Prefecture';
import { fetchDailyCoronaAsync } from './features/graphs/dailyCoronaSlice';
import { InformationCorona } from './templates/informationCorona';
import { fetchTotalCoronaAsync } from './features/graphs/totalCoronaSlice';
import { fetchTotalDethAsync } from './features/graphs/totalDethSlice'


// slice
import { fetchDailyInfectionAsync } from './features/graphs/dailyInfectionSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchDailyInfectionAsync());
    dispatch(fetchTotalCoronaAsync());
    dispatch(fetchTotalDethAsync());
  }, []);

  return (
    <>
      <Header />
      <Router />
      <Prefecture />
      <InformationCorona />
    </>
  );
};

export default App;
