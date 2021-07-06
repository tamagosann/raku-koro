import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodayBedOccupancyRate from '../TodayBedOccupancyRate';
import { Provider, useSelector } from 'react-redux';
import { store } from '../../../app/store';

describe(`TodayBedOccupancyRate`, () => {
  test(`renders TodayBedOccupancyRate`, () => {
    render(
      <Provider store={store}>
        <TodayBedOccupancyRate />
      </Provider>
    );
    screen.debug();
    // screen.getByRole('');
  });
});
