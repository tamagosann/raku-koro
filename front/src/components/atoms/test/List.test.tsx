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
import { List } from '../index';

interface ListPropsInterface {
  children: string;
  url: string;
}

const ListProps: ListPropsInterface = {
  children: 'テスト',
  url: 'https://www.mhlw.go.jp/stf/covid-19/open-data.html',
};

describe('Footerコンポーネント', () => {
  // 各テストの直前に実行される（コンポーネントの取得）
  beforeEach(() => {
    render(
      <Provider store={store}>
        <List children={ListProps.children} url={ListProps.url} />
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
            <List children={ListProps.children} url={ListProps.url} />
          </Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('aタグテスト', () => {
    test('aタグにPropsで渡した値が存在するか否か', () => {
      expect(screen.getByRole('link').textContent).toBe('テスト');
    });
    test('aタグにtarget属性のテスト', () => {
      expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
    });
    test('aタグにrel属性のテスト', () => {
      expect(screen.getByRole('link')).toHaveAttribute(
        'rel',
        'noopener noreferrer'
      );
    });
    test('aタグにhref属性のテスト', () => {
      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        'https://www.mhlw.go.jp/stf/covid-19/open-data.html'
      );
    });
  });
});
