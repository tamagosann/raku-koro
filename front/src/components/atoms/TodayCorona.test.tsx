// import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import TodayCorona from './TodayCorona';
import { Provider, useSelector } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { store } from '../../app/store';
import { selectTotalCorona } from '../../features/graphs/totalCoronaSlice';

// const mockFunk = jest.fn();

describe('TodayCorona', () => {
  test(`renders TodayCorona component`, () => {
    render(
      <Provider store={store}>
        <TodayCorona />
      </Provider>
    );

    // screen.debug();
    // screen.getByRole('');
    expect(screen.getByText(''));
    // expect(screen.getByText('累計感染者数')).toBeInTheDocument();
  });
  test(`totalCorona.status === 'success'`, () => {
    const totalCorona = useAppSelector(selectTotalCorona);
    let status = totalCorona.status;
  });
});
