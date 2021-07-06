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
import { ReChart } from '../ReChart';
import { PropTypes } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';

describe('TypographyTitleコンポーネント', () => {
  interface Data {
    daily_infection: number;
    total_infection: number;
    daily_dead: number;
    total_dead: number;
    date: string;
    pref_code: number;
    pref_name: string;
  }

  // デモProps
  interface ReChartPropsInterface {
    targetPrefecture: Array<Data>;
    children: string;
    dataKey: string;
    startIndex: number;
    endIndex: number;
    value: string;
    date: string;
  }

  // // 各テストの直前に実行される（コンポーネントの取得）
  // beforeEach(() => {
  //   render(
  //     <Provider store={store}>
  //       <ReChart
  //         targetPrefecture={ReChartProps.targetPrefecture}
  //         children={ReChartProps.children}
  //         dataKey={ReChartProps.dataKey}
  //         startIndex={ReChartProps.startIndex}
  //         endIndex={ReChartProps.endIndex}
  //         value={ReChartProps.value}
  //         date={ReChartProps.date}
  //       />
  //     </Provider>
  //   );
  // });

  // 各処理が通った後にアンマウントさせる
  afterEach(() => cleanup());

  describe('jest renderer test', () => {
    test('render correctly', () => {
      const ReChartProps: ReChartPropsInterface = {
        targetPrefecture: [
          {
            daily_infection: 10,
            total_infection: 20,
            daily_dead: 15,
            total_dead: 25,
            date: '2021-08-15',
            pref_code: 1,
            pref_name: '北海道',
          },
        ],
        children: 'テスト',
        dataKey: 'total_dead',
        startIndex: 0,
        endIndex: 31,
        value: '1',
        date: '2021-07-05',
      };
      const tree = renderer
        .create(
          <Provider store={store}>
            <ReChart
              targetPrefecture={ReChartProps.targetPrefecture}
              children={ReChartProps.children}
              dataKey={ReChartProps.dataKey}
              startIndex={ReChartProps.startIndex}
              endIndex={ReChartProps.endIndex}
              value={ReChartProps.value}
              date={ReChartProps.date}
            />
          </Provider>
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('三項演算子の条件分岐テスト', () => {
    test('false（０）のケース', () => {
      const ReChartProps: ReChartPropsInterface = {
        targetPrefecture: [
          {
            daily_infection: 10,
            total_infection: 20,
            daily_dead: 15,
            total_dead: 25,
            date: '2021-08-15',
            pref_code: 1,
            pref_name: '北海道',
          },
        ],
        children: 'テスト',
        dataKey: 'total_dead',
        startIndex: 0,
        endIndex: 31,
        value: '0',
        date: '2021-07-05',
      };
      render(
        <Provider store={store}>
          <ReChart
            targetPrefecture={ReChartProps.targetPrefecture}
            children={ReChartProps.children}
            dataKey={ReChartProps.dataKey}
            startIndex={ReChartProps.startIndex}
            endIndex={ReChartProps.endIndex}
            value={ReChartProps.value}
            date={ReChartProps.date}
          />
        </Provider>
      );
      screen.debug();
    });
    test('true（1）のケース', () => {
      const ReChartProps: ReChartPropsInterface = {
        targetPrefecture: [
          {
            daily_infection: 10,
            total_infection: 20,
            daily_dead: 15,
            total_dead: 25,
            date: '2021-08-15',
            pref_code: 1,
            pref_name: '北海道',
          },
          {
            daily_infection: 10,
            total_infection: 20,
            daily_dead: 15,
            total_dead: 25,
            date: '2021-08-15',
            pref_code: 1,
            pref_name: '東京',
          },
        ],
        children: 'テスト',
        dataKey: 'total_dead',
        startIndex: 0,
        endIndex: 31,
        value: '1',
        date: '2021-07-05',
      };
      render(
        <Provider store={store}>
          <ReChart
            targetPrefecture={ReChartProps.targetPrefecture}
            children={ReChartProps.children}
            dataKey={ReChartProps.dataKey}
            startIndex={ReChartProps.startIndex}
            endIndex={ReChartProps.endIndex}
            value={ReChartProps.value}
            date={ReChartProps.date}
          />
        </Provider>
      );
    });
  });
});
