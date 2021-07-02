import React from 'react';
import {
  Legend,
  AreaChart,
  Area,
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
  value: string;
}

export const ReChart = ({
  targetPrefecture,
  children,
  dataKey,
  startIndex,
  endIndex,
  value,
}: Props) => {
  return (
    <>
      {!Number(value) ? (
<ResponsiveContainer width="100%" minHeight={600}>
<AreaChart
  width={1200}
  height={600}
  data={targetPrefecture}
  margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
>
  {/* 第一引数が色のついている大きさ、第二引数が幅間 */}
  <CartesianGrid strokeDasharray="30 5" stroke="#eee"></CartesianGrid>
  <XAxis dataKey="date" tick={{ fontSize: '.7rem' }} />
  <YAxis unit="人" />
  <Tooltip />
  <Legend
    stroke="#fd7e00"
    verticalAlign="top"
    wrapperStyle={{ lineHeight: '40px' }}
    fill="#fd7e00"
  />
  <Brush
    className="TimeLineChart-brush"
    dataKey={dataKey}
    stroke="#fd7e00"
    startIndex={startIndex}
    endIndex={endIndex}
  />
  <Area
    dataKey={dataKey}
    stroke="#fd7e00"
    name={children}
    strokeWidth={3}
    unit="人"
    fill="#fd7e00"
  />
</AreaChart>
</ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" minHeight={600}>
          <LineChart
            width={1200}
            height={600}
            data={targetPrefecture}
            margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
          >
            {/* 第一引数が色のついている大きさ、第二引数が幅間 */}
            <CartesianGrid strokeDasharray="30 5" stroke="#eee"></CartesianGrid>
            <XAxis dataKey="date" tick={{ fontSize: '.7rem' }} />
            <YAxis unit="人" />
            <Tooltip />
            <Legend
              stroke="#fd7e00"
              verticalAlign="top"
              wrapperStyle={{ lineHeight: '40px' }}
              fill="#fd7e00"
            />
            <Brush
              className="TimeLineChart-brush"
              dataKey={dataKey}
              stroke="#fd7e00"
              startIndex={startIndex}
              endIndex={endIndex}
            />
            <Line
              name={children}
              dataKey={dataKey}
              stroke="#fd7e00"
              strokeWidth={3}
              unit="人"
              fill="#fd7e00"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
};
