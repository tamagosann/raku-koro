import React from 'react';

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

// 型のインポート
import { Data } from '../../features/graphs/dailyInfectionSlice';

interface Props {
  targetPrefecture: Array<Data>;
  children: string;
  dataKey: string;
  startIndex: number;
  endIndex: number;
}

export const ReChart = ({
  targetPrefecture,
  children,
  dataKey,
  startIndex,
  endIndex,
}: Props) => {
  return (
    <ResponsiveContainer width="100%" height="40%" minHeight={600}>
      <LineChart
        width={1200}
        height={600}
        data={targetPrefecture}
        margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
      >
        {/* 第一引数が色のついている大きさ、第二引数が幅間 */}
        <CartesianGrid strokeDasharray="30 5" stroke="#eee"></CartesianGrid>
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
          dataKey={dataKey}
          stroke="#fd7e00"
          startIndex={startIndex}
          endIndex={endIndex}
        />
        <Line
          dataKey={dataKey}
          stroke="#fd7e00"
          name={children}
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
