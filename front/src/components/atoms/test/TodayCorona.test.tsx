import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodayCorona from '../TodayCorona';
import { Provider, useSelector } from 'react-redux';
import { store } from '../../../app/store';
import { GraphState } from '../../../features/graphs/totalCoronaSlice';

// const mockFunk = jest.fn();
const testData: GraphState = {
  data: [
    {
      date: '2月10日',
      npatients: 300,
      adpatients: 100,
    },
    {
      date: '2月9日',
      npatients: 400,
      adpatients: 120,
    },
    {
      date: '2月8日',
      npatients: 500,
      adpatients: 150,
    },
  ],
  status: 'success',
};

const testData2: GraphState = {
  data: [
    {
      date: '2月10日',
      npatients: 300,
      adpatients: 100,
    },
    {
      date: '2月9日',
      npatients: 400,
      adpatients: 120,
    },
    {
      date: '2月8日',
      npatients: 500,
      adpatients: 150,
    },
  ],
  status: 'loading',
};

describe('TodayCorona', () => {
  test(`renders TodayCorona component`, () => {
    render(
      <Provider store={store}>
        <TodayCorona totalCorona={testData} />
      </Provider>
    );
    expect(screen.getAllByRole('heading')[1].textContent).toBe('500人');
    expect(screen.getAllByRole('heading')[2].textContent).toBe(
      '前日比：＋100人'
    );
    expect(screen.getAllByRole('heading')[3].textContent).toBe(
      '前々日比：＋200人'
    );
    screen.debug();
  });
  test(`renders TodayCorona component`, () => {
    render(
      <Provider store={store}>
        <TodayCorona totalCorona={testData2} />
      </Provider>
    );
  });
});
