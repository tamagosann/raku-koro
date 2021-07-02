import React from 'react';
import {
  Legend,
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
import { Data } from '../../features/graphs/totalCoronaSlice';
import { DethData } from '../../features/graphs/totalDethSlice';

interface Props {
  data: Array<Data> | Array<DethData>;
  xDataKey: string;
  lineDataKey: string;
  lineName: string;
  startIndex: number;
  endIndex: number;
}

const LineReChart = ({ data, xDataKey, lineDataKey, lineName, startIndex, endIndex}: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={400}>
    <LineChart data={data}>
      <XAxis dataKey={xDataKey} tick={{ fontSize: '.6rem' }}/>
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Legend verticalAlign="top" stroke="#fd7e00"/>
      <Line
        dataKey={lineDataKey}
        name={lineName}
        stroke="#fd7e00"
        fill="#fd7e00"
        strokeWidth={3}
      />
      <Brush
        dataKey={xDataKey}
        stroke="#fd7e00"
        startIndex={startIndex}
        endIndex={endIndex}
      />
    </LineChart>
  </ResponsiveContainer>
  )
}

export default LineReChart;