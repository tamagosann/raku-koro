import React from 'react';
import {
  render,
} from "@testing-library/react";

import { store } from '../../app/store';
import { Provider } from 'react-redux';
import { NationwideData } from '../NationwideData';

describe('NationwideDataコンポーネント', () => {
  test('コンポーネントの表示', () => {
    render(
      <Provider store={store}>
        <NationwideData />
      </Provider>
    )
  })
})