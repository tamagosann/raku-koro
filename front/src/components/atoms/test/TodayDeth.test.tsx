import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodayDeth from '../TodayDeth';
import { Provider, useSelector } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import { store } from '../../../app/store';

describe(`TodayDeth`, () => {
  test(`renders TodayDeth`, () => {
    render(
      <Provider store={store}>
        <TodayDeth />
      </Provider>
    );
    // screen.getByRole('');
    screen.debug();
  });
});
