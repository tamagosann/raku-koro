import { render, screen } from '@testing-library/react';
import TodayDeth from '../TodayDeath';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import { GraphState } from '../../../features/graphs/totalDeathSlice';

const testData: GraphState = {
  data: [
    {
      date: '2月10日',
      ndeaths: 300,
    },
    {
      date: '2月9日',
      ndeaths: 400,
    },
    {
      date: '2月8日',
      ndeaths: 500,
    },
  ],
  status: 'success',
};

const testData2: GraphState = {
  data: [
    {
      date: '2月10日',
      ndeaths: 300,
    },
    {
      date: '2月9日',
      ndeaths: 400,
    },
    {
      date: '2月8日',
      ndeaths: 500,
    },
  ],
  status: 'loading',
};

describe(`TodayDeth`, () => {
  test(`renders TodayDeth`, () => {
    render(
      <Provider store={store}>
        <TodayDeth totalCorona={testData} />
      </Provider>
    );
    expect(screen.getAllByRole('heading')[1].textContent).toBe('500人');
    expect(screen.getAllByRole('heading')[2].textContent).toBe(
      '前日比：＋100人'
    );
    expect(screen.getAllByRole('heading')[3].textContent).toBe(
      '前々日比：＋200人'
    );

  });
  test(`renders TodayCorona component`, () => {
    render(
      <Provider store={store}>
        <TodayDeth totalCorona={testData2} />
      </Provider>
    );
    screen.debug();
  });
});
