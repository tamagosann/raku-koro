import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../app/store';
import { Provider } from 'react-redux';
import { AreaReChart } from '..';

describe('累計グラフチャートのテスト', () => {
    // テストケースを実行する前にやって欲しい処理
    beforeEach(() => {
      data: [{ }]
    })
    
    //毎回レンダリング画面を空にする
    afterEach(() => {
      cleanup();
    });

    test('aaa', () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
          </BrowserRouter>
        </Provider>
      )
    })
})