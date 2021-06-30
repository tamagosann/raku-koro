import React, { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { Prefecture } from '../components/atoms/Prefecture';
import {
  Legend,
  ReferenceLine,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  ResponsiveContainer,
} from 'recharts';

// slice
import { selectDailyInfection } from '../features/graphs/dailyInfectionSlice';

// コンポーネント
import Inner from '../components/inner/Inner';
import { DailyTotalRadio } from '../components/atoms/DailyTotalRadio';

export const PrefectureDailyDead = () => {
  const prefecture_dead = useAppSelector(selectDailyInfection);
  // ラジオボタンの初期値（日別）
  const [value, setValue] = useState<string>('0');
  // 初期値は北海道だがユーザーが登録した都道府県に変更したい
  const [prefecture, setPrefecture] = useState<string>('1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  // 都道府県コードで対象の都道府県をフィルタリングをかける
  const targetPrefecture = prefecture_dead.data.filter(
    (element) => element.pref_code === Number(prefecture)
  );

  return (
    <>
      {prefecture_dead.status === 'loading' ? null : (
        <Inner>
          <Prefecture prefecture={prefecture} setPrefecture={setPrefecture} />
          <DailyTotalRadio handleChange={handleChange} value={value} />
          {value === '0' ? (
            <ResponsiveContainer width="100%" height="40%" minHeight={600}>
              <LineChart
                width={1200}
                height={600}
                data={targetPrefecture}
                margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
              >
                {/* 第一引数が色のついている大きさ、第二引数が幅間 */}
                <CartesianGrid
                  strokeDasharray="30 5"
                  stroke="#eee"
                ></CartesianGrid>
                <XAxis dataKey="date" tick={{ fontSize: '.7rem' }} />
                <YAxis />
                <Tooltip />
                <Legend
                  stroke="#fd7e00"
                  verticalAlign="top"
                  wrapperStyle={{ lineHeight: '40px' }}
                  fill="#fd7e00"
                />
                {/* <ReferenceLine x={'2021/6/21'} stroke="#fd7e00" /> */}
                <Brush
                  className="TimeLineChart-brush"
                  dataKey="daily_dead"
                  stroke="#fd7e00"
                  startIndex={targetPrefecture.length - 31}
                  endIndex={targetPrefecture.length - 1}
                />
                <Line
                  dataKey="daily_dead"
                  stroke="#fd7e00"
                  name="日別死者数"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="40%" minHeight={600}>
              <LineChart
                width={1200}
                height={600}
                data={targetPrefecture}
                margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
              >
                {/* 第一引数が色のついている大きさ、第二引数が幅間 */}
                <CartesianGrid
                  strokeDasharray="30 5"
                  stroke="#eee"
                ></CartesianGrid>
                <XAxis dataKey="date" tick={{ fontSize: '.7rem' }} />
                <YAxis />
                <Tooltip />
                <Legend
                  stroke="#fd7e00"
                  verticalAlign="top"
                  wrapperStyle={{ lineHeight: '40px' }}
                  fill="#fd7e00"
                />
                {/* <ReferenceLine x={'2021/6/21'} stroke="#fd7e00" /> */}
                <Brush
                  className="TimeLineChart-brush"
                  dataKey="total_dead"
                  stroke="#fd7e00"
                />
                <Line
                  dataKey="total_dead"
                  stroke="#fd7e00"
                  name="累計死者数"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Inner>
      )}
    </>
  );
};
