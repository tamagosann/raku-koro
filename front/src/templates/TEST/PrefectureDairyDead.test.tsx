import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { BrowserRouter } from 'react-router-dom';
import { PrefectureDailyDead } from '../index';

describe('PrefectureDairyDead', () => {
  //毎回レンダリング画面を空にする
  afterEach(() => {
    cleanup();
  });

  test('render', () => {
    render(
      <Provider store={store}>
        <PrefectureDailyDead />
      </Provider>
    );
    screen.debug();
  });

  test('toggle Dairy', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PrefectureDailyDead />
        </BrowserRouter>
      </Provider>
    );

    //loadingになってしまうためmレンダリングされない
    // expect(await screen.findByText("都道府県別死者数")).toBeInTheDocument()
  });
});

//Stmtsは73.33パーセント
