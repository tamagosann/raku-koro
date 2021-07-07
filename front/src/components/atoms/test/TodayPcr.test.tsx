import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import TodayPcr from '../TodayPcr';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import { GraphState } from '../../../features/graphs/dailyPositiveSlice';

const testData: GraphState = {
  data: [
    {
      daily_pcr: 100,
      daily_positive: 30,
      date: '6月6日',
      daily_recovery: 10,
      daily_hospitalization: 5,
    },
    {
      daily_pcr: 200,
      daily_positive: 40,
      date: '6月5日',
      daily_recovery: 15,
      daily_hospitalization: 8,
    },
    {
      daily_pcr: 300,
      daily_positive: 30,
      date: '6月4日',
      daily_recovery: 20,
      daily_hospitalization: 10,
    },
  ],
  status: 'success',
};
const testData2: GraphState = {
  data: [
    {
      daily_pcr: 50,
      daily_positive: 15,
      date: '7月5日',
      daily_recovery: 5,
      daily_hospitalization: 3,
    },
    {
      daily_pcr: 200,
      daily_positive: 40,
      date: '6月5日',
      daily_recovery: 15,
      daily_hospitalization: 8,
    },
    {
      daily_pcr: 300,
      daily_positive: 30,
      date: '6月4日',
      daily_recovery: 20,
      daily_hospitalization: 10,
    },
  ],
  status: 'loading',
};

describe('TodayPcr', () => {
  test(`renders TodayPcr component`, () => {
    render(
      <Provider store={store}>
        <TodayPcr positivRate={testData} />
      </Provider>
    );
    screen.debug();
    expect(screen.getAllByRole('heading')[1].textContent).toBe('30%');
    expect(screen.getAllByRole('heading')[2].textContent).toBe('前日：20%');
    expect(screen.getAllByRole('heading')[3].textContent).toBe('前々日：10%');
  });
  test(`renders TodayCorona component`, () => {
    render(
      <Provider store={store}>
        <TodayPcr positivRate={testData2} />
      </Provider>
    );
  });
});
