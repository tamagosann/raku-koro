import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodayPcr from '../TodayPcr';
import { Provider, useSelector } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import { store } from '../../../app/store';

describe(`TodayPcr`, () => {
  test(`renders TodayPcr`, () => {
    render(
      <Provider store={store}>
        <TodayPcr />
      </Provider>
    );
    screen.getByRole('');
    // screen.debug();
  });
});
