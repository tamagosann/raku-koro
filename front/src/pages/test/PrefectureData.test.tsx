import React from 'react';
import {
  render,
  cleanup,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { afterEach, expect } from '@jest/globals';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { PrefectureData } from '../PrefectureData';

describe('Footerコンポーネント', () => {
  // 各テストの直前に実行される（コンポーネントの取得）
  beforeEach(() => {
    render(
      <Provider store={store}>
        <PrefectureData />
      </Provider>
    );
  });

  // 各処理が通った後にアンマウントさせる
  afterEach(() => cleanup());

  describe('jest renderer test', () => {
    test('render correctly', () => {
      const tree = renderer
        .create(
          <Provider store={store}>
            <PrefectureData />
          </Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('divタグテスト', () => {
    test('divタグのclass属性のテスト', () => {
      const divEle = screen.getByText('Loading...').parentNode;
      expect(divEle).toHaveClass('MuiPaper-root');
    });
  });
});
