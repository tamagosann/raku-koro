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
import { TypographyTitle } from '../index';
import { PropTypes } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';

describe('TypographyTitleコンポーネント', () => {
  // デモProps
  interface TypographyPropsInterface {
    children: string;
    variant: Variant;
    align: PropTypes.Alignment;
    className?: string;
  }

  const TypographyProps: TypographyPropsInterface = {
    children: 'テスト',
    variant: 'h1',
    align: 'center',
    className: 'testClass',
  };

  // 各テストの直前に実行される（コンポーネントの取得）
  beforeEach(() => {
    render(
      <Provider store={store}>
        <TypographyTitle
          children={TypographyProps.children}
          variant={TypographyProps.variant}
          align={TypographyProps.align}
          className={TypographyProps.className}
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
            <TypographyTitle
              children={TypographyProps.children}
              variant={TypographyProps.variant}
              align={TypographyProps.align}
              className={TypographyProps.className}
            />
          </Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('h1タグのchildren私たPropsの確認', () => {
    test('h1タグのchildren私たPropsの確認テスト', () => {
      const headingTitle = screen.getByRole('heading');
      expect(headingTitle.textContent).toBe('テスト');
    });
  });
});
