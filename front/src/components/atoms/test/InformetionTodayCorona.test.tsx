import { cleanup, render, screen } from '@testing-library/react';
import InformetionTodayCorona from '../InformetionTodayCorona';
import { Provider, useSelector } from 'react-redux';
import { store } from '../../../app/store';

describe(`InformetionTodayCorona`, () => {
  test(`renders InformetionTodayCorona`, () => {
    render(
      <Provider store={store}>
        <InformetionTodayCorona />
      </Provider>
    );
    // screen.getByRole('');
    screen.debug();
  });
});
