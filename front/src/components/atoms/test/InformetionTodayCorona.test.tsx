import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InformetionTodayCorona from '../InformetionTodayCorona';
import { Provider, useSelector } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import { store } from '../../../app/store';

describe(`InformetionTodayCorona`, () => {
  test(`renders InformetionTodayCorona`, () => {
    render(
      <Provider store={store}>
        <InformetionTodayCorona />
      </Provider>
    );
    screen.getByRole('');
    // screen.debug();
  });
});
