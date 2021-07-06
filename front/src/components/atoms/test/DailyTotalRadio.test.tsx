import React from 'react';
import {
  render,
  cleanup,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { afterEach, expect } from '@jest/globals';
import { store } from '../../../app/store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { DailyTotalRadio } from '../DailyTotalRadio';

describe('DailyTotalRadioコンポーネント', () => {
  // デモProps
  const radioProps = {
    value: '0',
    handleChange: jest.fn(),
  };

  // 各テストの直前に実行される（コンポーネントの取得）
  beforeEach(() => {
    render(
      <Provider store={store}>
        <DailyTotalRadio
          value={radioProps.value}
          handleChange={radioProps.handleChange}
        />
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
            <DailyTotalRadio
              value={radioProps.value}
              handleChange={radioProps.handleChange}
            />
          </Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  // describe('footerタグテスト', () => {
  //   test('fotterタグが存在するか否か', () => {
  //     const footerTag = screen.getByTestId('footer-tag');
  //     expect(footerTag).toBeInTheDocument();
  //   });
  // });
});
