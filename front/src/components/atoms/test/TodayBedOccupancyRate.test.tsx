import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodayBedOccupancyRate from '../TodayBedOccupancyRate';
import { Provider, useSelector } from 'react-redux';
import { store } from '../../../app/store';

describe(`TodayBedOccupancyRate`, () => {
  interface Data {
    pcr_positive: number;
    injured: number;
    secure_bed: number;
    use_bed_rate: string;
    inpatient: number;
    source: string;
    update: string;
    home_recuperator: number;
    prefecture: string;
    pref_code: number;
    injured_bed: number;
    use_injured_bed_rate: string;
  }
  interface GraphState {
    data: Data[];
    status: 'success' | 'loading' | 'failed';
  }

  const demoMockProps = (
    inpatientNum: number,
    secure_bedNum: number
  ): GraphState => {
    return {
      data: [
        {
          home_recuperator: 155,
          injured: 30,
          injured_bed: 151,
          inpatient: inpatientNum,
          pcr_positive: 1118,
          pref_code: 1,
          prefecture: '北海道',
          secure_bed: secure_bedNum,
          source: 'https://www.mhlw.go.jp/content/10900000/000801103.xlsx',
          update: '2021-06-30',
          use_bed_rate: '23%',
          use_injured_bed_rate: '20%',
        },
      ],
      status: 'loading',
    };
  };

  // 各処理が通った後にアンマウントさせる
  afterEach(() => cleanup());

  test(`1% TodayBedOccupancyRate`, () => {
    const mockProps = demoMockProps(1, 100);
    render(
      <Provider store={store}>
        <TodayBedOccupancyRate bedOccupancyRate={mockProps} />
      </Provider>
    );
    expect(screen.getAllByRole('heading')[2].textContent).toBe('ステージ1');
  });
  test(`10% TodayBedOccupancyRate`, () => {
    const mockProps = demoMockProps(10, 100);
    render(
      <Provider store={store}>
        <TodayBedOccupancyRate bedOccupancyRate={mockProps} />
      </Provider>
    );

    expect(screen.getAllByRole('heading')[2].textContent).toBe('ステージ2');
  });
  test(`40% TodayBedOccupancyRate`, () => {
    const mockProps = demoMockProps(40, 100);
    render(
      <Provider store={store}>
        <TodayBedOccupancyRate bedOccupancyRate={mockProps} />
      </Provider>
    );

    expect(screen.getAllByRole('heading')[2].textContent).toBe('ステージ3');
  });
  test(`60% TodayBedOccupancyRate`, () => {
    const mockProps = demoMockProps(60, 100);
    render(
      <Provider store={store}>
        <TodayBedOccupancyRate bedOccupancyRate={mockProps} />
      </Provider>
    );
    screen.debug();

    expect(screen.getAllByRole('heading')[2].textContent).toBe('ステージ4');
  });

  test(`1% TodayBedOccupancyRate（background: rgba(255, 255, 255, 1)）`, () => {
    const mockProps = demoMockProps(1, 100);
    render(
      <Provider store={store}>
        <TodayBedOccupancyRate bedOccupancyRate={mockProps} />
      </Provider>
    );

    expect(screen.getAllByRole('heading')[2]).toHaveStyle(
      'background: rgba(255, 255, 255, 1)'
    );
  });

  test(`10% TodayBedOccupancyRate（background: rgb(255, 213, 213)）`, () => {
    const mockProps = demoMockProps(10, 100);
    render(
      <Provider store={store}>
        <TodayBedOccupancyRate bedOccupancyRate={mockProps} />
      </Provider>
    );

    expect(screen.getAllByRole('heading')[2]).toHaveStyle(
      'background: rgb(255, 213, 213)'
    );
  });

  test(`40% TodayBedOccupancyRate（background: rgb(255, 128, 128)）`, () => {
    const mockProps = demoMockProps(40, 100);
    render(
      <Provider store={store}>
        <TodayBedOccupancyRate bedOccupancyRate={mockProps} />
      </Provider>
    );

    expect(screen.getAllByRole('heading')[2]).toHaveStyle(
      'background: rgb(255, 128, 128)'
    );
  });

  test(`60% TodayBedOccupancyRate（background: rgb(255, 43, 43)）`, () => {
    const mockProps = demoMockProps(60, 100);
    render(
      <Provider store={store}>
        <TodayBedOccupancyRate bedOccupancyRate={mockProps} />
      </Provider>
    );

    expect(screen.getAllByRole('heading')[2]).toHaveStyle(
      'background: rgb(255, 43, 43)'
    );
  });
});
