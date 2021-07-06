import React from 'react';
import {
  render,
  cleanup,
  screen,
  fireEvent,
  waitFor,
  within,
  getByRole,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect } from '@jest/globals';
import { store } from '../../../app/store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { Prefecture } from '../Prefecture';

describe('Prefectureコンポーネント', () => {
  // デモProps
  const prefectureProps = {
    prefecture: '1',
    setPrefecture: jest.fn(),
  };

  // 各テストの直前に実行される（コンポーネントの取得）
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Prefecture
          prefecture={prefectureProps.prefecture}
          setPrefecture={prefectureProps.setPrefecture}
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
            <Prefecture
              prefecture={prefectureProps.prefecture}
              setPrefecture={prefectureProps.setPrefecture}
            />
          </Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('mock関数の発火テスト', () => {
    test('セレクトボックスをクリックしたらmock関数が発火するかどうか', () => {
      const inputTag = screen.getByRole('button');
      fireEvent.mouseDown(inputTag);
      const listboxFirst = within(screen.getByRole('listbox'));
      fireEvent.click(listboxFirst.getByText(/青森県/));
      fireEvent.mouseDown(inputTag);
      const listboxSecond = within(screen.getByRole('listbox'));
      fireEvent.click(listboxSecond.getByText(/神奈川県/));
      expect(prefectureProps.setPrefecture).toHaveBeenCalledTimes(2);
    });
  });
});
